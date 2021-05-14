import { useContext, useEffect, useRef, useState } from "react"
import { SocketContext } from "../../Contexts/SocketContext";
import '../../style/ChatStyle.css'
import axios from 'axios'


function Chat() {
    const socketContext = useContext(SocketContext)
    const currentUserInfo = socketContext.currentUserRoom
    const isTyping = socketContext.isTyping
    const userMessage = `Welcome ${currentUserInfo.username} to ${currentUserInfo.room}`

    const [message1, setMessage] = useState('');
    const [typing, setTyping] = useState("")
    const [isApi, setApi] = useState(false)
    const [giphy, setGiphy] = useState('')

    const createMessage = (e) => {
        e.preventDefault();
        socketContext.createMessage(message1);
        e.target.reset();
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

    const getRandomGif = () => {
        axios.get('https://api.unsplash.com/photos/random/?client_id=2cGzBSkm7Phibps9mLIUbfroOTD0kaKc6U98Jgw8Xzg')
        .then(function(response) {
            socketContext.createGiphy(response.data.urls.raw)
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
            </div>

            <div className="conversation-div">
                <div className="message-div">
                    {socketContext.messages.map((msg, index) => (
                        <div>
                            {msg.room === currentUserInfo.room
                            ?
                            <div key={index}>
                                <div>
                                    {msg.time
                                    ?
                                    <div className="complete-message">
                                        <h3 class="name-h3" key={msg.username}>{msg.username}
                                            <span class="time-span" key={msg.time}>{msg.time}</span>
                                        </h3>
                                        {msg.text
                                        ?
                                        <div className="chat-message">
                                            <p key={msg.text}>{msg.text}</p>
                                        </div>
                                        :
                                        <div>
                                            <img style={{width: '10%', height: 'auto'}} src={msg.giphy} alt="" />
                                        </div>
                                        }
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
            {isApi 
                ? 
                <div className="api-div">
                    <ul>
                        <div className="list">
                        <li onClick={getChuckApi}>CHUCK NORRIS</li>
                        </div>
                        <div className="list">
                        <li onClick={getRandomGif}>Send random image</li>
                        </div>
                    </ul>

                </div>
                : 
                <></>
            }
            <form className="input-div" onSubmit={(e) => createMessage(e)}>
                <input
                    className="inputMessage"
                    type="text"
                    placeholder="Write message"
                    id="roomname"
                    onChange={(e) => {handleTyping(e)}}
                />
                <input type="submit" className="sendBtn" value="Send"/>
            </form>
        </div>
    );
}

export default Chat