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
  usersJoined: [],
  currentUserRoom: {},
  messages: [],
  joinRoom: (username, roomname) => {},
  createMessage: (message) => {},
  getMessage: () => {},
  leaveRoom: () => {}
});

class SocketProvider extends Component {
  
  state = {
    currentUserRoom: {},
    messages: []
  }

  joinRoomWithUsername = (username, roomname) => {
    socket.emit("join-room", username, roomname);
  }  


  createMessageToSocket = (message) => {
    const userObject = {
      text: message, 
      name: this.state.currentUserRoom.username,
      room: this.state.currentUserRoom.room
    }
    socket.emit('chat-message', (userObject))
  }
  
  // const newMessage = [...this.state.messages, message]
  // this.setState({messages: newMessage})
  // socket.emit('chat-message', (message))
 
  componentDidMount = () => {

    socket.on('message', (data) => {
      console.log(data)
      this.setState({currentUserRoom: data})
    })

    socket.on('user-joined', (response) => {
      const userJoined = {
        join: response
      }
      const newUserMessage = [...this.state.messages, userJoined]
      
      this.setState({messages: newUserMessage})
    })

    socket.on('user-message', (data) => {
      console.log(data)
      const newUserMessage = [...this.state.messages, data]
      this.setState({messages: newUserMessage})
    })

    socket.on('user-left', (data) => {
      console.log(data)
    })
  };

  componentDidUpdate = () => {

  };

  render() {
    return (
      <SocketContext.Provider
        value={{
          messages: this.state.messages,
          currentUserRoom: this.state.currentUserRoom,
          joinRoom: this.joinRoomWithUsername,
          createMessage: this.createMessageToSocket,
          getMessage: this.getMessageFromSocket
        }}
      >
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default SocketProvider;



