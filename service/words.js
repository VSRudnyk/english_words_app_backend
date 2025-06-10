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

const updateWords = async (items, userId) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Invalid input. Provide a non-empty array of items.');
  }

  console.log('Items received:', items);
  console.log('UserId:', userId);

  // Получаем все существующие слова для этого пользователя по id
  const existingWords = await Word.find({
    id: { $in: items.filter((item) => item.id).map((item) => item.id) },
    owner: userId,
  });

  console.log('Existing words found:', existingWords);

  const existingWordsMap = new Map(
    existingWords.map((word) => [word.id.toString(), word])
  );

  // Формируем операции обновления и вставки
  const operations = items.map((item) => {
    if (item.id && existingWordsMap.has(item.id.toString())) {
      // Если слово существует (есть id и оно найдено в базе) - обновляем
      return {
        updateOne: {
          filter: { id: item.id, owner: userId },
          update: { $set: { ...item, owner: userId } },
        },
      };
    } else {
      // Если слова нет в базе - добавляем новое
      return {
        insertOne: {
          document: {
            ...item,
            owner: userId,
          },
        },
      };
    }
  });

  if (operations.length === 0) {
    throw new Error('No valid items to process.');
  }

  console.log('Operations to perform:', operations);
  const bulkResult = await Word.bulkWrite(operations);
  console.log('Bulk write result:', bulkResult);

  // Получаем все обработанные слова
  const wordsToFind = items.map((item) => item.id);
  const updatedWords = await Word.find({
    id: { $in: wordsToFind },
    owner: userId,
  });
  console.log('Updated words:', updatedWords);

  return updatedWords;
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

const removeWords = async (ids) => {
  if (!Array.isArray(ids)) {
    return null;
  }
  return Word.deleteMany({ id: { $in: ids } });
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
  removeWords,
};
