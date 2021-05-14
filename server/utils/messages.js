const moment = require('moment')

function formatMessage(message) {
    return {
        username: message.name,
        text: message.text,
        time: moment().format('h:mm a'), 
        room: message.room
    }
}

function formatGiphy(giphy) {
    return {
        username: giphy.name,
        giphy: giphy.giphy,
        time: moment().format('h:mm a'), 
        room: giphy.room
    }
}

module.exports = { formatMessage, formatGiphy }