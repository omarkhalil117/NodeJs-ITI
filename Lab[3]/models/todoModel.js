const fs = require('fs');
const path = require('path');

const getAll = () => {
  const oldContent = fs.readFileSync(path.join(__dirname, '../todoList.json'));
  return JSON.parse(oldContent);
};

const writIntoFile = (content) => {
  fs.writeFileSync(path.join(__dirname, '../todoList.json'), JSON.stringify(content));
};
module.exports = { getAll, writIntoFile };
