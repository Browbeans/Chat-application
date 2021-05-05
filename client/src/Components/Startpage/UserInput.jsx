import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SocketContext } from "../../Contexts/SocketContext";

function UserInput() {

  const socketContext = useContext(SocketContext);

  const [username, setUsername] = useState("");
  const [roomname, setRoomName] = useState("");

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
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
        />
        <Link
          onClick={handleSubmit}
          to={`/chatRoom?name=${username}&room=${roomname}`}
        >
          <button>JOIN</button>
        </Link>
      </form>
    </div>
  );
}

export default UserInput;
