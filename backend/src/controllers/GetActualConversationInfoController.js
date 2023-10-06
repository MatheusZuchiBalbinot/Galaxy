const { ObjectId } = require("mongodb");
const GetUserIdByToken = require("../model/GetUserIdByTokenModel");

const GetActualConversationInfo = async (client, req, res, actualChatConversationId, jwtToken) => {

    const friendshipCollection = client.db("cluster0").collection("friendship");
    const userCollection = client.db("cluster0").collection("users");
    
    const userId = GetUserIdByToken(jwtToken)
    
    try {
        const result = await friendshipCollection.findOne(
            {_id: new ObjectId(actualChatConversationId)}
        )

        if(result.RecipientId == userId) {
            const getAnotherPersonChatInfo = await userCollection.findOne(
                { _id: new ObjectId(result.SenderId)},
                { projection: { avatar: 1, nickName: 1, userDescription: 1, _id: 0 }}    
            );
            res.status(200).json({getAnotherPersonChatInfo})

        } else {
            const getAnotherPersonChatInfo = await userCollection.findOne(
                { _id: new ObjectId(result.RecipientId)},
                { projection: { avatar: 1, nickName: 1, userDescription: 1, _id: 0  }}    
            );
            res.status(200).json({getAnotherPersonChatInfo})
        }
    } catch (error) {
        console.error("Erro ao obter informações do Chat do destinatário", error);
        res.status(500).json({ message: "Erro ao obter informações do Chat do destinatário" });
    }
}

module.exports = GetActualConversationInfo