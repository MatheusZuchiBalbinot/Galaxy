module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('Cliente conectado ao WebSocket');
  
      io.emit('solicitacaoDoCliente', 'Um novo cliente se conectou');
  
      socket.on('evento', (data) => {
        console.log('Evento recebido do cliente:', data);

        socket.emit('resposta', 'Resposta ao evento recebido do cliente');
      });
  
      socket.on('disconnect', () => {
        console.log('Cliente desconectado do WebSocket');
      });
    });
  };