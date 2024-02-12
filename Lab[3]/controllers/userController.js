const { User } = require('../models/User');
const Todo = require('../models/Todo');

async function findOne(query) {
  const result = User.findOne(query);
  return result;
}

// /////////////////////////////////////////////////////////////////

async function getAll() {
  const users = await User.find({}, '-password');
  return users;
}

// /////////////////////////////////////////////////////////////////

async function addUser(newUser) {
  const addedUser = await User.create(newUser);
  return addedUser;
}

// /////////////////////////////////////////////////////////////////

async function deleteUser(id) {
  const deletedUser = await User.deleteOne({ _id: id });
  return deletedUser;
}

// /////////////////////////////////////////////////////////////////

async function updateUser(id, update) {
  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    update,
    {
      runValidators: true,
      new: true,
    },
  );
  return updatedUser;
}

// /////////////////////////////////////////////////////////////////

async function getUserTodos(id) {
  const userTodos = Todo.find({ userId: id });
  return userTodos;
}

module.exports = {
  getAll,
  addUser,
  deleteUser,
  updateUser,
  findOne,
  getUserTodos,
};
