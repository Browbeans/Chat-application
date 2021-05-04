import React from 'react'
import { Switch, Route } from 'react-router';
import StartPage from "./StartPage";
import ChatRoom from "./ChatRoom";

function Layout() {
    return (
        <div>
            <Switch>
                <Route exact path="/">
                    <StartPage/>
                </Route>
                <Route path="/chat">
                    <ChatRoom/>
                </Route>
            </Switch>
        </div>
    )
}

export default Layout;