import React from 'react'
import UserInput from "./Startpage/UserInput";
import CreateRoom from "./Startpage/CreateRoom";
import JoinRoom from "./Startpage/JoinRoom";

function StartPage() {
    return (
        <div>
            <UserInput/>
            <CreateRoom/>
            <JoinRoom/>
        </div>
    )
}

export default StartPage
