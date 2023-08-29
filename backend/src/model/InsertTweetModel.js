async function InsertTweetModel(client, tweetData) {
    try {
        const tweetCollection = client.db("cluster0").collection("tweets");
        const result = await tweetCollection.insertOne(tweetData);
        console.log(`New listing created with the following id ${result.insertedId}`);
        return result;
    } catch(error) {
        console.error("Error in model inserting tweet:", error);
        throw error;
    }

}

module.exports = InsertTweetModel