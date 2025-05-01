const express = require('express');
const {
  getAllWords,
  getRandomWordsArr,
  getAllWordsWithMistakes,
  addNewWord,
  addNewWordWithMistakes,
  updateWordById,
  deleteWord,
  deleteWordsWithMistakes,
} = require('../../controllers/wordsController');

const {
  addWordValidation,
  updateWordtValidation,
} = require('../../middelwares/validationMiddelware');

const router = express.Router();

router.get('/', getAllWords);
router.get('/random', getRandomWordsArr);
router.get('/mistakes', getAllWordsWithMistakes);
router.post('/', addWordValidation, addNewWord);
router.post('/mistakes', addNewWordWithMistakes);
router.put('/:wordId', updateWordtValidation, updateWordById);
router.delete('/:wordId', deleteWord);
router.delete('/mistakes/del', deleteWordsWithMistakes);

module.exports = router;
