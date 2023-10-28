const { ObjectId } = require("mongodb");

const GetUserIdByTokenModel = require("../model/GetUserIdByTokenModel");

const activeSessions = require("../activeSessions/activeSessions");

module.exports = (client, io) => {
	const connectedUsers = {};
	const roomUsers = {};
	let friendshipMessages = {}

	const tweetCollection = client.db("cluster0").collection("friendship")
  
	io.on('connection', (socket) => {

		console.log("Houve uma nova conexão de: ", socket.id);

		function actualizeConnectedUsersList() {
			io.emit('listaUsuariosConectados', connectedUsers);
		}
	
		socket.on('userId', (userId) => {

			connectedUsers[socket.id] = {
				id: userId,
			};
			actualizeConnectedUsersList();

		});

		socket.on('disconnect', async () => {
			console.log(`Usuário desconectado: ${socket.id}`);

			let actualUserRooms = [];

			if(connectedUsers[socket.id]) {
				const userToken = connectedUsers[socket.id].id
				const userId = await GetUserIdByTokenModel(`Bearer ${userToken}`)

				delete activeSessions[userId]
			}

			console.log(activeSessions)
			
			Object.keys(roomUsers).map((room) => {
				if(roomUsers[room].includes(socket.id)) {
					actualUserRooms.push(room)
				}
			})

			let usersInChat = {};

			if(actualUserRooms.length == 0) {

				const minSizeOfToken = 36

				await Promise.all(actualUserRooms.map(async (item) => {
				
					const friendshipChatMessage = friendshipMessages[`friendship_${item}`]

					await Promise.all(friendshipChatMessage.map( async (message) => {
						if (!usersInChat[message.sender]) {

							let getUserId

							message.sender.length > minSizeOfToken ? getUserId = await GetUserIdByTokenModel(`Bearer ${message.sender}`) : getUserId = message.sender;

							usersInChat[message.sender] = {
								id: getUserId,
							}; 
						}
						return message.sender = usersInChat[message.sender].id
					}))

					const addChatMessagesToFriendship = await tweetCollection.updateOne(
						{ _id: new ObjectId(item) },
						{ $addToSet: { messages: { $each: friendshipChatMessage } } }
					);

					console.log(addChatMessagesToFriendship)
				}))
			}

			delete connectedUsers[socket.id];
		
			actualizeConnectedUsersList();

			// Object.keys(roomUsers).map((room) => {
			// 	if(roomUsers[room].includes(socket.id)) {
			// 		const roomName = `friendship_${room}`
			// 		// console.log("INCLUI MERMÃO. -> ", roomUsers[room], socket.id)
			// 		// console.log(friendshipMessages[roomName])
			// 	}
			// })	
		});

		// LIDANDO COM ROOMS

		socket.on('join-room', async (roomName) => {

			socket.join(roomName);	

			if (!roomUsers[roomName]) {
				roomUsers[roomName] = [];
			}

			if(!roomUsers[roomName].includes(socket.id)) {
				roomUsers[roomName].push(socket.id)
			}
			
			io.to(roomName).emit('user-joined', socket.id);

			const room = `friendship_${roomName}`

			// const getOldMessages = await tweetCollection.findOne(
			// 	{ _id: new ObjectId(roomName) },
			// 	{ projection: {messages: 1, _id: 0}}
			// );

			// getOldMessages[room] = getOldMessages.messages;

			// delete getOldMessages.messages;

			// console.log(getOldMessages)

			if(friendshipMessages[room]) {

				// console.log(friendshipMessages[room].length)

				// friendshipMessages = Object.assign({}, friendshipMessages, getOldMessages);

				console.log(connectedUsers)

				io.to(socket.id).emit('alreadyHave-messages', friendshipMessages)
			}

		}); 

		socket.on('send-message', (data) => {
			const {room, message, date, sender} = data;

			if (!friendshipMessages[room]) {
				friendshipMessages[room] = [];
			}

			const senderMessage = { sender, message, date }

			// console.log(senderMessage)

			friendshipMessages[room].push(senderMessage);

			socket.join(room);

			io.to(room).emit('receive-message', senderMessage)

			console.log(`Mensagem enviada para a sala: ${room}`);
		})

	});
};
