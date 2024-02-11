const User = require('../models/User');

async function getAll() {
  const users = await User.find();
  return users;
}

module.exports = {
  getAll,
};
