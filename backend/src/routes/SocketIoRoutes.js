const { ObjectId } = require("mongodb");
const GetUserIdByTokenModel = require("../model/GetUserIdByTokenModel")

module.exports = (client, io) => {
	const connectedUsers = {};
	const roomUsers = {};
	const friendshipMessages = {}

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
			
			Object.keys(roomUsers).map((room) => {
				if(roomUsers[room].includes(socket.id)) {
					actualUserRooms.push(room)
				}
			})

			let usersInChat = {};

			if(actualUserRooms.length > 0) {
				await Promise.all(actualUserRooms.map(async (item) => {
					// console.log(friendshipMessages[`friendship_${item}`])
				
					const friendshipChatMessage = friendshipMessages[`friendship_${item}`]

					await Promise.all(friendshipChatMessage.map( async (message) => {
						if (!usersInChat[message.sender]) {
							const getUserId = await GetUserIdByTokenModel(`Bearer ${message.sender}`);
							usersInChat[message.sender] = {
								id: getUserId,
							}; 
						}
						return message.sender = usersInChat[message.sender].id
					}))

					console.log(friendshipChatMessage)

					// console.log(usersInChat)

					// const addChatMessagesToFriendship = tweetCollection.updateOne(
					// 	{ _id: new ObjectId(item)}, 
					// 	{}
					// )
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

		socket.on('join-room', (roomName) => {

			socket.join(roomName);	

			if (!roomUsers[roomName]) {
				roomUsers[roomName] = [];
			}

			if(!roomUsers[roomName].includes(socket.id)) {
				roomUsers[roomName].push(socket.id)
			}
			
			io.to(roomName).emit('user-joined', socket.id);

			const room = `friendship_${roomName}`

			if(friendshipMessages[room]) {

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
