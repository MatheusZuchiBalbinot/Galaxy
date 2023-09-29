const GetUserIdByToken = require("../model/GetUserIdByTokenModel");
const AddFriendshipRequest = require("../model/AddFriendshipRequestModel");

async function SendFriendRequestToSearchedUsers(client, req, res, nickName, jwtToken) {
    const dbCollection = client.db("cluster0").collection("users");

    try {
        const userId = await GetUserIdByToken(jwtToken);

        const filter = { nickName };
        const lookForId = await dbCollection.findOne(filter, { projection: { _id: 1 } });

        if (!lookForId) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const senderId = lookForId._id.toString();

        const result = await AddFriendshipRequest(client, userId, senderId);

        if (result === true) {
            res.status(200).json({ result });
        } else {
            res.status(400).json({ message: "Erro ao tentar adicionar pedido de amizade!!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro interno do servidor" });
    }
}

module.exports = SendFriendRequestToSearchedUsers;
