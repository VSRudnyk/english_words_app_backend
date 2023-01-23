const {
  getWords,
  getRandomWords,
  getWordsWithMistakes,
  addWord,
  addWordWithMistakes,
  updateWord,
  removeWord,
  removeWordWithMistakes,
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
  body.map(async (item) => await addWordWithMistakes(item));
  res.status(201).json({
    status: 'success',
    code: 201,
  });
};

const updateWordById = async (req, res, next) => {
  const body = req.body;
  const id = req.params.wordId;
  const changedWordField = await updateWord(id, body);
  if (!changedWordField) {
    return res.status(404).json({
      message: `Word with id=${id} not found`,
    });
  }
  res.status(200).json(changedWordField);
};

const deleteWord = async (req, res, next) => {
  const id = req.params.wordId;
  const deletedWord = await removeWord(id);
  if (!deletedWord) {
    res.status(404).json({
      message: `Word with id=${id} not found`,
    });
  }
  res.status(200).json(deletedWord);
};

const deleteWordWithMistakes = async (req, res, next) => {
  const id = req.params.wordId;
  const deletedWord = await removeWordWithMistakes(id);
  if (!deletedWord) {
    res.status(404).json({
      message: `Word with id=${id} not found`,
    });
  }
  res.status(200).json(deletedWord);
};

module.exports = {
  getAllWords,
  getRandomWordsArr,
  getAllWordsWithMistakes,
  addNewWord,
  addNewWordWithMistakes,
  updateWordById,
  deleteWord,
  deleteWordWithMistakes,
};
