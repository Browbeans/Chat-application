import React from 'react'
import { Switch, Route } from 'react-router';
import StartPage from "./StartPage";
import ChatRoom from "./Chatroom/ChatRoom";

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
            </Switch>
        </div>
    )
}

export default Layout;