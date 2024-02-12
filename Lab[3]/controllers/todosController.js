const Todo = require('../models/Todo');

// /////////////////////////////////////////////////////////////////


async function getUserTodos(userId) {
  const todos = await Todo.find({ _id: userId });
  return todos;
}

// /////////////////////////////////////////////////////////////////

async function getAll() {
  const todos = await Todo.find({});
  return todos;
}

// /////////////////////////////////////////////////////////////////

async function addTodo(newTodo) {
  const addedTodo = await Todo.create(newTodo);
  return addedTodo;
}

// /////////////////////////////////////////////////////////////////

async function deleteTodo(id) {
  const deletedTodo = await Todo.deleteOne({ _id: id });
  return deletedTodo;
}

// /////////////////////////////////////////////////////////////////

async function updateTodo(id, update) {
  // if (!cookie || this.userId.toString() !== cookie) {
  //   throw new Error('Unautharized');
  // }
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: id },
    update,
    { runValidators: true, new: true },
  );
  return updatedTodo;
}

// /////////////////////////////////////////////////////////////////

async function findByQuery(query) {
  const todos = await Todo.find(query);
  return todos;
}
module.exports = {
  getAll,
  addTodo,
  deleteTodo,
  updateTodo,
  findByQuery,
  getUserTodos,
};
