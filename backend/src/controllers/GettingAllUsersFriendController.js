const GetUserIdByToken = require("../model/GetUserIdByTokenModel");
const { ObjectId } = require('mongodb');

const GettingAllUsersFriend = async (client, req, res, jwtToken) => {
    const friendshipCollection = client.db("cluster0").collection("friendship");
    const userCollection = client.db("cluster0").collection("users"); 

    try {
        const userId = await GetUserIdByToken(jwtToken)

		const result = await userCollection.find(
            {_id: new ObjectId(userId)},
            {projection: {actualFriends: 1, _id: 0}}
		).toArray()

        const actualFriendsArray = result.length > 0 ? result[0].actualFriends : [];

        if (result.length > 0 && JSON.stringify(result) !== '[{}]') {

            const usersData = {}
            
			await Promise.all(actualFriendsArray.map(async (item) => {

                const friendData = await friendshipCollection.findOne({_id: new ObjectId(item)})

                const userIdToQuery = friendData.SenderId === userId ? friendData.RecipientId : friendData.SenderId;

                const response = await userCollection.findOne(
                    { _id: new ObjectId(userIdToQuery) },
                    { projection: { avatar: 1, nickName: 1, userDescription: 1, _id: 0}}    
                );

                usersData[item] = {
                    friendshipId: item,
                    ...response
                };
            }));

            res.status(200).json({ usersData });
        } else {
            res.status(404).json({ message: "O usuário não tem amigos aceitos" });
        }
    } catch (error) {
        console.error("Erro ao obter amizades do usuário:", error);
        res.status(500).json({ message: "Erro ao tentar obter todas as amizades atuais do usuário" });
    }
};

module.exports = GettingAllUsersFriend;
