// src/pages/PublicRoomList.js
import React from 'react';
import { Link } from 'react-router-dom';

function PublicRoomList() {
  return (
    <div>
      <h1>Public Room List</h1>
      <Link to="/public-room">Enter Public Room</Link>
    </div>
  );
}

export default PublicRoomList;
