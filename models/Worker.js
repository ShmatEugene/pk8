const { Schema, model } = require('mongoose');

const schema = new Schema({
  //_id: Schema.ObjectId,
  title: { type: String, required: true },
  department: { type: String },
  desc: { type: String },
  imgLink: { type: String },
  published: { type: String },
  clicks: { type: Number, default: 0 },
});

module.exports = model('Worker', schema);
