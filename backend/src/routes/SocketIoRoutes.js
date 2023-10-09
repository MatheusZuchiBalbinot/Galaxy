module.exports = (io) => {
	const connectedUsers = {};
	const roomUsers = {};
	const friendshipMessages = {}
  
	io.on('connection', (socket) => {

		console.log("Hou uma nova conecção de: ", socket.id);

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

			// const whoAmI = socket.id;
			// if (connectedUsers[whoAmI]) {
			//   connectedUsers[whoAmI].rooms.forEach((roomName) => {
			// 	io.to(roomName).emit('user-left', socket.id);
			//   });
			//   delete connectedUsers[whoAmI];
			// }
		
			actualizeConnectedUsersList();
		});

		socket.on('acceptRequest', (friendRequestId) => {
			console.log(friendRequestId);
		});

		// LIDANDO COM ROOMS

		socket.on('join-room', (roomName) => {

			const whoAmI = socket.id;
			connectedUsers[whoAmI].rooms.push(roomName)

			if (!roomUsers[roomName]) {
				roomUsers[roomName] = [];
			}

			if(!roomUsers[roomName].includes(socket.id)) {
				roomUsers[roomName].push(socket.id)
			}

			// Já estão ambos conectados na mesma sala perfeitamente bem.
			// connectedUsers guarda o id do socket do usuário, o token do usuário e em que salas ele está conectado;
			// roomUsers tem como chave o id da sala que se refere ao id da Amizade no banco, dentro tem uma lista dos usuários conectados.

			socket.join(roomName);
		  
			console.log(`Usuário com ID ${socket.id} entrou na sala ${roomName}`);
			
			io.to(roomName).emit('user-joined', socket.id);
		});

		socket.on('send-message', (data) => {
			const {room, message, date} = data;

			if (!friendshipMessages[room]) {
				friendshipMessages[room] = [];
			}

			const userMessage = { sender: socket.id, message, date }

			friendshipMessages[room].push(userMessage);

			// console.log(userMessage)

			// O input está funcionando com texto, porém, também quero que o usuário possa adicionar imagens e vídeos
			// portanto irei utilizar o input de Tweet no lugar desse input, e tecer algumas modificações para poder
			// utilizar. Também devo pensar em uma maneira mais eficiente de guardar as imagens no banco de dados,
			// devo pensar em utilizar o pako ou o sharp.

			console.log(friendshipMessages)
		
			io.to(room).emit('receive-message', userMessage)
		})
  
	function actualizeConnectedUsersList() {
			io.emit('listaUsuariosConectados', connectedUsers);
	}
	});
};
