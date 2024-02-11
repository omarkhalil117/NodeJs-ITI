const mongoose = require('mongoose');

const schema = mongoose.Schema({
  userId: {
    ref: 'User',
    type: mongoose.Schema.ObjectId,
  },

  title: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 20,
  },

  status: {
    type: String,
    required: false,
    default: 'to-do',
    enum: ['to-do', 'in-progress', 'done'],
  },

  tags: {
    type: [String],
    required: false,
    maxLength: 10,
  },

}, {
  timestamp: true,
});

const Todo = mongoose.model('Todo', schema);

module.exports = {
  Todo,
};
