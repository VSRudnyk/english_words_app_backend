const Joi = require('joi');

module.exports = {
  addWordValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      word: Joi.string().required(),
      translation: Joi.string().required(),
      synonyms: Joi.string().empty(''),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({
        message: 'missing required name field',
      });
    }
    next();
  },
  updateWordtValidation: (req, res, next) => {
    const body = req.body;
    const schema = Joi.object({
      word: Joi.string().optional(),
      translation: Joi.string().optional(),
      synonyms: Joi.string().empty(''),
    });

    const validationResult = schema.validate(body);

    if (validationResult.error) {
      return res.status(400).json({
        message: validationResult.error,
      });
    }
    next();
  },
};
