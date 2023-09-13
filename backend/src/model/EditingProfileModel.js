const ObjectId = require('mongodb').ObjectId;

async function EditingProfile(client, userId, data) {
    try {
        const dbCollection = client.db("cluster0").collection("users")
        const {nickName, userDescription, avatar} = data
        const updateFields = {
            nickName,
            userDescription,
            avatar,
        };
        const result = await dbCollection.updateOne({ _id: new ObjectId(userId) }, { $set: updateFields });
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = EditingProfile