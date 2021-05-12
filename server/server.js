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
    socket.on("join-room", (username, room, text) => {
        createRoom( socket.id, room)
        userJoin( socket.id, username, room)
        io.emit('get-rooms', allRooms())
        const user = {
            username,  
            room
        } 
        const message = {
            name: username, 
            text: `${username} has joined the chat`, 
            room: room
        }

        socket.join(room)
        socket.emit('message', user) 
        socket.broadcast.to(room).emit('user-joined', formatMessage(message))
    })

    socket.on("join-pw-room", (username, room, password) => {
        createRoom( socket.id, room, password )
        userJoin( socket.id, username, room)
        io.emit('get-rooms', allRooms())
        const user = {
            username, 
            room
        }
        const message = {
            name: username, 
            text: `${username} has joined the chat`, 
            room: room
        }

        socket.join(room)
        socket.emit('message', user) 
        socket.broadcast.to(room).emit('user-joined', formatMessage(message))
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
        const message = {
            name: user.username, 
            text: `${user.username} has left the chat`, 
            room: user.room
        }
        removeFromRoom(user);
        io.to(user.room).emit("user-leave", formatMessage(message));
        io.emit("get-rooms", allRooms());
    })

    // Is User Typing
    socket.on("typing", (userObj) => {
        if (userObj.name) {
            socket.broadcast.to(userObj.room).emit('display-typing', "")
        } else {
            socket.broadcast.to(userObj.room).emit('display-typing', `${userObj.username} is typing...`)
        }

    }); 
 
    // User Disconnect
    socket.on("disconnect", () => {
        const user = userLeave(socket.id)
        if(user) {
            removeFromRoom(user)
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
