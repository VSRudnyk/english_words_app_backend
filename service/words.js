const { default: mongoose } = require('mongoose');
const { Word } = require('../models');
const { Mistakes } = require('../models');

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
  return await Mistakes.find({});
};

const addWordWithMistakes = async (item) => {
  const { translation } = item;
  const mistakes = await Mistakes.find({ translation });
  if (mistakes.length > 0) {
    return;
  }

  return await Mistakes.create(item);
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

const removeWordsWithMistakes = async (ids) => {
  if (!Array.isArray(ids) || ids.some(id => !mongoose.Types.ObjectId.isValid(id))) {
    return null;
  }
  return Mistakes.deleteMany({ _id: { $in: ids } });
};

module.exports = {
  getWords,
  getRandomWords,
  getWordsWithMistakes,
  addWord,
  addWordWithMistakes,
  updateWord,
  removeWord,
  removeWordsWithMistakes,
};
