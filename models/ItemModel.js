const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  ItemName: {
    type: "string",
    required: true,
  },
  ItemImage: {
    type: "string",
  },
  ItemDescription: {
    type: "string",
  },
  ItemPrice: {
    type: "string",
    required: true,
  },
  registeredusername: {
    type: "string",
    required: true,
  },
  registereduserid: {
    type: "string",
  },
});

module.exports = mongoose.model("Items", itemSchema);
