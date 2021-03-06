const { getAllUsers } = require('./users')

let rooms = [];

function createRoom(id, roomname, password) {
    let room = {}

    if(!password){
        room = { 
            users: [],
            roomname    
        }
    } else {
        room = { 
            users: [],
            roomname,
            password: password
        }    
    }

    room.users.push(id)
    const found = rooms.some(theRoom => theRoom.roomname === roomname)
    if(!found) {
        rooms.push(room)
    } else {
        rooms.forEach(specificRoom => {
            if(specificRoom.roomname === roomname) {
                specificRoom.users.push(id)
            }
        })
    }
    return room
}

function allRooms() {
    const users = getAllUsers()
    return rooms.map(room =>( {
        ...room,
        users: room.users.map(userId => (
            users.find(user => userId === user.id).username
        )) 
    }))
}

function removeFromRoom(user) {
    rooms.map(room => {
        const index = room.users.indexOf(user.id)
        if(index >= 0) {
            room.users.splice(index, 1)
        }
    })
    removeRoom()
}

function removeRoom() {
    rooms.forEach(room => {
        if(room.users.length < 1) {
            rooms.splice(rooms.indexOf(room), 1)
        }
    })
}

function getRoom(roomname) {
    const users = getAllUsers()
    return users.filter((user) => user.room === roomname)
}

module.exports = {
    createRoom, 
    allRooms,
    removeFromRoom,
    getRoom
}