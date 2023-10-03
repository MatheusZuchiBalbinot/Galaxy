// const MonitoringFriendsChangesController = (client, io) => {
//     const dbCollection = client.db("cluster0").collection("friendship");
//     const changeStream = dbCollection.watch();  
  
//     changeStream.on('change', (change) => {
//         console.log('Change:', change);
      
//         let modifiedDocumentId;

//         if(change.documentKey) {
//             modifiedDocumentId =  change.documentKey._id
//             console.log(modifiedDocumentId)
//             io.emit('friendChanges', modifiedDocumentId);
//         }
//       });
//   };
// module.exports = MonitoringFriendsChangesController;

// Por enquanto não é útil, mas pode ser reaproveitado para o Chat online a ser feito.