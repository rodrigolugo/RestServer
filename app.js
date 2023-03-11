require('dotenv').config();
const Server = require('./models/server.js');


const sever = new Server();

sever.listen();
