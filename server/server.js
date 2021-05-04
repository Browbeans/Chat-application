const express = require('express');
const http = require('http');
const { emit } = require('process');
const socket = require('socket.io');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socket(server);


io.on('connection', (socket) => {
    // User connected
    socket.on("connect", () => {
        console.log("User" + data + "connected");
    });

    // User joined specific room
    socket.on("join-room", (username, room) => {
        console.log("User joined room" + username, room);
    })
    // User wrote message
    socket.on("chat-message", (message) => {
        console.log("User: " + message);
    });
    // User Disconnect
    socket.on("disconnect", (data) => {
        console.log("User disconnected");
    });
})

server.listen(PORT, () => {
    console.log('server is running');
})