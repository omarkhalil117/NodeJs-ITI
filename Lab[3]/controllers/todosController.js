const {
  readFile, addIntoList, deleteFromList, editList,
} = require('../helperFunctions');
const TodosModel = require('../models/todoModel');

const getAll = () => {
  const list = TodosModel.getAll();
  return list;
};

const findById = (id) => {
  let list = TodosModel.getAll();

  if (Number.isNaN(Number(id))) {
    return;
  }

  list = list.filter((el) => el.id == id);

  if (list.length === 0) {
    return;
  }

  return list;
};

const addTodo = (title) => {
  const list = TodosModel.getAll();

  list.push({ title, status: 'to-do', id: list[list.length - 1].id + 1 });

  TodosModel.writIntoFile(list);
};

const deleteTodo = (idNumber) => {
  // read data
  const parsed = TodosModel.getAll();

  // find the deleted object index
  const newList = parsed.filter((el) => el.id !== idNumber);

  // check if there is deleted item
  if (parsed.length === newList.length) {
    return false;
  }

  // write new Array
  TodosModel.writIntoFile(newList);

  return true;
};

const updateTodo = (id, title, status) => {
  // read content
  const list = TodosModel.getAll();

  // find index
  const elementToEdit = list.find((el) => el.id == id);

  if (!elementToEdit) {
    return false;
  }

  if (title) {
    elementToEdit.title = title;
  }

  if (status) {
    elementToEdit.status = status;
  }

  TodosModel.writIntoFile(list);

  return true;
};

module.exports = {
  findById, getAll, addTodo, deleteTodo, updateTodo,
};
