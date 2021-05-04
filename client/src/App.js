import './App.css';
import React, { useEffect } from 'react'
import io from 'socket.io-client'
let socket; 

function App() {

  useEffect(() => {
    socket = io('http://localhost:5000', { transports: ['websocket', 'polling', 'flashsocket'] });
  })

  return (
    <div className="App">
    <h1>Hello world</h1>
    </div>
  );
}

export default App;
