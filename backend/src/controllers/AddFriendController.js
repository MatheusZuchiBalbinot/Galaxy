const { ObjectId } = require("mongodb");

const AddFriendController = async (client, req, res, friendRequestId, acceptOrRefuse) => {
    const usersCollection = client.db("cluster0").collection("users")
    const friendCollection = client.db("cluster0").collection("friendship");
    try {

        let changeFriendStateToAccept;

        if(acceptOrRefuse == "aceito") {
        
            const update = {
                $set: {
                    Status: acceptOrRefuse,
                    messages: [] 
                }
            };

            changeFriendStateToAccept = await friendCollection.findOneAndUpdate(
                { _id: new ObjectId(friendRequestId) },
                update,
                { returnOriginal: true }
              );

            const RecipientId = changeFriendStateToAccept.value.RecipientId
            const SenderId = changeFriendStateToAccept.value.SenderId

            console.log(RecipientId, SenderId)

            const result = await usersCollection.updateMany(
                {
                    _id: { $in: [new ObjectId(RecipientId), new ObjectId(SenderId)] }
                },
                {
                    $addToSet: {
                        actualFriends: new ObjectId(friendRequestId)
                    }
                }
            );

            console.log(result)

        } else {
            changeFriendStateToAccept = await friendCollection.updateOne(
                { _id: new ObjectId(friendRequestId) },
                { $set: { Status: acceptOrRefuse } }
            );
        }
          
        if (changeFriendStateToAccept.ok === 1) {
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