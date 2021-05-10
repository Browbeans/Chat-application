import React from 'react'
import RoomInfo from './RoomInfo'
import Chat from './Chat'
import '../../style/ChatRoom.css'

function ChatRoom() {
    return (
        <div className="chat-page-container">
            <RoomInfo/>
            <Chat/>
        </div>
    )
}

export default ChatRoom
