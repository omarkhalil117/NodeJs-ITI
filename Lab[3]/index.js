const express = require('express');
const mongoose = require('mongoose');
const cookiParser = require('cookie-parser');

const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/TodoDB');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(cookiParser());
app.set('view engine', 'pug');

app.use(express.json());

app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
