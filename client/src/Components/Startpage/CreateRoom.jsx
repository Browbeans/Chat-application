import React, { useState } from 'react'
import io from 'socket.io-client'

var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};

const socket = io('http://localhost:5000', connectionOptions);

function CreateRoom() {
    const [roomname, setRoomName] = useState('')
    const createRoom = () => {
        socket.emit('create-room', roomname)
    }

    return (
        <div>
            <input type="text" placeholder="Enter roomname" id="roomname" onChange={(e) => {
                setRoomName(e.target.value)
            }}/>
            <button onClick={createRoom}>Create room</button> 
        </div>
    )
}

export default CreateRoom