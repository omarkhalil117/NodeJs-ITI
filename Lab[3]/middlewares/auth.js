const jsonWebToken = require('jsonwebtoken');

function authMiddlware(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'unautharized' });
    }
    const valid = jsonWebToken.verify(authorization, 'aabbccssdafwac');

    if (!valid) {
      return res.status(401).json({ message: 'unautharized' });
    }
    next();
    return 0;
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
}
module.exports = {
  authMiddlware,
};
