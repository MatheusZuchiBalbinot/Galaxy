const GetUserIdByTweetId = require("../model/GetUserIdByTweetIdModel")

const SendFriendRequestController = async (client, req, res, tweetId) => {
    try {
        const GetUserIdByTweetId =  await GetUserIdByTweetId(client, tweetId)

        // ...
    } catch(error) {
        console.error('Error send friend request:', error);
        res.status(500).json({ success: false, error: 'Error send friend request' });
    }
}

module.exports = SendFriendRequestController