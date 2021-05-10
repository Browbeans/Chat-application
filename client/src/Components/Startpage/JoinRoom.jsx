import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
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
                        <Link to={`/chatRoom?name=${socketContext.userName}&room=${room.roomname}`}>
                            <h3 onClick={() => socketContext.joinRoom(socketContext.userName, room.roomname)} key={room.roomname}>{room.roomname}</h3>
                        </Link>
                        <ul>
                            {room.users.map(user => (
                                <li>{user}</li>
                            ))}
                        </ul>
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
