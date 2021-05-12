import { useContext, useEffect, useRef, useState } from "react"
import { SocketContext } from "../../Contexts/SocketContext";
import '../../style/ChatStyle.css'
import { Link } from 'react-router-dom'
import axios from 'axios'


function Chat() {
    const socketContext = useContext(SocketContext)
    const currentUserInfo = socketContext.currentUserRoom
    const isTyping = socketContext.isTyping
    const userMessage = `Welcome ${currentUserInfo.username} to ${currentUserInfo.room}`

    const [message1, setMessage] = useState('');
    const [typing, setTyping] = useState("")
    const [isApi, setApi] = useState(false)

    const createMessage = (e) => {
        e.preventDefault();
        socketContext.createMessage(message1);
        e.target.reset();
    }
      const leaveRoom = () => {
        socketContext.leaveRoom();
    }

    const handleTyping = (e) => {
        setMessage(e.target.value);
        socketContext.isTypingTrue(currentUserInfo);
        if(e.target.value === '/') {
            setApi(true)
        } else {
            setApi(false)
        }
    }

    const getChuckApi = () => {
        axios.get('https://api.chucknorris.io/jokes/random')
        .then(function(response){
            socketContext.createMessage(response.data.value);
        })
    }

    const messageEndRef = useRef(null)
    
    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom();
        setTyping(isTyping);
    })

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
                        <div>
                            {msg.room === currentUserInfo.room
                            ?
                            <div key={index}>
                                {/* <p key={msg.join}>{msg.text}</p>
                                <p key={msg.name}>{msg.name}</p> */}
                                <div>
                                    {msg.text
                                    ?
                                    <div className="complete-message">
                                        <h3 class="name-h3" key={msg.username}>{msg.username}
                                            <span class="time-span" key={msg.time}>{msg.time}</span>
                                        </h3>

                                        <div className="chat-message">
                                            <p key={msg.text}>{msg.text}</p>
                                        </div>
                                        <div ref={messageEndRef}></div>
                                </div>
                            :
                            <></>    
                            }
                            </div>
                            </div>
                            :
                            <></>
                            }
                            
                        </div>
                    ))}
                </div>
            </div>
            <p>{typing}</p>
            <form className="input-div" onSubmit={(e) => createMessage(e)}>
                <input
                    className="inputMessage"
                    type="text"
                    placeholder="Write message"
                    id="roomname"
                    onChange={(e) => {handleTyping(e)}}
                />
                {isApi 
                ? 
                <ul style={{position: 'fixed', top: '70%'}}>
                    <li onClick={getChuckApi}>CHUCK NORRIS</li>
                    {/* <li onClick={getApi}>API</li> */}
                </ul>
                : 
                <></>
                }
                <input type="submit" className="sendBtn" value="Send"/>
            </form>
        </div>
    );
}

export default Chat