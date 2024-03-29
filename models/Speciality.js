const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  //_id: Schema.ObjectId,
  code: { type: String, required: true },
  title: { type: String, required: true },
  published: { type: String },
  clicks: { type: Number, default: 0 },
  yearsToStudy: { type: String },
  stateFundedPlacecesCounter: { type: String },
  stateAccreditation: { type: Boolean, default: true },
  desc: { type: String, default: '' },
  prospects: { type: String, default: '' },
  documents: [
    {
      title: { type: String },
      link: { type: String },
    },
  ],
});

module.exports = model('Speciality', schema);
