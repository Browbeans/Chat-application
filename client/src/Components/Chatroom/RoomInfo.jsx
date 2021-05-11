import { useContext, useState, useEffect } from "react"
import { SocketContext } from "../../Contexts/SocketContext"

function RoomInfo() {
    const [users, setUsers] = useState([]);
    const socketContext = useContext(SocketContext);
    const rooms = socketContext.allRooms;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const roomUrl = urlParams.get('room');


    useEffect(() => {
        rooms.find(room => {
            if (room.roomname === roomUrl) {
                setUsers(room.users)
            }
        })
    })

    return(
        <div>
            <h1>RoomInfo</h1>
            <div>
                {users.map(user => (
                    <p>{user}</p>
                ))}
            </div>
        </div>
    )
}

export default RoomInfo