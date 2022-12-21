const express = require('express');
const {
  getAllWords,
  addNewWord,
  updateWordById,
  deleteWord,
} = require('../../controllers/wordsController');

const {
  addWordValidation,
  updateWordtValidation,
} = require('../../middelwares/validationMiddelware');

const router = express.Router();

router.get('/', getAllWords);
router.post('/', addWordValidation, addNewWord);
router.put('/:wordId', updateWordtValidation, updateWordById);
router.delete('/:wordId', deleteWord);

module.exports = router;
