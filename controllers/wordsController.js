const {
  getWords,
  addWord,
  updateWord,
  removeWord,
} = require('../service/words');

const getAllWords = async (req, res, next) => {
  console.log('getAllWords');
  const data = await getWords();
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
  console.log(id);
  const deletedWord = await removeWord(id);
  if (!deletedWord) {
    res.status(404).json({
      message: `Word with id=${id} not found`,
    });
  }
  res.status(200).json(deletedWord);
};

module.exports = {
  getAllWords,
  addNewWord,
  updateWordById,
  deleteWord,
};
