import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter } from "react-router-dom";
import io from 'socket.io-client'
import Layout from './Components/Layout';

var connectionOptions =  {
  "force new connection" : true,
  "reconnectionAttempts": "Infinity", 
  "timeout" : 10000,                  
  "transports" : ["websocket"]
};

const socket = io('http://localhost:5000', connectionOptions);

function App() {
  useEffect(() => {
    socket.emit('connection', "Petter");
  })
  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  );
}

export default App;
