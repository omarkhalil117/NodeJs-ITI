const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/todosRoutes');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/TodoDB');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'pug');

app.use(express.json());

app.use('/todos', router);

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
