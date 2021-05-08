import React, { useContext } from 'react'
import { SocketContext } from '../../Contexts/SocketContext'
import '../../style/RoomList.css'

function JoinRoom() {
    const socketContext = useContext(SocketContext)

    return (
        <div className="current-rooms">
            <div className="open-rooms">
            <h2>Open Rooms</h2>
            <ul>
                {socketContext.allRooms.map(room => (
                    <div key={room.id}>
                        <h3 key={room.roomname}>{room.roomname}</h3>
                    </div>
                ))}
            </ul>
            </div>
            <div className="locked-rooms">
                <h2>Locked Rooms</h2>
                <ul>
                </ul>
            </div>
        </div>
    )
}

export default JoinRoom
