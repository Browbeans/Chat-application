import React, { useState } from "react";
import { Link } from "react-router-dom";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

var connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

function UserInput() {
  const [username, setUsername] = useState("");
  const [roomname, setRoomName] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    const socket = socketIOClient(ENDPOINT, connectionOptions);
    socket.emit("username", username);
    socket.emit("create-room", roomname);
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
