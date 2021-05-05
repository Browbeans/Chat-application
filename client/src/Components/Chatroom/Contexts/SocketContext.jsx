import React, { Component,createContext,  } from 'react'
import io from 'socket.io-client'

let connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io("http://localhost:5000", connectionOptions);

export const SocketContext = createContext({
    joinRoom: (username, roomname) => {}
});

class SocketProvider extends Component{
  
  joinRoomWithUsername = (username, roomname) => {

       socket.emit("join-room", username, roomname);
  }  

  componentDidMount = () => {
    
  };

  componentDidUpdate = () => {
  };

  render() {
    return (
      <SocketContext.Provider
        value={{
          ...this.state,
          joinRoom: this.joinRoomWithUsername
        }}
      >
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default SocketProvider;



