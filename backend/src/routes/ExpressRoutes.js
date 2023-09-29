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
const GettingFriendByNickname = require("../controllers/GettingFriendByNicknameController");
const AddFriendController = require('../controllers/AddFriendController');
const SendFriendRequestToSearchedUsers = require('../controllers/SendFriendRequestToSearchedUsersController');

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

  router.post('/user/sendFriendRequestByNickName/:nickName', async(req, res) => {
    const nickName = req.params.nickName
    const jwtToken = req.body.headers['Authorization']
    SendFriendRequestToSearchedUsers(client, req, res, nickName, jwtToken)
  })

  router.post('/tweet/user:tweetId', async(req, res) => {
    const tweetId = req.params.tweetId
    const jwtToken = req.body.headers['Authorization']
    GettingTweetUserInfoController(client, req, res, tweetId, jwtToken);
  })

  router.post('/user/getFriendByNickname:searchFriend', async(req, res) => {
    const jwtToken = req.body.headers['Authorization']
    const searchFriend = req.params.searchFriend
    GettingFriendByNickname(client, req, res, searchFriend, jwtToken);
  })

  router.patch('/user/profile/edit', async(req, res) => {
    const jwtToken = req.headers['authorization']
    ProfileChangesController(client, req, res, jwtToken);
  })

  router.patch('/user/acceptOrRefuseFriendRequest', async(req, res) => {
    const friendRequestId = req.body.friendRequestId
    const acceptOrRefuse = req.body.AcceptOrRefuse
    AddFriendController(client, req, res, friendRequestId, acceptOrRefuse);
  })

  router.get('/user/profile', async(req, res) => {
    const jwtToken = req.headers['authorization']
    GetUserInfoModel(client, req, res, jwtToken);
  })

  router.get('/user/GetTweet/:actualSelector', async(req, res) => {
    const getTweetsType = req.params.actualSelector
    GettingTweetController(client, req, res, getTweetsType);
  })

  router.get('/user/GetFriendRequests', async(req, res) => {
    const jwtToken = req.headers['authorization']
    GettingFriendRequestsController(client, req, res, jwtToken);
  })

  return router;
};
