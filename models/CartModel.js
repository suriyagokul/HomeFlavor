const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  ItemName: {
    type: "string",
    required: true,
  },
  ItemImage: {
    type: "string",
  },
  ItemPrice: {
    type: "string",
    required: true,
  },
  TotalPrice: {
    type: "string",
  },

  useritem_id: {
    type: "string",
  },
});

module.exports = mongoose.model("Cart", cartSchema);
