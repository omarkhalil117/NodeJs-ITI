// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 8,
  },

  firstname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },

  lastname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },

  password: {
    type: String,
    required: true,
    minLength: 8,
  },

  dob: {
    type: Date,
    required: false,
  },
}, {
  timestamps: true,
});

schema.methods.verifyPassword = async function verifyPassword(password) {
  const valid = await bcrypt.compare(password, this.password);
  return valid;
};

schema.pre('save', async function hashPassword() {
  this.password = await bcrypt.hash(this.password, 10);
});

schema.pre('findOneAndUpdate', async function hashNewPassword(next) {
  const update = this.getUpdate();
  if (!update.password) {
    next();
  }
  this.password = await bcrypt.hash(update.password, 10);
});

const User = mongoose.model('User', schema);

module.exports = {
  User,
};
