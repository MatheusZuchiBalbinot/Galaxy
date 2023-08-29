const express = require('express');
const router = express.Router();

const UserRegisterController = require('../controllers/UserRegisterController');
const UserLoginController = require('../controllers/UserLoginController');
const UserTweetController = require('../controllers/UserTweetController')

module.exports = (client) => {
  router.post('/user/register', (req, res) => {
    UserRegisterController(client, req, res);
  });

  router.post('/user/login', async (req, res) => {
    UserLoginController(client, req, res);
  });

  router.post('/user/tweet', async(req, res) => {
    UserTweetController(client, req, res);
  })

  return router;
};
