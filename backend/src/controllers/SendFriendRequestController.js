const GetUserIdByTweetId = require("../model/GetUserIdByTweetIdModel");
const GetUserIdByToken = require("../model/GetUserIdByTokenModel");
const AddFriendshipRequest = require("../model/AddFriendshipRequestModel");

const SendFriendRequestController = async (client, req, res, tweetId, jwtToken) => {
    try {
        const userId = await GetUserIdByTweetId(client, tweetId);
        const RecipientId = userId.userId;

        const SenderId = await GetUserIdByToken(jwtToken);
        const result = await AddFriendshipRequest(client, SenderId, RecipientId);
        
        // Se a solicitação já existe no destinário ele também devolve true, porque a solicitação já foi enviada em algum momento.
        res.status(200).json({sucess: true});

    } catch (error) {
        console.error('Error sending friend request:', error);
        res.status(500).json({ success: false, error: 'Error sending friend request' });
    }
};

module.exports = SendFriendRequestController;