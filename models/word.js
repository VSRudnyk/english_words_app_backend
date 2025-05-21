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
    synonyms: {
      type: String,
    },
    correctAnswersCount: {
      type: Number,
      default: 0,
    },
    incorectAnswersCount: {
      type: Number,
      default: 0,
    },
  },

  { versionKey: false, timestamps: true }
);

const Word = model('word', wordSchema);

module.exports = {
  Word,
};
