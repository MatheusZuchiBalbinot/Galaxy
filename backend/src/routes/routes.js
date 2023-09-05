const express = require('express');
const router = express.Router();

const UserRegisterController = require('../controllers/UserRegisterController');
const UserLoginController = require('../controllers/UserLoginController');
const InsertingTweetController = require('../controllers/InsertingTweetController');
const GettingTweetController = require('../controllers/GettingTweetController');

const GetUserInfoModel = require("../model/GetUserInfoModel");

module.exports = (client) => {
  router.post('/user/register', (req, res) => {
    UserRegisterController(client, req, res);
  });

  router.post('/user/login', async (req, res) => {
    UserLoginController(client, req, res);
  });

  router.post('/user/InsertTweet', async(req, res) => {
    InsertingTweetController(client, req, res);
  })

  router.get('/user/profile/:nickName', async(req, res) => {
    const nickName = req.params.nickName
    GetUserInfoModel(client, req, res, nickName);
  })

  router.get('/user/GetTweet/:actualSelector', async(req, res) => {
    const getTweetsType = req.params.actualSelector
    GettingTweetController(client, req, res, getTweetsType);
  })

  return router;
};
