import { useContext, useState } from "react"
import { SocketContext } from "../../Contexts/SocketContext";
import '../../style/ChatStyle.css'
import { Link } from 'react-router-dom'


function Chat() {
    const socketContext = useContext(SocketContext)
    const currentUserInfo = socketContext.currentUserRoom
    const userMessage = `Welcome ${currentUserInfo.username} to ${currentUserInfo.room}`
    
    const [message1, setMessage] = useState('')

    const createMessage = () => {
        socketContext.createMessage(message1)
    }
      const leaveRoom = () => {
        socketContext.leaveRoom();
    }

    return(
        <div className="chat-container">

            <div className="welcome-div">
                <h2 className="usserMessage">{userMessage}</h2>
                <Link to="/join-room">
                    <button className="leaveBtn" onClick={leaveRoom}>
                        Leave Room
                    </button>
                </Link>
            </div>

            <div className="conversation-div">

                <div className="message-div">

                    {socketContext.messages.map((msg, index) => (
                        
                        <div key={index}>
                            <p key={msg.join}>{msg.join}</p>
                            <p key={msg.name}>{msg.name}</p>
                            <div>
                            {msg.text
                            ?
                            <div className="complete-message">
                                <h3 key={msg.username}>{msg.username}
                                    <span key={msg.time}>{msg.time}</span>
                                </h3>

                                <div className="chat-message">
                                    <p key={msg.text}>{msg.text}</p>
                                </div>
                            </div>
                            :
                            <></>    
                            }
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="input-div">
                <input
                    className="inputMessage"
                    type="text"
                    placeholder="Write message"
                    id="roomname"
                    onChange={(e) => {
                    setMessage(e.target.value);
                }}
                />
                <button className="sendBtn" onClick={createMessage}>Send</button>
            </div>

        </div>
    );
}

export default Chat