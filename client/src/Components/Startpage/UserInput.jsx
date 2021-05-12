import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SocketContext } from "../../Contexts/SocketContext";
import '../../style/UserInput.css'
import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone';
import HttpsTwoToneIcon from "@material-ui/icons/HttpsTwoTone";
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';

function UserInput() {
  const history = useHistory()
  const socketContext = useContext(SocketContext);

  const [username, setUsername] = useState("");
  const [roomname, setRoomName] = useState("");
  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState('');
  const [roomPassword, passwordInput] = useState('')
  const [wrongPw, sendMessage] = useState('')

  const handlePasswordInput = (username, roomname) => {
    const rooms = socketContext.allRooms
    rooms.find(room => {
        if(room.password === roomPassword) {
           socketContext.joinRoom(username, roomname)
           history.push(`/chatRoom?name=${socketContext.userName}&room=${room.roomname}`)
        }else {
            sendMessage('Wrong password...')
        }
    })
  }

  // const lockedRoom = socketContext.joinLockedRoom();
  // const lockedRooms = socketContext.lockedRooms;

  // const specificLockedRoomName = (e) => {
  //   lockedRooms.forEach((lr) => {
  //   if (e.target.value === lr.roomname) {
  //     setLocked(true);
  //   }
  // })};

  // const specificLockedRoomPassword = (e) => {
  //   lockedRooms.forEach((lr) => {
  //     if (e.target.value === lr.password) {
  //       setLocked(false);
  //     }
  //   })};
  
  const handleChange = (e) => {
    // specificLockedRoomName(e);
    setRoomName(e.target.value);
    const rooms = socketContext.allRooms
    rooms.forEach((room) => {
      if(e.target.value === room.roomname) {
        setLocked(!locked)
      }
    })
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    // e.preventDefault();
    socketContext.joinRoom(socketContext.userName, roomname);
  };

  const handlePWSubmit = () => {
    socketContext.joinLockedRoom(socketContext.userName, roomname, password);
  };

  return (
    <div className="user-container">
      <h1 className="welcomeText">
        Welcome to <span>ChatLine</span>
      </h1>
      <div className="input-container">
        <div className="inputs">

        <h4 className="user">{socketContext.userName}</h4>
        <h3 className="JoinRoomText">Join or create a locked Room</h3>

        <input
          type="text"
          placeholder="Enter roomname"
          id="roomname"
          onChange={(e) => handleChange(e)}
        />
        {/* {locked ? (
          <input
            type="password"
            placeholder="Enter password"
            id="roomname"
            onChange={e => handlePassword(e)}
          />
        ) : null}
          {locked ? (
            <button style={notActive}>Enter password</button>
          ) : ( */}

          <Link
          style={{ textDecoration: "none", color: "white"}}
          onClick={handleSubmit}
          to={`/chatRoom?name=${username}&room=${roomname}`}
             >
            <button>Create and join... <LockOpenTwoToneIcon/></button>
            </Link>
          {/* )} */}
          <div>
          <h3 className="JoinRoomText">Join or create a locked Room</h3>
          <input
              type="text"
              placeholder="Enter roomname"
              id="roomname"
              onChange={e => handleChange(e)}
              />
          {locked 
          ? 
          <div>
              <div style={{display: 'flex', alignItems: 'center'}}>
                  <input type="text" placeholder="Enter password" 
                  onChange={(e) => {
                      passwordInput(e.target.value)
                  }}/>
                  <VpnKeyTwoToneIcon onClick={() => handlePasswordInput(socketContext.userName, roomname)} 
                    style={{ color: "#22EAAA" }}
                  />
              </div>
                  <div>
                    <p style={{color: '#ff0033', fontSize: '1.3rem', margin: '1rem'}}>{wrongPw}</p>
                  </div>
              </div>
          :
            <div style={{display: "flex", flexDirection: "column"}}>
              <input
              type="text"
              placeholder="Enter password"
              id="roomname"
              onChange={e => handlePassword(e)}
              />
              <Link
              style={{ textDecoration: "none", color: "white"}}
              onClick={handlePWSubmit}
                to={`/chatRoom?name=${username}&room=${roomname}`}
              >
                <button>
                  Create and join... <HttpsTwoToneIcon/>
                </button>
              </Link>
            </div>
          }
           </div>
        </div>

      </div>
    </div>
  );
}

export default UserInput;


const active = {
  background: 'green',
}
const notActive = {
  background: "red",
};
