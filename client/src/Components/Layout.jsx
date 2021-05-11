import React from 'react'
import { Switch, Route } from 'react-router';
import StartPage from "./StartPage";
import ChatRoom from "./Chatroom/ChatRoom";
import UserInput from './Startpage/UserInput'
import JoinRoom from './Startpage/JoinRoom'
import '../style/JoinRoom.css'

function Layout() {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <StartPage/>
                </Route>
                <Route path="/chatRoom">
                    <ChatRoom/>
                </Route>
                <Route path="/join-room">
                    <div className="wrapper">
                    <JoinRoom/>
                    <UserInput/>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Layout;