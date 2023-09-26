const ObjectId = require('mongodb').ObjectId;

const GetUserIdByTokenModel = require("./GetUserIdByTokenModel")

async function GetUserInfoModel(client, req, res, accessToken) {
    try {
        const dbCollection = client.db("cluster0").collection("users")
        const userId = GetUserIdByTokenModel(accessToken)

        const user = await dbCollection.findOne(
            { _id: new ObjectId(userId) },
            { projection: { _id: 0, nickName: 1, avatar: 1, createdInDate: 1, userDescription: 1, } }
          );
        
        res.status(200).json({user});
        return user
    } catch (error) {
        console.error("Error getting user Info");
        throw error;
    }
}

module.exports = GetUserInfoModel