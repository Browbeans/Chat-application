import React, { useEffect, useState } from 'react';
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

var connectionOptions =  {
    "force new connection" : true,
    "reconnectionAttempts": "Infinity", 
    "timeout" : 10000,                  
    "transports" : ["websocket"]
  };

function UserInput() {
    const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const socket = socketIOClient(ENDPOINT, connectionOptions);
        socket.emit('username', username);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Your Name"
                    required
                    onChange={e => setUsername(e.target.value)}
                />
                <input type="submit" value="Send"/>
            </form>
        </div>
    )
}

export default UserInput
