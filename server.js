/**
 * Dependencies
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors");
require("dotenv").config();

const config = require("./server/config");

/**
 * MongoDB
 */
mongoose.connect(config.MONGO_URI, { useMongoClient: true });
const mongoDB = mongoose.connection;

mongoDB.on("error", () => {
  console.error(
    "MongoDB Connectiong Error. Please make sure that",
    config.MONGO_URI,
    "is running."
  );
});
mongoDB.on("open", function callback() {
  console.info("Connected to MongoDO:", config.MONGO_URI);
});

/**
 * App
 */
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(cors());

// Set PORT
const port = process.env.PORT || 8080;
app.set("port", port);

// Set static path to Angular app in dist
// Dont run in dev
if (process.env.NODE_ENV !== "dev") {
  app.use("/", express.static(path.join(__dirname, "./dist")));
}

/**
 * Routes
 */
require("./server/api")(app, config);

// Pass routing to Angular
// Dont run in dev
if (process.env.NODE_ENV !== "dev") {
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./dist/index.html"));
  });
}

/**
 * Server
 */
app.listen(port, () => console.log(`Server listening on port ${port}`));
