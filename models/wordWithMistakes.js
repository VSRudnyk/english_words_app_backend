const { Schema, model } = require('mongoose');

const wordWithMistakesSchema = Schema(
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

const WordWithMistakes = model('mistakes', wordWithMistakesSchema);

module.exports = {
  WordWithMistakes,
};
