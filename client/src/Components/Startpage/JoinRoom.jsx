import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SocketContext } from "../../Contexts/SocketContext";
import "../../style/RoomList.css";
import HttpsTwoToneIcon from "@material-ui/icons/HttpsTwoTone";
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone';

function JoinRoom() {
  const socketContext = useContext(SocketContext);
  const [pwInput, togglePwInput] = useState(false)
  const [password, passwordInput] = useState('')
  const [wrongPw, sendMessage] = useState('')
  const history = useHistory()  

  const handlePasswordInput = (username, roomname) => {
    const rooms = socketContext.allRooms
    rooms.find(room => {
        if(room.password === password) {
           socketContext.joinRoom(username, roomname)
           history.push(`/chatRoom?name=${socketContext.userName}&room=${room.roomname}`)
        }else {
            sendMessage('Wrong password...')
        }
    })
  }

  return (
    <div className="current-rooms">
      <div className="open-rooms">
        <h2>Rooms</h2>
        <ul>
          {socketContext.allRooms.map((room) => (
            <div key={room.id}>
                {room.password ? (
                    <div>

                  <h3
                    style={{color: 'white'}}
                    onClick={() =>
                        togglePwInput(!pwInput)
                    }
                    key={room.roomname}
                    >
                    {room.roomname}
                    <HttpsTwoToneIcon style={{ color: "#22EAAA" }}/>
                  </h3>
                  {pwInput 
              ? 
              <div>
              <div style={{display: 'flex'}}>
                  <input type="text" placeholder="Enter password" onChange={(e) => {
                      passwordInput(e.target.value)
                  }}/>
                  <VpnKeyTwoToneIcon onClick={() => handlePasswordInput(socketContext.userName, room.roomname)} style={{ color: "#22EAAA" }}/>
              </div>
                  <div>
                    <p style={{color: '#ff0033', fontSize: '1.3rem'}}>{wrongPw}</p>
                  </div>
              </div>
              :
              <></>
              }
                </div>
                ) : (
                <Link
                style={{ textDecoration: "none", color: "white"}}
                to={`/chatRoom?name=${socketContext.userName}&room=${room.roomname}`}
                >
                  <h3
                    onClick={() =>
                      socketContext.joinRoom(
                        socketContext.userName,
                        room.roomname
                      )
                    }
                    key={room.roomname}
                  >
                    {room.roomname}
                  </h3>
              </Link>
                )}
              <ul>
                {room.users.map((user) => (
                  <li>{user}</li>
                ))}
              </ul>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default JoinRoom;
