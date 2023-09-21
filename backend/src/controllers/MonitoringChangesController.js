const MonitoringChangesController = (client, io) => {
    const dbCollection = client.db("cluster0").collection("tweets");
    const changeStream = dbCollection.watch();  
  
    changeStream.on('change', (change) => {
      console.log('Change:', change);
  
      io.emit('change123', change);
    });
  };
  
// Estou em dúvida se faz algum sentido atualizar todas as páginas quando alguém insere um tweet;
// Mas está funcionando, posteriormente se consumir processamento demais desnecessariamente, irei remover.
module.exports = MonitoringChangesController;