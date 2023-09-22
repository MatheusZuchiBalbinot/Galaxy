const ObjectId = require('mongodb').ObjectId;

const GetUserIdByTweetIdModel = async (client, tweetId) => {
    try {
        const tweetsCollection = client.db("cluster0").collection("tweets")

        const gettingUserIdByTweetId = await tweetsCollection.findOne(
            { _id: new ObjectId(tweetId) },
            { projection: { _id: 0, userId: 1} }
        );

        return gettingUserIdByTweetId;

    } catch(error) {
        console.error('Erro pegando o ID do usuário pelo ID do Tweet:', error);
        throw new Error('Internal Server Error');
    }
}

module.exports = GetUserIdByTweetIdModel;