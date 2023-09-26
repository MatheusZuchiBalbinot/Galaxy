async function AddFriendshipRequest(client, RecipientId, SenderId) {
    try {
        const dbCollection = client.db("cluster0").collection("friendship");

        const existingRecord = await dbCollection.findOne({
            RecipientId,
            SenderId,
        });

        if (existingRecord) {
            console.log("Friendship request already exists.");
            return { success: false, message: 'Friendship request already exists' };
        } else {
            const data = {
                RecipientId,
                SenderId,
                Status: "pendente"
            };
    
            const result = await dbCollection.insertOne(data);
    
            console.log(result)
        }

    } catch (error) {
        console.error("Error while attempting to insert friendship request:", error);
        return { success: false, error: 'Error while attempting to insert friendship request' };
    }
}

module.exports = AddFriendshipRequest;
