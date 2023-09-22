const ObjectId = require('mongodb').ObjectId;
const GetUserIdByTweetId = require("../model/GetUserIdByTweetIdModel")

const GettingTweetUserInfoController = async (client, req, res, tweetId) => {
    try {
        const userCollection = client.db("cluster0").collection("users")

        const gettingUserIdByTweetId = await GetUserIdByTweetId(client, tweetId)

        const user = await userCollection.findOne(
            { _id: new ObjectId(gettingUserIdByTweetId.userId) },
            { projection: { _id: 0, nickName: 1, avatar: 1, createdInDate: 1, userDescription: 1, } }
        );

        res.status(200).json({user})

    } catch(error) {
        console.error('Erro pegando informações do dono do Tweet:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = GettingTweetUserInfoController