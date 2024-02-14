const express = require('express');

const router = express.Router();
const jsonWebToken = require('jsonwebtoken');
const userController = require('../controllers/userController');

const { authMiddlware } = require('../middlewares/auth');
const { verifyUsers } = require('../middlewares/verifyUsers');

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userController.findOne({ username });
    const valid = await user.verifyPassword(password);

    if (!valid) {
      return res.status(401).json({ message: 'Wrong username or password' });
    }

    // eslint-disable-next-line no-underscore-dangle
    const userId = user._id;
    res.cookie('userId', userId);
    const token = jsonWebToken.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1d' });
    return res.json(token);
  } catch (err) {
    res.status(401).json([{ message: 'User email or password incorrect' }]);
    return 0;
  }
});

// /////////////////////////////////////////////////////////////////

// get all users

router.get('/', async (req, res) => {
  try {
    const allUsers = await userController.getAll();
    res.json(allUsers);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// /////////////////////////////////////////////////////////////////

router.post('/signup', async (req, res) => {
  try {
    const result = await userController.addUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// /////////////////////////////////////////////////////////////////

router.delete('/:id', authMiddlware, verifyUsers, async (req, res) => {
  try {
    const deleted = await userController.deleteUser(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// /////////////////////////////////////////////////////////////////

router.patch('/:id', authMiddlware, verifyUsers, async (req, res) => {
  try {
    const updatedUser = await userController.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (err) {
    res.status(404).send(err.message);
  }
});

// /////////////////////////////////////////////////////////////////

router.get('/:id/todos', authMiddlware, verifyUsers, async (req, res) => {
  try {
    const userTodos = await userController.getUserTodos(req.params.id);
    res.json(userTodos);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

module.exports = router;
