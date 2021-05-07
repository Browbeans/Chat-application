import React, { useContext } from 'react'
import { SocketContext } from '../../Contexts/SocketContext'

function JoinRoom() {
    const socketContext = useContext(SocketContext)

    return (
        <div>
            <h1>Current Rooms</h1>
            <ul>
                {socketContext.allRooms.map(room => (
                    <div key={room.id}>
                        <h2 key={room.roomname}>{room.roomname}</h2>
                    </div>
                ))}
            </ul>
        </div>
    )
}

export default JoinRoom
