const rooms = [
    room1 = {
        roomname: 'stugan',
        locked: true,
        password: '1234'
    }
]

function createRoom(id, roomname, locked) {
    const room = { 
        id,
        roomname,
        locked,
        password, 
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