/**
 * Dependencies
 */
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const lusca = require('lusca');
const logger = require('morgan');
const mongo = require('connect-mongo');
const session = require('express-session');
const compression = require('compression');
const favicon = require('serve-favicon');
require("dotenv").config();

const config = require("./server/config");

const MongoStore = mongo(session);

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
  process.exit();
});
mongoDB.on("open", function callback() {
  console.info("Connected to MongoDO:", config.MONGO_URI);
});

/**
 * App
 */
const app = express();

// Set PORT
const port = process.env.PORT || 8080;
app.set("port", port);

app.use(compression());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("X-HTTP-Method-Override"));

if(process.env.NODE_ENV !== 'production') {
  const cors = require('cors')
  app.use(cors());
}

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESH_SECRET,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))

// Set static path to Angular app in dist
// Dont run in dev
if (process.env.NODE_ENV !== "dev") {
  app.use(lusca.csrf());
  app.use(lusca.xframe("SAMEORIGIN"));
  app.use(lusca.xssProtection(true));
  app.use(lusca.nosniff());
  app.use(lusca.referrerPolicy('same-origin'));

  app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
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
    res.sendFile(path.join(__dirname, "/dist/index.html"));
  });
}

/**
 * Server
 */
app.listen(port, () => console.log(`Server listening on port ${port}`));
