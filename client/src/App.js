import './App.css';
import React, { useEffect } from 'react'
import { BrowserRouter } from "react-router-dom";
import Layout from './Components/Layout';
import io from 'socket.io-client'

function App() {


  useEffect(() => {
    var connectionOptions =  {
      "force new connection" : true,
      "reconnectionAttempts": "Infinity", 
      "timeout" : 10000,                  
      "transports" : ["websocket"]
    };
    
    const socket = io('http://localhost:5000', connectionOptions);
    socket.emit('connection', "Petter");
  })
  return (
    <BrowserRouter>
      <Layout/>
    </BrowserRouter>
  );
}

export default App;
