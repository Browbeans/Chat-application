import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SocketContext } from "../../Contexts/SocketContext";

function UserInput() {

  const socketContext = useContext(SocketContext);

  const [username, setUsername] = useState("");
  const [roomname, setRoomName] = useState("");
  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState('');


  const handleChange = (e) => {
    setRoomName(e.target.value);
    if(e.target.value === 'stugan'){
      setLocked(true);
    }
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);

    if(e.target.value === '123'){
      setLocked(false);
    }
  }
  const handleSubmit = (e) => {
    // e.preventDefault();
    socketContext.joinRoom(username, roomname);
  };

  return (
    <div>
      <form>
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
        {locked ? (
          <input
            type="password"
            placeholder="Enter password"
            id="roomname"
            onChange={e => handlePassword(e)}
          />
        ) : null}
          {locked ? (
            <button style={notActive}>Enter password</button>
          ) : (
             <Link
          onClick={handleSubmit}
          to={`/chatRoom?name=${username}&room=${roomname}`}
             >
            <button style={active}>JOIN</button>
            </Link>
          )}
      </form>
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
