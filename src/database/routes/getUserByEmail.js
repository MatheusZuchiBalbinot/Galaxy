async function getUserByEmail(client, email) {
    try {
        const db = client.db("cluster0"); // Acessa o banco de dados
        const collection = db.collection("users");
        const user = await collection.findOne({ email });
        return user;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = getUserByEmail