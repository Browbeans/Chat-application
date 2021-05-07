const rooms = [
  (room1 = {
    roomname: "stugan",
    locked: true,
    password: "1234",
  }),
  (room2 = {
    roomname: "bärsrummet",
    locked: true,
    password: "1111",
  }),
  (room3 = {
    roomname: "katedralen",
    locked: true,
    password: "4444",
  }),
];

function createRoom(id, roomname, username, locked) {

    const room = { 
        users: [],
        id,
        roomname,
        locked,
        password, 
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