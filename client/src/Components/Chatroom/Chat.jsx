import { useContext, useState } from "react"
import { SocketContext } from "../../Contexts/SocketContext";



function Chat() {
    const socketContext = useContext(SocketContext)
    const currentUserInfo = socketContext.currentUserRoom
    const userMessage = `Welcome ${currentUserInfo.username} to ${currentUserInfo.room}`
    
    const [message1, setMessage] = useState('')

    const createMessage = () => {
        socketContext.createMessage(message1)
    }

    return(
        <div style={rootStyle} id="chatDiv">
             <h2>{userMessage}</h2>
             <input type="text" placeholder="Enter roomname" id="roomname" onChange={(e) => {
                setMessage(e.target.value)
            }}/>
            <button onClick={createMessage}>Send message</button>
            <div style={{height: '2rem'}}>
            
                {socketContext.messages.map((msg, index) => (
                    <div key={index}>
                        <p key={msg.join}>{msg.join}</p>
                        <p key={msg.name}>{msg.name}</p>
                        <p key={msg.username}>{msg.username}</p>
                        <p key={msg.time}>{msg.time}</p>
                        <p key={msg.text}>{msg.text}</p>
                    </div>
                    ))}
            </div>
        </div>
    )
}

const rootStyle = {
    height: '40rem', 
    width: '40rem',
    background: "#666"
}

export default Chat