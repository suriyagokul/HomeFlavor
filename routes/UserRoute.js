const { Router } = require("express");
const { registerUser } = require("../controllers/UserController");
const { login } = require("../controllers/UserController");
const { allitems } = require("../controllers/UserController");
const { registeritem } = require("../controllers/UserController");
const { profile } = require("../controllers/UserController");
const { updateUser } = require("../controllers/UserController");
const { saveItemsToCart } = require("../controllers/UserController");
const { cartitems } = require("../controllers/UserController");

const middleware = require("../middleware");

const router = Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/registeritem", middleware, registeritem);
router.get("/allitems", middleware, allitems);
router.get("/profile", middleware, profile);
router.put("/updateuser/:id", middleware, updateUser);
router.post("/savecart", middleware, saveItemsToCart);
router.get("/cartitems", middleware, cartitems);
// router.get("/ordereditems", middleware, () => {});

module.exports = router;
