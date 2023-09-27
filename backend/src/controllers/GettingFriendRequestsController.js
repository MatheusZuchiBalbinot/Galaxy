const ObjectId = require('mongodb').ObjectId;

const GetUserIdByToken = require("../model/GetUserIdByTokenModel");

const GettingFriendRequestsController = async (client, req, res, jwtToken) => {

  const friendShipCollection = client.db("cluster0").collection("friendship");
  const UserCollection = client.db("cluster0").collection("users")

  try {
    const userId = GetUserIdByToken(jwtToken);

    const projection = { _id: 1, RecipientId: 1 };

    const results = await friendShipCollection
      .find({ SenderId: userId, Status: "pendente" })
      .project(projection)
      .toArray();

    if (!results) {
      res.status(404).json({ message: "Nenhuma solicitação de amizade pendente encontrada" });
      return;
    }

    const infoResults = {}

    for(const data of results) {
      const RequestId = data._id
      const RecipientId = data.RecipientId

      const userInfo = await UserCollection.findOne(
        { _id: new ObjectId(RecipientId) },
        { projection: { _id: 0, nickName: 1, avatar: 1, userDescription: 1} }
      );

      infoResults[RequestId] = userInfo
    }

    res.status(200).json({ infoResults });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao buscar solicitações de amizade pendentes" });
  }
};

module.exports = GettingFriendRequestsController;
