module.exports = (io) => {
	const connectedUsers = {};
	const roomUsers = {};
	const friendshipMessages = {}
  
	io.on('connection', (socket) => {

		console.log("Houve uma nova conexão de: ", socket.id);

		function actualizeConnectedUsersList() {
			io.emit('listaUsuariosConectados', connectedUsers);
		}

		socket.on('userId', (userId) => {

			connectedUsers[socket.id] = {
				id: userId,
				rooms: [],
			};
			actualizeConnectedUsersList();
		});

		socket.on('disconnect', () => {
			console.log(`Usuário desconectado: ${socket.id}`);
		
			delete connectedUsers[socket.id];
		
			actualizeConnectedUsersList();
		});

		socket.on('acceptRequest', (friendRequestId) => {
			console.log(friendRequestId);
		});

		// LIDANDO COM ROOMS

		socket.on('join-room', (roomName) => {

			// const whoAmI = socket.id;
			// connectedUsers[whoAmI].rooms.push(roomName)

			// if (!roomUsers[roomName]) {
			// 	roomUsers[roomName] = [];
			// }

			// if(!roomUsers[roomName].includes(socket.id)) {
			// 	roomUsers[roomName].push(socket.id)
			// }

			socket.join(roomName);	
			
			io.to(roomName).emit('user-joined', socket.id);

		});

		socket.on('send-message', (data) => {
			const {room, message, date} = data;

			if (!friendshipMessages[room]) {
				friendshipMessages[room] = [];
			}

			const senderMessage = { sender: socket.id, message, date }

			friendshipMessages[room].push(senderMessage);

			const roomsForSocket = io.sockets.adapter.rooms[socket.id];

			if (!roomsForSocket || !roomsForSocket.includes(room)) {
				socket.join(room);
			}

			io.to(room).emit('receive-message', senderMessage)

			console.log(`Mensagem enviada para a sala: ${room}`);
		})

	});
};
