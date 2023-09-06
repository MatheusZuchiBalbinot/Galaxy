const GetUserIdModel = require("../model/GetUserIdModel")
const EditingProfile = require("../model/EditingProfileModel")

const ProfileChangesController = async (client, req, res, nickname) => {
    try {
        const getUserId = await GetUserIdModel(client, nickname)
        
        if (!getUserId) {
          return res.status(400).json({ success: false, error: 'Invalid user ID' });
        }
        const data = req.body
        const result = await EditingProfile(client, getUserId, data)
      } catch(error) {
        console.error('Error getting Tweet:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      }
  }

module.exports = ProfileChangesController