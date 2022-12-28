const { Schema, model } = require('mongoose');

const wordSchema = Schema(
  {
    word: {
      type: String,
      required: [true, 'Set word'],
    },
    translation: {
      type: String,
      required: [true, 'Set translation'],
    },
  },

  { versionKey: false, timestamps: true }
);

const Word = model('word', wordSchema);

module.exports = {
  Word,
};
