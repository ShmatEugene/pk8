const { Schema, model } = require('mongoose');

const schema = new Schema({
  //_id: Schema.ObjectId,
  title: { type: String, required: true },
  published: { type: String },
  clicks: { type: Number, default: 0 },
  editorData: { type: Object },
  documents: [
    {
      title: { type: String },
      link: { type: String },
    },
  ],
});

module.exports = model('EduPost', schema);
