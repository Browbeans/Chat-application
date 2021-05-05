const express = require('express');
const { copyFileSync } = require('fs');
const http = require('http');
const { emit } = require('process');
const socket = require('socket.io');
const { createRoom, allRooms } = require('./utils/rooms')
const formatMessage = require('./utils/messages')
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socket(server);


io.on('connection', (socket) => {
    // User connected
    console.log("User", "connected", socket.id);


    // User joined specific room
    socket.on("join-room", (username, room) => {
        console.log("User joined room" + username, room);
    })

    // User wrote message
    socket.on("chat-message", (message) => {
        console.log("User: " + message);
        io.emit('message', formatMessage('Oliver', message))
    });

    // User Disconnect
    socket.on("disconnect", (data) => {
        console.log("User disconnected");
    });

    // Create Room 
    socket.on('create-room', (roomname) => {
      const room = createRoom( socket.id, roomname)
      socket.emit('create-room', room)
    })
})

server.listen(PORT, () => {
    console.log('server is running');
})