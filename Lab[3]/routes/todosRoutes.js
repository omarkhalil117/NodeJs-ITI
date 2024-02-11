const express = require('express');
// const TodosMiddleware = require('../middlewares/todosMiddleware');

const router = express.Router();
// const todosController = require('../controllers/todosController');
const userController = require('../controllers/user');
const todoController = require('../controllers/todosController');
/// /////////////////////////////////////////////////////////////////

// get all list unless there is query parametars

router.get('/', (req, res) => {
  const allUsers = userController.getAll();
  res.json(allUsers);
  // const allTodos = todoController.getAll();
  // res.json(allTodos);
});

/// /////////////////////////////////////////////////////////////////

// get todo by id

// router.get('/:id', TodosMiddleware.getMiddlware, (req, res) => {
//   const { id } = req.params;
//   const action = todosController.findById(id);

//   if (!action) {
//     res.status(404).json([{ message: 'id not found' }]);
//   }

//   res.status(200).render('todos.pug', { list: action });
// });

// /// /////////////////////////////////////////////////////////////////

// // add todo
// router.post('/', TodosMiddleware.postMiddleware, (req, res) => {
//   const { title } = req.body;

//   todosController.addTodo(title.trim());

//   res.status(201).json([{ message: 'Created' }]);
// });

// /// /////////////////////////////////////////////////////////////////

// // delete todo
// router.delete('/:id', TodosMiddleware.deleteMiddleware, (req, res) => {
//   const id = Number(req.params.id);

//   const deleted = todosController.deleteTodo(id);

//   if (!deleted) {
//     res.status(304).json([{ message: 'not modified' }]);
//     return;
//   }

//   res.status(202).json([{ message: 'deleted successfully' }]);
// });

// /// /////////////////////////////////////////////////////////////////

// // update title or status or both

// router.patch('/:id', TodosMiddleware.patchMiddlware, (req, res) => {
//   const id = Number(req.params.id);
//   const { title } = req.body;
//   const { status } = req.body;

//   const edited = todosController.updateTodo(id, title.trim(), status);

//   if (!edited) {
//     res.status(400).json([{ message: 'id not found' }]);
//     return;
//   }

//   res.status(200).json([{ message: 'edited successfully' }]);
// });

module.exports = router;
