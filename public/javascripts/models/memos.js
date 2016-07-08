var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MemoSchema = new Schema({
  year: Number,
  month: Number
  // date: Number
});

module.exports = mongoose.model('Memo', MemoSchema)
