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
  allRooms: [],
  usersJoined: [],
  currentUserRoom: {},
  messages: [],
  lockedRooms: [],
  joinRoom: (username, roomname) => {},
  createMessage: (message) => {},
  getMessage: () => {},
  leaveRoom: () => {},
  joinLockedRoom: () => {},
});

class SocketProvider extends Component {
  
  state = {
    allRooms: [],
    currentUserRoom: {},
    messages: [],
    lockedRooms: [],
  }

  joinRoomWithUsername = (username, roomname) => {
    socket.emit("join-room", username, roomname);
  }

  joinLockedRoom = () => {
    socket.emit('locked')
  }


  createMessageToSocket = (message) => {
    const userObject = {
      text: message, 
      name: this.state.currentUserRoom.username,
      room: this.state.currentUserRoom.room
    }
    socket.emit('chat-message', (userObject))
  }
 
  componentDidMount = () => {
    socket.on('get-rooms', (rooms) => {
      this.setState({ allRooms: rooms })
      console.log(this.state.allRooms)
    })

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

    socket.on('locked-room', (room) => {
      // const newLockedRoom = [...this.state.lockedRooms, room];
      this.setState({lockedRooms: room})
    })

    socket.on('user-message', (data) => {
      const newUserMessage = [...this.state.messages, data]
      this.setState({messages: newUserMessage})
    })

    socket.on('user-leave', (data) => {
      const userJoined = {
        name: data.username
      }
      const newUserMessage = [...this.state.messages, userJoined]
      this.setState({messages: newUserMessage})
    })

  };

  componentDidUpdate = () => {

  };

  render() {
    return (
      <SocketContext.Provider
        value={{
          allRooms: this.state.allRooms,
          messages: this.state.messages,
          currentUserRoom: this.state.currentUserRoom,
          joinRoom: this.joinRoomWithUsername,
          createMessage: this.createMessageToSocket,
          getMessage: this.getMessageFromSocket,
          lockedRooms: this.state.lockedRooms,
          joinLockedRoom: this.joinLockedRoom,
        }}
      >
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default SocketProvider;



