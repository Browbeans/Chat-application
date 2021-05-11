const express = require('express');
const { copyFileSync } = require('fs');
const http = require('http');
const { emit } = require('process');
const socket = require('socket.io');

const { getRoom, createRoom, allRooms, removeFromRoom } = require('./utils/rooms')
const { userJoin, userLeave, getUser, getUserId } = require('./utils/users')

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
        createRoom( socket.id, room)
        userJoin( socket.id, username, room)
        io.emit('get-rooms', allRooms())
        // console.log(allRooms())
        const user = {
            username,  
            room
        } 

        socket.join(room)
        socket.emit('message', user) 
        socket.broadcast.to(room).emit('user-joined', `${username} has joined the chat`)
    })

    socket.on("join-pw-room", (username, room, password) => {
        createRoom( socket.id, room, password )
        userJoin( socket.id, username, room)
        io.emit('get-rooms', allRooms())
        console.log(allRooms())
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

    socket.on('locked', () => {
        const room = allRooms()
        io.emit('locked-room', room);
    })

    // Get Users in room 
    socket.on("current-room", () => {
        socket.emit("fetch-users-in-room", getRoom());
    });

    socket.on('leave-room', () => {
        const user = getUserId(socket.id)
        // console.log(user);
        removeFromRoom(user);
        io.to(user.room).emit("user-leave", user);
        io.emit("get-rooms", allRooms());
    })

    // User Disconnect
    socket.on("disconnect", () => {

        const user = userLeave(socket.id)
        console.log(user);
        if(user) {
            io.to(user.room).emit('user-leave', user)
        }
        io.emit("current-room", allRooms());
    }); 
    
    // Gets all existing rooms
    io.emit('get-rooms', allRooms());
    
   
})

server.listen(PORT, () => {
    console.log('server is running');
})