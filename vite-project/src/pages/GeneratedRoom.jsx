import React, { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import ChatBox from '../components/ChatBox';
import './GeneratedRoom.css';

const GeneratedRoom = () => {
  const { roomCode } = useParams();
  const roomCodeRef = useRef(null);
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

  const copyRoomCode = () => {
    if (roomCodeRef.current) {
      roomCodeRef.current.select();
      document.execCommand('copy');
    }
  };

  if (!socket) {
    return <div>Connecting...</div>;
  }

  return (
    <div className="generated-room">
      <div className="top-section">
        <h1>Hi there, Welcome to your private cube!</h1>
      </div>
      <div className="bottom-section">
        <div className="room-code">
          <p>Your room code is:</p>
          <input
            type="text"
            ref={roomCodeRef}
            defaultValue={roomCode}
            readOnly
          />
          <button onClick={copyRoomCode}>Copy Code</button>
        </div>
      </div>
      <ChatBox socket={socket} roomCode={roomCode} />
    </div>
  );
};

export default GeneratedRoom;
