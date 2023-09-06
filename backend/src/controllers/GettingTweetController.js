const GetTweetsModel = require("../model/GetTweetsModel")

const GettingTweetController = async (client, req, res, getTweetsType) => {
    try {
        const result = await GetTweetsModel(client, getTweetsType)
        res.status(200).json({result});
    } catch(error) {
        console.error('Error getting Tweet:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = GettingTweetController