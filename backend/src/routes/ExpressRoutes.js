const express = require('express');
const router = express.Router();

const UserRegisterController = require('../controllers/UserRegisterController');
const UserLoginController = require('../controllers/UserLoginController');
const InsertingTweetController = require('../controllers/InsertingTweetController');
const GettingTweetController = require('../controllers/GettingTweetController');
const ProfileChangesController = require('../controllers/ProfileChangesController');
const GettingTweetUserInfoController = require('../controllers/GettingTweetUserInfoController');
const SendFriendRequestController = require('../controllers/SendFriendRequestController');
const GettingFriendRequestsController = require("../controllers/GettingFriendRequestsController");
const GettingFriendByNickname = require("../controllers/GettingFriendByNicknameController")

const GetUserInfoModel = require("../model/GetUserInfoModel");
const GetUserIdByToken = require('../model/GetUserIdByTokenModel');

module.exports = (client, io) => {

  router.post('/user/register', (req, res) => {
    UserRegisterController(client, req, res);
  });

  router.post('/user/login', async (req, res) => {
    UserLoginController(client, req, res);
  });

  router.post('/user/InsertTweet', async(req, res) => {
    const jwtToken = req.headers['authorization'];
    const userId = await GetUserIdByToken(jwtToken)
    InsertingTweetController(client, req, res, userId);
  })

  router.post('/user/friendrequest:tweetId', async(req, res) => {
    const tweetId = req.params.tweetId
    const jwtToken = req.body.headers['Authorization']
    SendFriendRequestController(client, req, res, tweetId, jwtToken)
  })

  router.patch('/user/profile/edit', async(req, res) => {
    const jwtToken = req.headers['authorization']
    ProfileChangesController(client, req, res, jwtToken);
  })

  router.get('/user/profile', async(req, res) => {
    const jwtToken = req.headers['authorization']
    GetUserInfoModel(client, req, res, jwtToken);
  })

  router.get('/user/GetTweet/:actualSelector', async(req, res) => {
    const getTweetsType = req.params.actualSelector
    GettingTweetController(client, req, res, getTweetsType);
  })

  router.get('/tweet/user:tweetId', async(req, res) => {
    const tweetId = req.params.tweetId
    GettingTweetUserInfoController(client, req, res, tweetId);
  })

  router.get('/user/GetFriendRequests', async(req, res) => {
    const jwtToken = req.headers['authorization']
    GettingFriendRequestsController(client, req, res, jwtToken);
  })

  router.get('/user/getFriendByNickname:searchFriend', async(req, res) => {
    const searchFriend = req.params.searchFriend
    GettingFriendByNickname(client, req, res, searchFriend);
  })

  return router;
};
