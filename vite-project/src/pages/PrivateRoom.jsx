import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PrivateRoom.css';
import backgroundImage from '../assets/background5.jpg';

const PrivateRoom = () => {
  const [isJoinFormVisible, setJoinFormVisible] = useState(false);
  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const navigate = useNavigate();

  const handleJoinButtonClick = () => {
    setJoinFormVisible(!isJoinFormVisible);
  };

  const handleCreateButtonClick = () => {
    const newCode = generateRandomCode();
    setGeneratedCode(newCode);
    setCreateFormVisible(true);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    // Optionally, you can add a visual feedback that the code was copied
  };

  const handleEnterRoom = () => {
    navigate(`/PrivateRoom/${generatedCode}`);
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
    <div
      className="private-room-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="room-actions">
        <div className="join-room">
          <button className="join-room-button" onClick={handleJoinButtonClick}>
            Join Room
          </button>
         {isJoinFormVisible && (
            <div className="join-room-form glassmorphic-dropdown">
              <input type="text" placeholder="Paste/Type Room Code" />
              <button className="submit-room-code">Submit</button>
            </div>
          )}
        </div>
        <div className="create-room">
          <button className="create-room-button" onClick={handleCreateButtonClick}>
            Create Room
          </button>
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