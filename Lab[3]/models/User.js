const mongoose = require('mongoose');

const schema = mongoose.Schema({

  username: {
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

  lastname: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 15,
  },

  dob: {
    type: Date,
    required: false,
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', schema);

module.exports = {
  User,
};
