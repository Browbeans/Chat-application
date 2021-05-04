const express = require('express');
const http = require('http');
const socket = require('socket.io');
const PORT = process.env.PORT || 4000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

io.on('connection', socket => {
    console.log('we have a connection')
})

server.listen(PORT, () => {
    console.log('server is running');
})