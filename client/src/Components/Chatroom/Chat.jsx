import { useState } from "react"
import io from 'socket.io-client'


var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
};
  
  const socket = io('http://localhost:5000', connectionOptions);

function Chat() {
    const [message1, setMessage] = useState('')
    const [messageOutput, setMessageOutput] = useState({})

    const createMessage = () => {
        socket.emit('chat-message', message1)
    }

    socket.on('message', (message) => {
        setMessageOutput(message)
    })

    return(
        <div id="chatDiv">
             <input type="text" placeholder="Enter roomname" id="roomname" onChange={(e) => {
                setMessage(e.target.value)
            }}/>
            <button onClick={createMessage}>Send message</button> 
        </div>
    )
}

export default Chat