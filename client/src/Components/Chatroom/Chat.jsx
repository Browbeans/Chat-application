import { useContext, useState } from "react"
import io from 'socket.io-client'
import { SocketContext } from "../../Contexts/SocketContext";



function Chat() {
    const socketContext = useContext(SocketContext)
    
    const [message1, setMessage] = useState('')
    const [messageOutput, setMessageOutput] = useState({})

    const createMessage = () => {
        socketContext.createMessage(message1)
    }

    return(
        <div id="chatDiv">
             <input type="text" placeholder="Enter roomname" id="roomname" onChange={(e) => {
                setMessage(e.target.value)
            }}/>
            <button onClick={createMessage}>Send message</button> 
        </div>
    )
}

export default Chat