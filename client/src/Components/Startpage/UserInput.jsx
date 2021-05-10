import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SocketContext } from "../../Contexts/SocketContext";
import '../../style/UserInput.css'

function UserInput() {

  const socketContext = useContext(SocketContext);

  const [username, setUsername] = useState("");
  const [roomname, setRoomName] = useState("");
  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState('');


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
  }

  // const handlePassword = (e) => {
  //   specificLockedRoomPassword(e);
  //   setPassword(e.target.value);
  // }

  const handleSubmit = (e) => {
    // e.preventDefault();
    socketContext.joinRoom(username, roomname);
  };

  return (
    <div className ="user-container">
      <h1>Welcome to ChatLine</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Your Name"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter roomname"
          id="roomname"
          onChange={e => handleChange(e)}
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
          onClick={handleSubmit}
          to={`/chatRoom?name=${username}&room=${roomname}`}
             >
            <button>JOIN</button>
            </Link>
          {/* )} */}
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
