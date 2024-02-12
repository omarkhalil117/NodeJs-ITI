const jsonWebToken = require('jsonwebtoken');

function verifyUsers(req, res, next) {
  const { id } = req.params;
  const { authorization } = req.headers;

  const tokenUserId = jsonWebToken.decode(authorization, 'aabbccssdafwac').userId;

  if (tokenUserId !== id) {
    return res.status(401).json({ message: 'Unautharized' });
  }
  next();
  return 0;
}

module.exports = {
  verifyUsers,
};
