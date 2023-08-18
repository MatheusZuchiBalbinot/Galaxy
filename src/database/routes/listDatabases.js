async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases: ")
    console.log(databasesList)
    // databasesList.forEach(db => { console.log(`- ${db.name}`)});
}

module.exports = listDatabases