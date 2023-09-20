const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const { MongoClient } = require('mongodb');
const mongodbUri = require('./config');

const routes = require('./routes/ExpressRoutes'); 

const app = express();
const port = 3000;

app.use(express.json({ limit: '5mb' }));
app.use(cors());

const server = http.createServer(app);

const client = new MongoClient(mongodbUri);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

require('./routes/SocketIoRoutes')(io);

(async () => {
  try {
    await client.connect();
    console.log('Successfully connected to the database');
    const mainRoutes = routes(client, io);
    app.use('/', mainRoutes);

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();
