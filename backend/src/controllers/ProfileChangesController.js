const EditingProfile = require("../model/EditingProfileModel");
const getUserIdByTokenModel = require("../model/getUserIdByTokenModel");

const ProfileChangesController = async (client, req, res, somethingASDASD) => {
    try {
        const getUserId = await getUserIdByTokenModel(userId)
        
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