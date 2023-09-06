const ObjectId = require('mongodb').ObjectId;

async function EditingProfile(client, userId, data) {
    try {
        const dbCollection = client.db("cluster0").collection("users")
        const {nickName, userDescription} = data
        const updateFields = {
            nickName,
            userDescription
        };
        
        console.log("Trying to Edit")

        const result = await dbCollection.updateOne({ _id: new ObjectId(userId) }, { $set: updateFields });
        console.log(result)
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = EditingProfile