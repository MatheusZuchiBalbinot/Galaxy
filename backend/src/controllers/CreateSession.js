const { v4: uuidv4 } = require('uuid');
const activeSessions = require("../activeSessions/activeSessions"); 

function createSession(userId, token, socketId) {

    const sessionId = uuidv4();

    const existingSessionId = Object.keys(activeSessions).find((id) => {
        return activeSessions[id].token === token;
    });

    const existingUserId = Object.keys(activeSessions).find((id) => {
        return id === userId;
      });
    

    if (existingSessionId || existingUserId) {
        return null
    }

    activeSessions[userId] = {
        sessionId,
        token,
        socketId,
    };

    console.log(activeSessions)

    return sessionId; 
}

module.exports = {
  createSession,
};