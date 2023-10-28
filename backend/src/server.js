const express = require('express');
const session = require('express-session');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const { MongoClient } = require('mongodb');
const mongodbUri = require('./config');

const MonitoringTweetsChangesController = require('./controllers/MonitoringTweetsChangesController')

const routes = require('./routes/ExpressRoutes'); 

const app = express();
const port = 3000;

app.use(express.json({ limit: '5mb' }));
app.use(cors());

app.use(
  session({
    secret: 'mySecretKey', // Chave secreta para assinar o cookie
    resave: false, // Não salva a sessão a cada solicitação
    saveUninitialized: true, // Salva sessões não inicializadas
    cookie: {
      sameSite: 'strict', // Restringe o compartilhamento de cookies entre sites
    },
  })
);

const server = http.createServer(app);

const client = new MongoClient(mongodbUri);

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

require('./routes/SocketIoRoutes')(client, io);

(async () => {
  try {
    await client.connect();
    console.log('Successfully connected to the database');
    const mainRoutes = routes(client, io);
    app.use('/', mainRoutes);

    MonitoringTweetsChangesController(client, io);

    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();
