module.exports = (io) => {
	const usuariosConectados = {};
  
	io.on('connection', (socket) => {
	  socket.on('userId', (userId) => {
		usuariosConectados[socket.id] = {
		  id: userId
		};
		atualizarListaUsuariosConectados();
	  });
  
	  socket.on('disconnect', () => {
		delete usuariosConectados[socket.id];
		atualizarListaUsuariosConectados();
	  });

	  socket.on('acceptRequest', (friendRequestId) => {
		console.log(friendRequestId);
	  });
  
	//   io.emit('solicitacaoDoCliente', 'Um novo cliente se conectou');
  
	  function atualizarListaUsuariosConectados() {
		io.emit('listaUsuariosConectados', usuariosConectados);
	  }
	});
  };
  