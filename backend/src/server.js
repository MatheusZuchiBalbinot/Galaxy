const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongodbUri = require('./config');

const routes = require('./routes/routes'); 

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const client = new MongoClient(mongodbUri);

(async () => {
  try {
    await client.connect();
    console.log('Successfully connected to the database');
    const mainRoutes = routes(client);
    app.use('/', mainRoutes);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();