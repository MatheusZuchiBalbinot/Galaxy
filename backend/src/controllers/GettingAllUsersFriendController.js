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

		const outputArray = result.map(({ RecipientId }) => ({ RecipientId }));

        if (result.length > 0) {

            const usersData = {}
            
			await Promise.all(outputArray.map(async (item) => {
                const response = await userCollection.findOne(
                    { _id: new ObjectId(item.RecipientId) },
                    { projection: { avatar: 1, nickName: 1, userDescription: 1, }}    
                );
                usersData[item.RecipientId] = response;
            }));

            res.status(200).json({ usersData });
        } else {
            res.status(404).json({ message: "O usuário não tem amigos aceitos" });
        }
    } catch (error) {
        console.error("Erro ao obter amizades do usuário:", error);
        res.status(500).json({ error: "Erro interno do servidor", message: "Erro ao tentar obter todas as amizades atuais do usuário" });
    }
};

module.exports = GettingAllUsersFriend;
