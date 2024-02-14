const jsonWebToken = require('jsonwebtoken');

function verifyUsers(req, res, next) {
  const { id } = req.params;
  const { authorization } = req.headers;

  const { userId } = jsonWebToken.decode(authorization, process.env.SECRET_KEY);

  // check if token id equals request parametar id
  if (userId !== id) {
    return res.status(401).json({ message: 'Unautharized' });
  }
  next();
  return 0;
}

module.exports = {
  verifyUsers,
};
