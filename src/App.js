// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PublicRoomList from './pages/PublicRoomList';
import PublicRoom from './pages/PublicRoom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PrivateRoom from './pages/PrivateRoom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/public-room-list" element={<PublicRoomList />} />
        <Route path="/public-room" element={<PublicRoom />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/private-room" element={<PrivateRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
