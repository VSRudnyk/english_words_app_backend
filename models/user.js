const { Schema, model } = require('mongoose');

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      // unique: true,
      minlength: 6,
      maxLength: 63,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
    },
  },

  { versionKey: false, timestamps: true }
);

const User = model('user', userSchema);

module.exports = {
  User,
};
