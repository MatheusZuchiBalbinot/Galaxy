const GetUserInfoModel = require('../model/GetUserInfoModel');
const InsertTweetModel = require('../model/InsertTweetModel')
const getUserIdByTokenModel = require('../model/getUserIdByTokenModel')

const UserTweetController = async (client, req, res, userData, userId) => {
    try {
        const { content, actualDate } = req.body;
        const { text, image, video } = content;
        const { hours, minutes, days, month, year } = actualDate;

        const tweetDocument = {
            userId,
            nickName: userData.nickName,
            likes: 0,
            content: {
              text: text,
              image: image,
              video: video, 
            },
            actualDate: {
              hours,
              minutes,
              days,
              month,
              year,
            },
            comments: {},
          };

        try {
            const addingTweet = await InsertTweetModel(client, tweetDocument);
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