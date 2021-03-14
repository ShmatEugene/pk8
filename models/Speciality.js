const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  //_id: Schema.ObjectId,
  code: { type: String, required: true },
  title: { type: String, required: true },
  yearsToStudy: { type: Number },
  stateFundedPlacecesCounter: { type: Number },
  stateAccreditation: { type: Boolean },
  desc: { type: String },
  prospects: { type: String },
  documents: [
    {
      title: { type: String },
      link: { type: String },
    },
  ],
});

module.exports = model('Speciality', schema);
