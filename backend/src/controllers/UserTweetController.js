const InsertTweetModel = require('../model/InsertTweetModel')
const GetUserIdModel = require('../model/GetUserIdModel')

const pako = require('pako')

const UserTweetController = async (client, req, res) => {
    try {

        console.log(req.body)

        const { nickName, userId, content, actualDate } = req.body;
        const { text, image, video } = content;
        const { hours, minutes, days, month, year } = actualDate;

        let imageBuffer = null;
        let videoBuffer = null;

        if (image != null) {
            imageBuffer = Buffer.from(image, 'base64');
        } else if (video != null) {
            videoBuffer = Buffer.from(video, 'base64');
        }

        const tweetDocument = {
            nickName,
            userId: '',
            likes: 0,
            content: {
              text: text,
              image: imageBuffer,
              video: videoBuffer,
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
            const result = await GetUserIdModel(client, nickName);
            tweetDocument.userId = result;
            console.log(tweetDocument)
            res.status(201)
        } catch(error) {
            console.error('Error looking for id:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }

        try {
            const addingTweet = await InsertTweetModel(client, tweetDocument);
            res.status(201).json({ success: true });
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