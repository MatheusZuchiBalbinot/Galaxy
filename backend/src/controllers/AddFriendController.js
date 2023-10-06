const { ObjectId } = require("mongodb");

const AddFriendController = async (client, req, res, friendRequestId, acceptOrRefuse) => {
    const friendCollection = client.db("cluster0").collection("friendship");
    try {

        let changeFriendStateToAccept;

        if(acceptOrRefuse == "aceito") {

            // const message = {
            //     senderId: ObjectId("senderUserId"),
            //     content: "Esta é a mensagem de exemplo.",
            //     timestamp: new Date()
            // };
        
            const update = {
                $set: {
                    Status: acceptOrRefuse,
                    messages: [] 
                }
            };

            changeFriendStateToAccept = await friendCollection.updateOne(
                { _id: new ObjectId(friendRequestId) },
                update
            );
        } else {
            changeFriendStateToAccept = await friendCollection.updateOne(
                { _id: new ObjectId(friendRequestId) },
                { $set: { Status: acceptOrRefuse } }
            );
        }
          
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