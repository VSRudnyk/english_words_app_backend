const {
  getWords,
  getRandomWords,
  getWordsWithMistakes,
  addWord,
  addWordWithMistakes,
  updateWord,
  updateWords,
  removeWord,
  removeWordsWithMistakes,
} = require('../service/words');

const getAllWords = async (req, res, next) => {
  const data = await getWords();
  res.status(200).json({
    data,
  });
};

const getRandomWordsArr = async (req, res, next) => {
  const limit = Number(req.query.limit);
  const data = await getRandomWords(limit);
  res.status(200).json({
    data,
  });
};

const getAllWordsWithMistakes = async (req, res, next) => {
  const data = await getWordsWithMistakes();
  res.status(200).json({
    data,
  });
};

const addNewWord = async (req, res, next) => {
  const body = req.body;
  const result = await addWord(body);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result,
    },
  });
};

const addNewWordWithMistakes = async (req, res, next) => {
  const body = req.body;
  const result = await addWordWithMistakes(body);
  res.status(201).json(result);
};

const updateWordById = async (req, res, next) => {
  const body = req.body;
  console.log('body', body);
  const id = req.params.wordId;
  const changedWordField = await updateWord(id, body);
  if (!changedWordField) {
    return res.status(404).json({
      message: `Word with id=${id} not found`,
    });
  }
  res.status(200).json(changedWordField);
};

const bulkUpdateWords = async (req, res, next) => {
  const body = req.body;
  const result = await updateWords(body);
  if (!result) {
    return res.status(404).json({
      message: 'No words found to update',
    });
  }
  res.status(200).json({
    message: 'Words successfully updated',
    result,
  });
};

const deleteWord = async (req, res, next) => {
  const id = req.params.wordId;
  const deletedWord = await removeWord(id);
  if (!deletedWord) {
    return res.status(404).json({
      message: `Word with id=${id} not found`,
    });
  }
  res.status(200).json(deletedWord);
};

const deleteWordsWithMistakes = async (req, res, next) => {
  const { ids } = req.body;
  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      message: 'Invalid request. Provide a non-empty array of ids.',
    });
  }

  const deletedWordsWithMistakes = await removeWordsWithMistakes(ids);
  if (
    !deletedWordsWithMistakes ||
    deletedWordsWithMistakes.deletedCount === 0
  ) {
    return res.status(404).json({
      message: 'No words with the provided ids were found.',
    });
  }

  res.status(200).json({
    message: 'Words successfully deleted.',
    deletedCount: deletedWordsWithMistakes.deletedCount,
  });
};

module.exports = {
  getAllWords,
  getRandomWordsArr,
  getAllWordsWithMistakes,
  addNewWord,
  addNewWordWithMistakes,
  updateWordById,
  deleteWord,
  deleteWordsWithMistakes,
  bulkUpdateWords,
};
