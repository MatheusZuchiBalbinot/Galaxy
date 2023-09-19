const express = require('express');
const router = express.Router();

const UserRegisterController = require('../controllers/UserRegisterController');
const UserLoginController = require('../controllers/UserLoginController');
const InsertingTweetController = require('../controllers/InsertingTweetController');
const GettingTweetController = require('../controllers/GettingTweetController');
const ProfileChangesController = require('../controllers/ProfileChangesController');

const GetUserInfoModel = require("../model/GetUserInfoModel");
const getUserIdByTokenModel = require('../model/getUserIdByTokenModel');

module.exports = (client) => {
  router.post('/user/register', (req, res) => {
    UserRegisterController(client, req, res);
  });

  router.post('/user/login', async (req, res) => {
    UserLoginController(client, req, res);
  });

  router.post('/user/InsertTweet', async(req, res) => {
    const jwtToken = req.headers['authorization'];
    const userData = await GetUserInfoModel(client, req, res, jwtToken);
    const userId = await getUserIdByTokenModel(jwtToken)
    InsertingTweetController(client, req, res, userData, userId);
  })

  router.get('/user/profile', async(req, res) => {
    const jwtToken = req.headers['authorization']
    GetUserInfoModel(client, req, res, jwtToken);
  })

  router.patch('/user/profile/edit', async(req, res) => {
    const jwtToken = req.headers['authorization']
    ProfileChangesController(client, req, res, jwtToken);
  })

  router.get('/user/GetTweet/:actualSelector', async(req, res) => {
    const getTweetsType = req.params.actualSelector
    GettingTweetController(client, req, res, getTweetsType);
  })

  return router;
};
