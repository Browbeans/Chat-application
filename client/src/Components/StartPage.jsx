import React from 'react'
import UserInput from "./Startpage/UserInput";
import JoinRoom from "./Startpage/JoinRoom";
import '../style/StartPage.css'

function StartPage() {
    return (
        <div className="start-container">
            <JoinRoom/>
            <UserInput/>
        </div>
    )
}

export default StartPage
