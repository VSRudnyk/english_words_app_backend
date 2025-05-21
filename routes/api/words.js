const express = require('express');
const {
  getAllWords,
  getRandomWordsArr,
  getAllWordsWithMistakes,
  addNewWord,
  addNewWordWithMistakes,
  updateWordById,
  bulkUpdateWords,
  deleteWord,
  deleteWordsWithMistakes,
} = require('../../controllers/wordsController');

const {
  addWordValidation,
  updateWordtValidation,
  bulkUpdateWordsValidation,
} = require('../../middelwares/validationMiddelware');

const router = express.Router();

router.get('/', getAllWords);
router.get('/random', getRandomWordsArr);
router.get('/mistakes', getAllWordsWithMistakes);
router.post('/', addWordValidation, addNewWord);
router.post('/mistakes', addNewWordWithMistakes);
router.put('/update/:wordId', updateWordtValidation, updateWordById);
router.put('/bulk-update', bulkUpdateWordsValidation, bulkUpdateWords);
router.delete('/:wordId', deleteWord);
router.delete('/mistakes/del', deleteWordsWithMistakes);

module.exports = router;
