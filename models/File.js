const { Schema, model } = require('mongoose');

const schema = new Schema({
  //_id: Schema.ObjectId,
  fileName: { type: String, required: true },
  for: { type: String },
});

module.exports = model('File', schema);
