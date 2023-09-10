const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_AUTH_MAIN;

function getUserIdByTokenModel(accessToken) {
  if (!accessToken) {
    throw new Error('Token de acesso não fornecido');
  }

  try {
    const token = accessToken.split(' ')[1];
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded.id)
    return decoded.id;
  } catch (err) {
    throw new Error('Token de acesso inválido');
  }
}

module.exports = getUserIdByTokenModel;
