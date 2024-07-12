import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PrivateRoom.css';
import backgroundImage from '../assets/background5.jpg';
import io from 'socket.io-client';
import axios from 'axios';

const PrivateRoom = () => {
  const [isJoinFormVisible, setJoinFormVisible] = useState(false);
  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();
  const socket = io('http://localhost:8000', { withCredentials: true });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/check-auth', { withCredentials: true });
        if (response.data.isAuthenticated) {
          setUserId(response.data.user._id);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

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
  };

  const handleEnterRoom = () => {
    if (userId) {
      socket.emit('create room', generatedCode, userId);
      navigate(`/PrivateRoom/${generatedCode}`);
    } else {
      alert("Please log in to create a room");
    }
  };

  const handleJoinRoom = () => {
    if (joinCode && userId) {
      socket.emit('join room', joinCode, userId);
      navigate(`/PrivateRoom/${joinCode}`);
    } else {
      alert("Please enter a room code and ensure you're logged in");
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

  if (!userId) {
    return <div>Loading...</div>;
  }

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
