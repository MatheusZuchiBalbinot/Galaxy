const GetUserInfoModel = require('../model/GetUserInfoModel');
const InsertTweetModel = require('../model/InsertTweetModel')
const GetUserIdByTokenModel = require('../model/GetUserIdByTokenModel')

const UserTweetController = async (client, req, res, userId) => {
    try {
        const { content, actualDate } = req.body;
        const { text, image, video } = content;
        const { seconds, minutes, hours, days, month, year } = actualDate;

        const tweetDocument = {
            userId,
            likes: 0,
            content: {
              text: text,
              image: image,
              video: video, 
            },
            actualDate: {
              seconds,
              minutes,
              hours,
              days,
              month,
              year,
            },
            comments: {},
          };

        try {
            const addingTweet = await InsertTweetModel(client, tweetDocument);
            res.status(200).json({message: "Tweet inserted with Sucess."})
        } catch(error) {
            console.error('Error when insert data:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }

    } catch(error) {
        console.error('Error in Tweet:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

module.exports = UserTweetController