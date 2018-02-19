const mongoose  = require("mongoose");
const util      = require('util')
const Poll      = require('./Poll')
const config    = require('../config')

const log   = require('debug')('server:mongoose-poll')
const error = require('debug')('server:error')

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
  console.info("Connected to MongoDB:", config.MONGO_URI);
});
/*
Search methods
*/
exports.findPollById = function (id, cb) {
  Poll.findById(id, (err, doc) => {
    if (err) return cb(err, null)
    return cb(null, doc)
  })
}

exports.findPolls = function (cb) {
  Poll.find({}, (err, doc) => {
    if (err) return cb(err, null)
    return cb(null, doc)
  })
}

exports.findOnePoll = function (searchObj, cb) {
  Poll.findOne(searchObj, (err, doc) => {
    if (err) return cb(err, null)
    return cb(null, doc)
  })
}

exports.search = function (searchObj, cb) {
  Poll.find(searchObj, (err, doc) => {
    if (err) return cb(err, null)
    return cb(null, doc)
  })
}
/*
Create
*/
exports.createPoll = function (pollObj, cb) {
  const NewPoll = new Poll({
    title: pollObj.title,
    options: pollObj.options,
    owner: pollObj.owner,
    voters: pollObj.voters
  })
  NewPoll.save((err) => {
    if (err) return cb(err, null)
    return cb(null, NewPoll)
  })
}
