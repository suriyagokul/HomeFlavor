const UserModel = require("../models/UserModel");
const ItemModel = require("../models/ItemModel");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
  try {
    let { Username, Email, Password, ConfirmPassword } = req.body;
    const exist = await UserModel.findOne({ Email });

    if (exist) {
      return res.status(400).send("User already Registered");
    }
    if (Password !== ConfirmPassword) {
      return res.status(401).send("Password is incorrect");
    }
    let newUser = new UserModel({
      Username,
      Email,
      Password,
      ConfirmPassword,
    });
    await newUser.save();
    return res.status(200).send("User Registered Successfully");
  } catch (err) {
    return res.status(500).send("Server error: " + err.message);
  }
};

module.exports.login = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const exist = await UserModel.findOne({ Email });

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
