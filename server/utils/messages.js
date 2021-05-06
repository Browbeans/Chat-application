const moment = require('moment')

function formatMessage(message) {
    return {
        username: message.name,
        text: message.text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage