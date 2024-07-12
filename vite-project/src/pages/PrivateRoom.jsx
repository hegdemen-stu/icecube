import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PrivateRoom.css';
import backgroundImage from '../assets/background5.jpeg';
import io from 'socket.io-client';

const PrivateRoom = () => {
  const [isJoinFormVisible, setJoinFormVisible] = useState(false);
  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const navigate = useNavigate();
  const socket = io('http://localhost:8000');

  const handleJoinButtonClick = () => {
    setJoinFormVisible(!isJoinFormVisible);
  };

  const handleCreateButtonClick = () => {
    const newCode = generateRandomCode();
    setGeneratedCode(newCode);
    setCreateFormVisible(true);
    socket.emit('create room', newCode);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
  };

  const handleEnterRoom = () => {
    navigate(`/PrivateRoom/${generatedCode}`);
  };

  const handleJoinRoom = () => {
    if (joinCode) {
      socket.emit('join room', joinCode);
      navigate(`/PrivateRoom/${joinCode}`);
    }
  };

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 6;
    let code = '';
    for (let i = 0; i < codeLength; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  return (
    <div className="private-room-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="room-actions">
        <div className="join-room">
          <button className="join-room-button" onClick={handleJoinButtonClick}>Join Room</button>
          {isJoinFormVisible && (
            <div className="join-room-form glassmorphic-dropdown">
              <input 
                type="text" 
                placeholder="Paste/Type Room Code" 
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
              />
              <button className="submit-room-code" onClick={handleJoinRoom}>Submit</button>
            </div>
          )}
        </div>
        <div className="create-room">
          <button className="create-room-button" onClick={handleCreateButtonClick}>Create Room</button>
          {isCreateFormVisible && (
            <div className="create-room-form glassmorphic-dropdown">
              <div className="generated-code">{generatedCode}</div>
              <button className="copy-room-code" onClick={handleCopyCode}>Copy Code</button>
              <button className="enter-room" onClick={handleEnterRoom}>Enter Room</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivateRoom;
