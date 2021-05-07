const express = require('express');
const { copyFileSync } = require('fs');
const http = require('http');
const { emit } = require('process');
const socket = require('socket.io');
const { createRoom } = require('./utils/rooms')
const { userJoin, userLeave } = require('./utils/users')
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
        userJoin( socket.id, username, room)

        const user = {
            username, 
            room
        }
        socket.join(room)
        socket.emit('message', user) 
        socket.broadcast.to(room).emit('user-joined', `${username} has joined the chat`)
    })

    // User wrote message
    socket.on("chat-message", (message) => {
        io.to(message.room).emit('user-message', formatMessage(message)) 
        console.log(message)
    });

    // User Disconnect
    socket.on("disconnect", () => {
        const user = userLeave(socket.id)
        if(user) {
            io.to(user.room).emit('user-leave', user)
        }
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