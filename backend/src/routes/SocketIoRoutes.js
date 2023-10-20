module.exports = (io) => {
	const connectedUsers = {};
	const roomUsers = {};
	const friendshipMessages = {}
  
	io.on('connection', (socket) => {

		console.log("Houve uma nova conexão de: ", socket.id);

		function actualizeConnectedUsersList() {
			io.emit('listaUsuariosConectados', connectedUsers);

			// console.log(connectedUsers)
		}
		
		// const clearDisconnectedUserInfo = (id) => {
		// 	Object.keys(roomUsers).map((room) => {
		// 		if(roomUsers[room].includes(id)) {
		// 			roomUsers[room].splice(id, 1);
		// 		}
		// 	})

		// 	// Object.keys(connectedUsers).map((users) => {
		// 	// 	if(users == id) {
		// 	// 		connectedUsers.splice(users, 1)
		// 	// 	}
		// 	// })
		// }

		socket.on('userId', (userId) => {

			connectedUsers[socket.id] = {
				id: userId,
			};
			actualizeConnectedUsersList();

			// clearDisconnectedUserInfo(socket.id)
		});

		socket.on('disconnect', () => {
			console.log(`Usuário desconectado: ${socket.id}`);

			let actualUserRooms = [];
			
			Object.keys(roomUsers).map((room) => {
				console.log(roomUsers[room])
				if(roomUsers[room].includes(socket.id)) {
					actualUserRooms.push(room)
				}
			})

			delete connectedUsers[socket.id];
		
			actualizeConnectedUsersList();

			Object.keys(roomUsers).map((room) => {
				if(roomUsers[room].includes(socket.id)) {
					const roomName = `friendship_${room}`
					console.log("INCLUI MERMÃO. -> ", roomUsers[room], socket.id)
					console.log(friendshipMessages[roomName])
				}
			})	
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
