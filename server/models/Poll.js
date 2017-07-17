/**
 * Poll Model
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pollSchema = new Schema({
  title: { type: String, required: true },
  options: [
    {
      title: { type: String, required: true },
      count: { type: Number, default: 0 }
    }
  ],
  owner: String,
  voters: []
});

module.exports = mongoose.model("Poll", pollSchema);
