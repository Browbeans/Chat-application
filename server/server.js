const express = require('express');
const { copyFileSync } = require('fs');
const http = require('http');
const { emit } = require('process');
const socket = require('socket.io');
const { createRoom, allRooms, removeFromRoom } = require('./utils/rooms')
const { userJoin, userLeave, getUser } = require('./utils/users')
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
        createRoom( socket.id, room, username)
        userJoin( socket.id, username, room)
        io.emit('get-rooms', allRooms())

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
    });

    // User Disconnect
    socket.on("disconnect", () => {
        const user = userLeave(socket.id)
        if(user) {
            console.log(removeFromRoom(user))
            io.to(user.room).emit('user-leave', user)
        }
    });
    
    // Gets all existing rooms
    io.emit('get-rooms', allRooms())
   
})

server.listen(PORT, () => {
    console.log('server is running');
})