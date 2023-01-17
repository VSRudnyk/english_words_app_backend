const express = require('express');
const {
  getAllWords,
  getRandomWordsArr,
  addNewWord,
  addNewWordWithMistakes,
  updateWordById,
  deleteWord,
} = require('../../controllers/wordsController');

const {
  addWordValidation,
  updateWordtValidation,
} = require('../../middelwares/validationMiddelware');

const router = express.Router();

router.get('/', getAllWords);
router.get('/random', getRandomWordsArr);
router.post('/', addWordValidation, addNewWord);
router.post('/mistakes', addWordValidation, addNewWordWithMistakes);
router.put('/:wordId', updateWordtValidation, updateWordById);
router.delete('/:wordId', deleteWord);

module.exports = router;
