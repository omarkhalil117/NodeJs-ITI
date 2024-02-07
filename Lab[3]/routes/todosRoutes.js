const express = require('express');
const pug = require('pug');
const TodosMiddleware = require('../middlewares/todosMiddleware');

const router = express.Router();
const todosController = require('../controllers/todosController');

/// /////////////////////////////////////////////////////////////////

router.get('/', (req, res) => {
  if (!req.query.status) {
    const todos = todosController.getAll();
    res.status(200).render('todos', { list: todos });
    return;
  }

  let todos = todosController.getAll();
  todos = todos.filter((el) => el.status === req.query.status);

  if (todos.length === 0) {
    res.status(404).json([{ message: 'Not found' }]);
    return;
  }

  res.status(200).render('todos', { list: todos });
});

/// /////////////////////////////////////////////////////////////////

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const action = todosController.findById(id);

  if (!action) {
    res.status(404).json([{ message: 'id not found' }]);
  }

  res.status(200).render('todos.pug', { list: action });
});

/// /////////////////////////////////////////////////////////////////

router.post('/', TodosMiddleware.postMiddleware, (req, res) => {
  const { title } = req.body;

  todosController.addTodo(title.trim());

  res.status(201).json([{ message: 'Created' }]);
});

/// /////////////////////////////////////////////////////////////////

router.delete('/:id', TodosMiddleware.deleteMiddleware, (req, res) => {
  const id = Number(req.params.id);

  const deleted = todosController.deleteTodo(id);

  if (!deleted) {
    res.status(304).json([{ message: 'not modified' }]);
    return;
  }

  res.status(202).json([{ message: 'deleted successfully' }]);
});

/// /////////////////////////////////////////////////////////////////

router.patch('/:id', TodosMiddleware.patchMiddlware, (req, res) => {
  const id = Number(req.params.id);
  const { title } = req.body;
  const { status } = req.body;

  const edited = todosController.updateTodo(id, title.trim(), status);

  if (!edited) {
    res.status(400).json([{ message: 'id not found' }]);
    return;
  }

  res.status(200).json([{ message: 'edited successfully' }]);
});

module.exports = router;
