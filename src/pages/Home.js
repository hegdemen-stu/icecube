// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/public-room-list">Public Room List</Link>
      <Link to="/login">Login / Signup</Link>
    </div>
  );
}

export default Home;
