const { default: mongoose } = require('mongoose');
const { Word } = require('../models');

const getWords = async () => {
  console.log('getWords');
  return await Word.find({});
};

const addWord = async (body) => {
  return await Word.create(body);
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
  addWord,
  updateWord,
  removeWord,
};
