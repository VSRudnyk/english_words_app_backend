const { Schema, model } = require('mongoose');

const mistakesSchema = Schema(
  {
    word: {
      type: String,
      required: [true, 'Set word'],
    },
    translation: {
      type: String,
      required: [true, 'Set translation'],
    },
    synonyms: {
      type: String,
    },
  },

  { versionKey: false, timestamps: true }
);

const Mistakes = model('mistakes', mistakesSchema);

module.exports = {
  Mistakes,
};
