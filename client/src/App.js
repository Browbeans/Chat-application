import './App.css';
import React from 'react'
import { BrowserRouter } from "react-router-dom";
import Layout from './Components/Layout';
import SocketProvider from './Contexts/SocketContext';

function App() {

  return (
    <BrowserRouter>
      <SocketProvider>
        <Layout />
      </SocketProvider>
    </BrowserRouter>
  );
}

export default App;
