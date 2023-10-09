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

// Emitir um evento passando para o front-end que teve mudança e pedir o token de todos os usuários, comparar ver quais são os
// dois indivíduos que fazem parte da solicitação que sofreu o change e atualizar o componente de amigo dos dois.

// module.exports = MonitoringFriendsChangesController;

// Por enquanto não é útil, mas pode ser reaproveitado para o Chat online a ser feito.