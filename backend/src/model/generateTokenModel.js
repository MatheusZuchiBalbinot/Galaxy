const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_AUTH_MAIN;

function generateTokenMiddleware(userId) {

  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '1h' });
  return token;
}

module.exports = generateTokenMiddleware;

