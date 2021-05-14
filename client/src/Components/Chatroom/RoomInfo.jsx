import { useContext, useState, useEffect } from "react"
import { SocketContext } from "../../Contexts/SocketContext"
import SmsIcon from '@material-ui/icons/Sms';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import "../../style/JoinRoom.css"
import { Link } from "react-router-dom";

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

    const leaveRoom = () => {
      socketContext.leaveRoom();
    };

    return (
      <div className="current-rooms">
        <div className="room-container">
          <div className="room-info-container">
            <div style={{ display: "flex", alignItems: "center" }}>
              <SmsIcon />
              <h2 className="title">Room:</h2>
            </div>
            <h3 className="sub-title">{roomUrl}</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <PeopleAltIcon />
              <h2 className="title">Users:</h2>
            </div>
            <div>
              {users.map((user) => (
                <h3 className="sub-title">{user}</h3>
              ))}
            </div>
          </div>
        </div>
        <Link to="/join-room">
          <button className="leaveBtn" onClick={leaveRoom}>
            Leave
          </button>
        </Link>
      </div>
    );
}

export default RoomInfo