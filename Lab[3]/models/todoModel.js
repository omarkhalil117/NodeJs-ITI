const fs = require('fs');
const path = require('path');

const getAll = () => {
  const content = fs.readFileSync(path.join(__dirname, '../todoList.json'));
  return JSON.parse(content);
};

const writIntoFile = (content) => {
  fs.writeFileSync(path.join(__dirname, '../todoList.json'), JSON.stringify(content));
};
module.exports = { getAll, writIntoFile };
