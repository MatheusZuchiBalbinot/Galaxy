const ObjectId = require('mongodb').ObjectId;

async function EditingProfile(client, userId, oldUserInfo, data) {

    const dbCollection = client.db("cluster0").collection("users")

    const updatedFields = {};

    if (oldUserInfo) {
        if (oldUserInfo.nickName !== data.nickName) {
            updatedFields.nickName = data.nickName;
        }
        if (oldUserInfo.userDescription !== data.userDescription) {
            updatedFields.userDescription = data.userDescription;
        }
        if (oldUserInfo.avatar !== data.avatar) {
            updatedFields.avatar = data.avatar;
        }
    }

    try {
        if (Object.keys(updatedFields).length > 0) {
            const result = await dbCollection.updateOne(
                { _id: new ObjectId(userId) },
                { $set: updatedFields }
            );
        } else {
            console.log("Nenhum item foi modificado");
        }
    } catch (error) {
        console.log("Erro na hora de inserir os campos modificados do usuário no banco.");
        console.error(error);
        throw error;
    }
}

module.exports = EditingProfile