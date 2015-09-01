'use strict';

var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

/** Schema */
var schema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  author: {
    type: String,
    required: true
  },
  advisor: String,
  source: String,
  url: String,
  year: Number,
  description: String,
  institution: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

/** Hook to update the date */
schema.pre('update', function () {
  this.update({}, { $set: { updatedAt: new Date() } });
});

/** Create model */
var Thesis = mongoose.model('Thesis', schema);

/** Export model */
module.exports = Thesis;
