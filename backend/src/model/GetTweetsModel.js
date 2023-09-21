const ObjectId = require('mongodb').ObjectId;

async function GetTweetsModel(client, getTweetsType) {
    const dbCollection = client.db("cluster0").collection("tweets")
	const userCollection = client.db("cluster0").collection("users")

    switch (getTweetsType) {
        case "orderByRecent":
            const tweetsData = await dbCollection
			.find()
				.sort({
					'actualDate.year': -1,
					'actualDate.month': -1,
					'actualDate.days': -1,
					'actualDate.hours': -1,
					'actualDate.minutes': -1,
					'actualDate.seconds': -1
				})
			.toArray();

			const updatedTweets = await Promise.all(
			tweetsData.map(async (tweet) => {
				try {
				const user = await userCollection.findOne(
					{ _id: new ObjectId(tweet.userId) },
					{ projection: { _id: 0, nickName: 1 } }
				);
					
				if (user) {
					return { ...tweet, nickName: user.nickName };
				} else {
					console.log(`Usuário com userId ${tweet.userId} não encontrado.`);
					return tweet;
				}
				} catch (error) {
					console.error("Erro ao buscar usuário:", error);
					return tweet;
				}
			})
		);

		return updatedTweets;
    }
}

module.exports = GetTweetsModel