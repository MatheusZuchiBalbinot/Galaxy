const ObjectId = require('mongodb').ObjectId;

const AddFriendController = async (client, req, res, friendRequestId, acceptOrRefuse) => {
    const friendCollection = client.db("cluster0").collection("friendship");
    try {
        const changeFriendStateToAccept = await friendCollection.updateOne(
            { _id: new ObjectId(friendRequestId) },
            { $set: { Status: acceptOrRefuse } }
        );

        console.log(changeFriendStateToAccept)
          
        if (changeFriendStateToAccept.modifiedCount === 1) {
            console.log(`Status do amigo atualizado para ${acceptOrRefuse}.`);
            res.status(200).json({message: "NOW WE ARE FRIENDS FOREVER"})
        } else {
            console.log('Não foi possível atualizar o status do amigo. Nenhum documento correspondente encontrado.');
            res.status(400).json({message: "CAN'T FIND FRIEND REQUEST"})
        }
    } catch(error) {
        console.error(error)
    }
}

module.exports = AddFriendController