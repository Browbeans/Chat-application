import './App.css';
import React, { useEffect } from 'react'
import io from 'socket.io-client'
var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};

const socket = io('http://localhost:5000', connectionOptions);

function App() {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connection est')
    })
  })
  return (
    <div className="App">
    <h1>Hello world</h1>
    </div>
  );
}

export default App;
