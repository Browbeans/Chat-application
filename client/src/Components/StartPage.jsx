import React, { useContext, useState } from "react";
import { Link, Route } from "react-router-dom";
import UserInput from "./Startpage/UserInput";
import JoinRoom from "./Startpage/JoinRoom";
import '../style/StartPage.css'
import { SocketContext } from "../Contexts/SocketContext";
import '../style/UserInput.css'

function StartPage() {
    const socketContext = useContext(SocketContext);

    const [username, setUsername] = useState("");
  
    const handleSubmit = (e) => {
      socketContext.handleUserName(username);
    };

    return (
        <div className="start-container">
            <h1>Welcome to ChatLine</h1>
            <div className="input-container">
                <input
                type="text"
                placeholder="Your Name"
                required
                onChange={(e) => setUsername(e.target.value)}
                />
                <Link
                    onClick={handleSubmit}
                    to="/join-room"
                    >
                    <button>Set username</button>
                </Link>
            </div>
        </div>
    )
}

export default StartPage
