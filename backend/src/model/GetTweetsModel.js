async function GetTweetsModel(client, getTweetsType) {
    const dbCollection = client.db("cluster0").collection("tweets")

    switch (getTweetsType) {
        case "orderByRecent":
            try {
                const tweetsData = await dbCollection.find()
                    .sort({
                        'actualDate.year': -1,
                        'actualDate.month': -1,
                        'actualDate.days': -1,
                        'actualDate.hours': -1,
                        'actualDate.minutes': -1
                    })
                    .toArray();
                return tweetsData
            } catch (error) {
                console.error("Error getting tweets:", error);
                return [];
            }
    }
}

module.exports = GetTweetsModel