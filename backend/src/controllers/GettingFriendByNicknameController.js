const GetUserIdByToken = require("../model/GetUserIdByTokenModel")

const ObjectId = require('mongodb').ObjectId;

const GettingFriendByNickname = async (client, req, res, searchFriend, jwtToken) => {
    try {
        const usersCollection = client.db("cluster0").collection("users");
        const friendshipCollection = client.db("cluster0").collection("friendship");

        const userId = GetUserIdByToken(jwtToken)

        const regex = new RegExp(searchFriend, 'i');

        const projection = { avatar: 1, nickName: 1, userDescription: 1, _id: 1}

        const result = await usersCollection
            .find({
                $and: [
                    { _id: { $ne: new ObjectId(userId) } },
                    { nickName: { $regex: regex } }
                ]
            })
            .project(projection)
            .toArray();

        if (result.length === 0) {
            res.status(200).json({ message: `Nenhum usuário com o ${searchFriend} encontrado` });
        } else {
            res.status(200).json({ users: result });
        }
    } catch (error) {
        console.error("Erro ao buscar amigos por nickname:", error);
        res.status(500).json({ error: "Erro ao buscar amigos por nickname" });
    }
};

module.exports = GettingFriendByNickname;
