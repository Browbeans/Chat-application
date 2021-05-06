import React, { useState } from 'react'
import io from 'socket.io-client'


function CreateRoom() {
    const [roomname, setRoomName] = useState('')
   

    return (
        <div>
            <input type="text" placeholder="Enter roomname" id="roomname" onChange={(e) => {
                setRoomName(e.target.value)
            }}/>
            <button>Create room</button> 
        </div>
    )
}

export default CreateRoom