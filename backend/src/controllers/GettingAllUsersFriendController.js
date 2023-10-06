const GetUserIdByToken = require("../model/GetUserIdByTokenModel");
const { ObjectId } = require('mongodb');

const GettingAllUsersFriend = async (client, req, res, jwtToken) => {
    const friendshipCollection = client.db("cluster0").collection("friendship");
    const userCollection = client.db("cluster0").collection("users"); 

    try {
        const userId = await GetUserIdByToken(jwtToken)

		const result = await friendshipCollection.find(
			{
				Status: "aceito",
				$or: [
					{ RecipientId: userId },
					{ SenderId: userId }
				]
			},
		).toArray();

		const friendshipArray = result.map(({ RecipientId, SenderId, _id }) => ({ RecipientId, SenderId, friendshipId: _id }));

        if (result.length > 0) {

            const usersData = {}
            
			await Promise.all(friendshipArray.map(async (item) => {

                const userIdToQuery = item.SenderId === userId ? item.RecipientId : item.SenderId;

                const response = await userCollection.findOne(
                    { _id: new ObjectId(userIdToQuery) },
                    { projection: { avatar: 1, nickName: 1, userDescription: 1, _id: 0}}    
                );
                usersData[item.friendshipId] = {
                    friendshipId: item.friendshipId,
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
