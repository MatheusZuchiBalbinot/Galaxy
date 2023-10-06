module.exports = (io) => {
	const connectedUsers = {};
	const roomUsers = {}
  
	io.on('connection', (socket) => {

		console.log("Hou uma nova conecção de: ", socket.id)

		// Por algum motivo quando eu abro o website no mínimo 8 conexões com o Socket são criadas na mesma sessão.
		// Porém só uma é utilizada

		socket.on('userId', (userId) => {

			connectedUsers[socket.id] = {
				id: userId,
				rooms: [],
			};
			atualizarListaUsuariosConectados();
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
		
			atualizarListaUsuariosConectados();
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
  
	  function atualizarListaUsuariosConectados() {
		io.emit('listaUsuariosConectados', connectedUsers);
	  }
	});
  };
  