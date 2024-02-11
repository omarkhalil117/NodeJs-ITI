const Todo = require('../models/Todo');

async function getAll() {
  const todos = await Todo.find();
  return todos;
}

module.exports = {
  getAll,
};
