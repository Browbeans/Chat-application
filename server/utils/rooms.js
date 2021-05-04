const rooms = []

function createRoom(id, roomname) {
    const room = { 
        id,
        roomname
    }
    rooms.push(room)
    return room
}

function allRooms() {
    return rooms
}

module.exports = {
    createRoom, 
    allRooms
}