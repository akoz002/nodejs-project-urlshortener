
/*
 * Define schema for storing URLs.
 */

const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  _id: Number,
  url: String
});

module.exports = urlSchema;
