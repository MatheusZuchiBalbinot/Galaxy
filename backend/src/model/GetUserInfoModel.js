async function GetUserInfoModel(client, req, res, userNickName) {
    try {
        const dbCollection = client.db("cluster0").collection("users")

        const user = await dbCollection.findOne(
            { nickName: userNickName },
            { projection: { _id: 0, nickName: 1, avatar: 1, createdInDate: 1, userDescription: 1, } }
          );

        const teste = await dbCollection.findOne({userNickName})
        
        res.status(200).json({user});
        return
    } catch (error) {
        console.error("Error getting user Info");
        throw error;
    }
}

module.exports = GetUserInfoModel