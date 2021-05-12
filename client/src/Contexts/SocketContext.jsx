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
  userName: '',
  allRooms: [],
  usersJoined: [],
  currentUserRoom: {},
  messages: [],
  lockedRooms: [],
  isTyping: "",
  joinRoom: (username, roomname) => {},
  createMessage: (message) => {},
  getMessage: () => {},
  leaveRoom: () => {},
  joinLockedRoom: () => {},
  handleUserName: () => {},
  isTypingTrue: () => {}
});

class SocketProvider extends Component {
  
  state = {
    userName: '',
    allRooms: [],
    currentUserRoom: {},
    messages: [],
    lockedRooms: [],
    isTyping: ""
  }

  setIsTypingTrue = (userObj) => {
    socket.emit("typing", userObj);
  };

  setUserNameToState = (username) => {
    this.setState({userName: username})
  }

  joinRoomWithUsername = (username, roomname) => {
    socket.emit("join-room", username, roomname, `${username} has joined the chat`);
    socket.emit("current-room", username, roomname);
  }

  joinLockedRoom = (username, roomname, password) => {
    socket.emit('join-pw-room', username, roomname, password);
  }

  leaveRoom = () => {
    socket.emit('leave-room');
  }

  createMessageToSocket = (message) => {
    const userObject = {
      text: message, 
      name: this.state.currentUserRoom.username,
      room: this.state.currentUserRoom.room
    }
    socket.emit("typing", userObject);
    socket.emit('chat-message', (userObject))
  }
 
  componentDidMount = () => {

    socket.on("display-typing", (user) => {
      this.setState({ isTyping: user })
    })

    socket.on("current-room", (data) => {
      const updatedUsers = data;
      this.setState({ allRooms: updatedUsers });
    });

    socket.on('get-rooms', (rooms) => {
      this.setState({ allRooms: rooms })
      console.log(this.state.allRooms)
    })

    socket.on('message', (data) => {
      this.setState({currentUserRoom: data})
    })

    socket.on('user-joined', (response) => {
      console.log(response)
      const userJoined = {
        text: response.text, 
        room: response.room, 
        name: response.username
      }
      const newUserMessage = [...this.state.messages, userJoined]
      this.setState({messages: newUserMessage})
    })

    socket.on('locked-room', (room) => {
      // const newLockedRoom = [...this.state.lockedRooms, room];
      this.setState({lockedRooms: room})
    })
    

    socket.on('user-message', (data) => {
      console.log(data)
      const newUserMessage = [...this.state.messages, data]
      this.setState({messages: newUserMessage})
    })

    socket.on('user-leave', (response) => {
      const userJoined = {
        text: response.text, 
        room: response.room, 
        name: response.username
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
          users: this.state.users,
          userName: this.state.userName,
          allRooms: this.state.allRooms,
          messages: this.state.messages,
          currentUserRoom: this.state.currentUserRoom,
          getMessage: this.getMessageFromSocket,
          lockedRooms: this.state.lockedRooms,
          isTyping: this.state.isTyping,
          leaveRoom: this.leaveRoom,
          joinRoom: this.joinRoomWithUsername,
          createMessage: this.createMessageToSocket,
          joinLockedRoom: this.joinLockedRoom,
          handleUserName: this.setUserNameToState,
          isTypingTrue: this.setIsTypingTrue
        }}
      >
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

export default SocketProvider;



