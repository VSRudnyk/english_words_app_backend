const express = require('express');
const {
  getAllWords,
  getRandomWordsArr,
  getAllWordsWithMistakes,
  addNewWord,
  addNewWordWithMistakes,
  updateWordById,
  bulkUpdateWords,
  // deleteWord,
  deleteWords,
} = require('../../controllers/wordsController');

const {
  addWordValidation,
  updateWordtValidation,
  bulkUpdateWordsValidation,
} = require('../../middelwares/validationMiddelware');

const auth = require('../../middelwares/auth');

const router = express.Router();

router.get('/', getAllWords);
router.get('/random', getRandomWordsArr);
router.get('/mistakes', getAllWordsWithMistakes);
router.post('/', addWordValidation, addNewWord);
router.post('/mistakes', addNewWordWithMistakes);
router.put('/update/:wordId', updateWordtValidation, updateWordById);
router.put('/bulk-update', auth, bulkUpdateWordsValidation, bulkUpdateWords);
// router.delete('/:wordId', deleteWord);
router.delete('/bulk-delete', deleteWords);

module.exports = router;
