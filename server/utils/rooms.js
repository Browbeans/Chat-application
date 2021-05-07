const rooms = []

function createRoom(id, roomname, username) {
    const room = { 
        users: [],
        id,
        roomname
    }

    room.users.push(username)
    const found = rooms.some(theRoom => theRoom.roomname === roomname)
    if(!found) {
        rooms.push(room)
    } else {
        rooms.forEach(specificRoom => {
            if(specificRoom.roomname === roomname) {
                specificRoom.users.push(username)
            }
        })
    }
    return room
}

function allRooms() {
    return rooms
}

function removeFromRoom(username) {
    rooms.map(user => {
        user.users.splice(user.users.indexOf(username.username, 1))
    })
    
    removeRoom()
}

function removeRoom() {
    rooms.forEach(room => {
        if(room.users.length === 0){
            rooms.splice(rooms.indexOf(room), 1)
        }
    })
}

module.exports = {
    createRoom, 
    allRooms,
    removeFromRoom
}