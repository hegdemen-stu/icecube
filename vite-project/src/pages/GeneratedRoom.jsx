import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import ChatBox from '../components/ChatBox';

const GeneratedRoom = () => {
  const { roomCode } = useParams();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    newSocket.emit('join room', roomCode);

    newSocket.on('user joined', (userId) => {
      console.log(`User ${userId} joined the room`);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomCode]);

  if (!socket) {
    return <div>Connecting...</div>;
  }

  return (
    <div className="generated-room">
      <h1>Welcome to Private Room</h1>
      <p>Your room code is: {roomCode}</p>
      <ChatBox socket={socket} roomCode={roomCode} />
    </div>
  );
};

export default GeneratedRoom;
