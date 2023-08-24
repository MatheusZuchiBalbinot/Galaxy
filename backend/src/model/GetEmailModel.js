async function GetEmailModel(client, email) {
    try {
        const dbCollection = client.db("cluster0").collection("users")
        const user = await dbCollection.findOne({ email });
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = GetEmailModel