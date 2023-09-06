async function GetUserIdModel(client, nickName) {
    try {
        const dbCollection = client.db("cluster0").collection("users")
        const user = await dbCollection.findOne({ nickName });
        return user._id.toString();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = GetUserIdModel