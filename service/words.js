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

const addWordWithMistakes = async (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Invalid input. Provide a non-empty array of items.');
  }

  return await Mistakes.insertMany(items, { ordered: false });
};

const updateWords = async (items) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Invalid input. Provide a non-empty array of items.');
  }

  const operations = items
    .filter(item => item._id && mongoose.Types.ObjectId.isValid(item._id))
    .map(item => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { ...item } }
      }
    }));

  if (operations.length === 0) {
    throw new Error('No valid items to update.');
  }

  return await Word.bulkWrite(operations);
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
  if (
    !Array.isArray(ids) ||
    ids.some((id) => !mongoose.Types.ObjectId.isValid(id))
  ) {
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
  updateWords,
  removeWord,
  removeWordsWithMistakes,
};
