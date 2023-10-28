const MonitoringTweetsChangesController = (client, io) => {
    const dbCollection = client.db("cluster0").collection("tweets");
    const changeStream = dbCollection.watch();  
  
    changeStream.on('change', (change) => {
      console.log('Change:', change);
  
      io.emit('monitoring-newTweets', change);
    });
  };
  
module.exports = MonitoringTweetsChangesController;