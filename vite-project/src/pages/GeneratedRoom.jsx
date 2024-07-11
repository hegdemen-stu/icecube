import React from 'react';
import { useParams } from 'react-router-dom';

const GeneratedRoom = () => {
  const { roomCode } = useParams();

  return (
    <div className="generated-room">
      <h1>Welcome to Private Room</h1>
      <p>Your room code is: {roomCode}</p>
      {/* Add more room functionality here */}
    </div>
  );
};

export default GeneratedRoom;