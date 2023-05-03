const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
var bodyParser = require("body-parser");

const routes = require("./routes/UserRoute");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));
app.use("/api", routes);

const PORT = 8080;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database Connection Established"));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
