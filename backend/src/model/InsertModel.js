async function InsertModel(client, newListining, email, nickName) {
    try {
        const usersCollection = client.db("cluster0").collection("users");

        const checkIfEmailAlreadyExists = await usersCollection.findOne({ email });
        const checkIfNickNameAlreadyExists = await usersCollection.findOne({ nickName });

        if (!checkIfEmailAlreadyExists && !checkIfNickNameAlreadyExists) {
            const result = await usersCollection.insertOne(newListining);
            console.log(`New listing created with the following id ${result.insertedId}`);
        } else {
            const errorDetails = {};
            if (checkIfEmailAlreadyExists) {
                errorDetails.emailExists = true;
            }
            if (checkIfNickNameAlreadyExists) {
                errorDetails.nickNameExists = true;
            }
            throw errorDetails;
        }
    } catch (error) {
        throw error;
    }
}

module.exports = InsertModel;