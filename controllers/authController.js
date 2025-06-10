const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Conflict } = require('http-errors');
const { User } = require('../models/user');
const { Word } = require('../models/word');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  // Нужно еще сделать проверку пароля в боди и в БД
  const user = await User.findOne({ email });
  if (user) {
    try {
      const userWords = await Word.find({ owner: user._id });
      // Destructure to exclude password
      const { password: userPassword, ...userWithoutPassword } = user._doc;

      res.status(200).json({
        message: 'User already exists',
        words: userWords,
        user: userWithoutPassword,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Error fetching user words',
      });
    }
  } else {
    try {
      const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10));
      const token = jwt.sign(email, SECRET_KEY);

      const newUser = await User.create({
        email,
        password: hashPassword,
        token,
      });

      const { password: userPassword, ...userResponse } = newUser._doc;

      res.status(201).json(userResponse);
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        message: error.message || 'Internal Server Error',
      });
    }
  }
};

module.exports = register;
