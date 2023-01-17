const { default: mongoose } = require('mongoose');
const { Word } = require('../models');
const { WordWithMistakes } = require('../models');

const getWords = async () => {
  return await Word.find({});
};

const getRandomWords = async (limit) => {
  return await Word.aggregate([{ $sample: { size: limit } }]);
};

const addWord = async (body) => {
  return await Word.create(body);
};

const getWordsWithMistakes = async () => {
  return await WordWithMistakes.find({});
};

const addWordWithMistakes = async (body) => {
  return await WordWithMistakes.create(body);
};

const updateWord = async (id, body) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return await Word.findByIdAndUpdate(id, body, { new: true });
};

const removeWord = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  return Word.findByIdAndDelete(id);
};

module.exports = {
  getWords,
  getRandomWords,
  getWordsWithMistakes,
  addWord,
  addWordWithMistakes,
  updateWord,
  removeWord,
};
