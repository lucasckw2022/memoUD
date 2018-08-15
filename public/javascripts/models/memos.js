const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const MemoSchema = new Schema({
  year: Number,
  month: Number,
  date: Number,
  content: String
});

module.exports = mongoose.model('Memo', MemoSchema)
