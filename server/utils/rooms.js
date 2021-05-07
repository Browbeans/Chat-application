const rooms = []

function createRoom(id, roomname, locked) {
    const room = { 
        id,
        roomname,
        locked,
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