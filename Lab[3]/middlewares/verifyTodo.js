const jsonWebToken = require('jsonwebtoken');
const Todo = require('../models/Todo');

async function verifyTodo(req, res, next) {
  const { id } = req.params;
  const { authorization } = req.headers;

  // get token user id
  const { userId } = jsonWebToken.decode(authorization, process.env.SECRET_KEY);

  // find todo
  const todo = await Todo.find({ _id: id });

  // get userId of the todo
  const todoUser = todo[0].userId.toString();

  if (userId !== todoUser) {
    return res.status(401).json({ message: 'Unautharized' });
  }
  next();
  return 0;
}

module.exports = {
  verifyTodo,
};
