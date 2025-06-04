const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Conflict } = require('http-errors');
const { User } = require('../models/user');

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw new Conflict(`User with ${email} already exist`);
    }
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
};

module.exports = register;
