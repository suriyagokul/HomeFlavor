const UserModel = require("../models/UserModel");
const ItemModel = require("../models/ItemModel");
const CartModel = require("../models/CartModel");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  try {
    let { Username, Email, MobileNo, Password, ConfirmPassword, UserImage } =
      req.body;
    const exist = await UserModel.findOne({ MobileNo });

    if (exist) {
      return res.status(400).send("User already Registered");
    }
    if (Password !== ConfirmPassword) {
      return res.status(401).send("Password is incorrect");
    }
    let newUser = new UserModel({
      Username,
      Email,
      MobileNo,
      Password,
      ConfirmPassword,
      UserImage,
    });
    await newUser.save();
    return res.status(200).send("User Registered Successfully");
  } catch (err) {
    return res.status(500).send("Server error: " + err.message);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { MobileNo, Password } = req.body;

    const exist = await UserModel.findOne({ MobileNo });

    if (!exist) {
      return res.status(401).send("User does not exist. Please Register");
    }
    if (exist.Password !== Password) {
      return res.status(402).send("Password is incorrect.");
    }

    const payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtPassword", { expiresIn: 3600000 }, (err, token) => {
      // session expires in 3600000ms = 1hr
      if (err) throw err;
      return res.json(token);
    });
  } catch (err) {
    return res.status(500).send("Server error: " + err.message);
  }
};

module.exports.allitems = async (req, res, next) => {
  try {
    let allitems = await ItemModel.find();
    return res.json(allitems);
  } catch (err) {
    return res.status(500).send("Server error: " + err.message);
  }
};

module.exports.registeritem = async (req, res, next) => {
  try {
    let { ItemName, ItemImage, ItemDescription, ItemPrice } = req.body;
    const exist = await UserModel.findById(req.user.id);

    let newItem = new ItemModel({
      registeredusername: exist.Username,
      registereduserid: exist.id,
      usermobileno: exist.MobileNo,
      ItemName,
      ItemImage,
      ItemDescription,
      ItemPrice,
    });
    await newItem.save();
    return res.status(200).send("Item added successfully");
  } catch (err) {
    return res.status(500).send("Server error ra: " + err);
  }
};

module.exports.profile = async (req, res, next) => {
  try {
    const currentUser = await UserModel.findById(req.user.id);
    return res.json(currentUser);
  } catch (err) {
    return res.status(500).send("Server error");
  }
};

function decodeBase64Image(dataString) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches) {
    throw new Error("Invalid data string");
  }

  const type = matches[1];
  const buffer = Buffer.from(matches[2], "base64");

  return {
    type,
    buffer,
  };
}

module.exports.updateUser = async function (req, res, next) {
  try {
    const id = req.user.id;
    const { UserImage } = req.body;
    console.log(req.body);
    const exist = await UserModel.findByIdAndUpdate(
      id,
      { UserImage },
      { new: true }
    );
    if (exist) {
      return res.status(200).send({
        success: true,
        message: "User updated successfully.",
        data: exist,
      });
    }
    return res.status(404).send({ success: false, message: "User not found." });
  } catch (err) {
    return res.status(500).send(err);
  }
};

module.exports.saveItemsToCart = async function (req, res, next) {
  try {
    const { ItemName, ItemPrice, ItemImage, TotalPrice } = req.body;
    const cart = new CartModel({
      ItemName,
      ItemPrice,
      ItemImage,
      TotalPrice,
      useritem_id: "",
    });
    await cart.save();
    return res.status(200).send("Cart saved successfully");
  } catch (err) {
    return res.status(500).send("Server error: " + err);
  }
};

module.exports.cartitems = async function (req, res, next) {
  try {
    let allitems = await CartModel.find();
    return res.json(allitems);
  } catch (err) {
    return res.status(500).send("Cart error: " + err);
  }
};
