async function insertOneInRegister(client, newListining) {
    const result = await client.db("cluster0").collection("users").insertOne(newListining)

    console.log(`New listing created with the following id ${result.insertedId}`)
}

module.exports = insertOneInRegister