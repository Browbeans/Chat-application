const users = []

function userJoin(id, username, room) {
    const user = {id, username, room}

    users.push(user)
    return user
}

function userLeave(id) {
    const index = users.findIndex(user => user.id === id)
    if(index !== -1) {
        return users.splice(index, 1)[0]
    }
}

function getUser(id) {
    const index = users.findIndex(user => user.id === id)
    if(index !== -1) {
        return users[index].username
    }
}

function getAllUsers() {
    return users
}


module.exports = {
    userJoin, 
    userLeave,
    getUser,
    getAllUsers
}