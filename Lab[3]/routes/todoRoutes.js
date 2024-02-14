const express = require('express');
const jsonWebToken = require('jsonwebtoken');

const router = express.Router();

const todosController = require('../controllers/todosController');

const { authMiddlware } = require('../middlewares/auth');
const { verifyTodo } = require('../middlewares/verifyTodo');
// /////////////////////////////////////////////////////////////////

router.get('/', authMiddlware, async (req, res) => {
  try {
    if (!req.query.length) {
      const { authorization } = req.headers;
      const { userId } = jsonWebToken.decode(authorization);
      const todos = await todosController.getUserTodos(userId);
      return res.json(todos);
    }

    const todos = await todosController.findByQuery(req.query);
    return res.json(todos);
  } catch (err) {
    return res.status(404).json(err.message);
  }
});

// /////////////////////////////////////////////////////////////////

router.post('/', authMiddlware, async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { userId } = jsonWebToken.decode(authorization);

    // add user id to the body
    req.body.userId = userId;

    const newTodo = await todosController.addTodo(req.body);
    res.json(newTodo);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

// /////////////////////////////////////////////////////////////////

router.delete('/:id', authMiddlware, verifyTodo, async (req, res) => {
  try {
    console.log(req.params.id);
    const deletedTodo = await todosController.deleteTodo(req.params.id);
    res.json(deletedTodo);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

// /////////////////////////////////////////////////////////////////

router.patch('/:id', authMiddlware, verifyTodo, async (req, res) => {
  try {
    const updatedTodo = await todosController
      .updateTodo(req.params.id, req.body);

    res.json(updatedTodo);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

// /////////////////////////////////////////////////////////////////

module.exports = router;
