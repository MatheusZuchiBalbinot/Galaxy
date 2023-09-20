const MonitoringChangesController = (client, io) => {
    const dbCollection = client.db("cluster0").collection("users");
    const changeStream = dbCollection.watch();  

    console.log("MONITOROU ALGO?")
  
    changeStream.on('change', (change) => {
      console.log('Change:', change);
  
      io.emit('change', change);
    });
  
    return 'Change Stream monitoring started';
  };
  
module.exports = MonitoringChangesController;