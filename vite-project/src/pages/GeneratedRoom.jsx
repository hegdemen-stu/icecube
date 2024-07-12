import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import backgroundImgs from '../assets/background6.jpg'; // Import your background image
import './GeneratedRoom.css'; // Import CSS file

const GeneratedRoom = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/check-auth', { withCredentials: true });
        if (response.data.isAuthenticated) {
          setUserId(response.data.user._id);
          const newSocket = io('http://localhost:8000', { withCredentials: true });
          setSocket(newSocket);

          newSocket.emit('join room', roomCode, response.data.user._id);

          newSocket.on('user joined', (joinedUsername) => {
            console.log(`User ${joinedUsername} joined the room`);
          });

          newSocket.on('update user count', (count) => {
            setUserCount(count);
          });

          newSocket.on('error', (errorMessage) => {
            console.error(errorMessage);
            alert(errorMessage);
            navigate('/PrivateRoom');
          });

          return () => {
            newSocket.disconnect();
          };
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [roomCode, navigate]);

  if (!socket || !userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className='background-room' style={{ backgroundImage: `url(${backgroundImgs})` }}>
      <div className="generated-room">
        <div className="main-content">
          <h1>Hi there! Welcome to your private room</h1>
        </div>
        <div className="chat-container">
          <div className="chat-box-container">
            <ChatBox socket={socket} roomCode={roomCode} userId={userId} />
          </div>
        </div>
      </div>
      <div className="room-info">
        <p>Your room code is: {roomCode}</p>
        <p>Users in room: {userCount}</p>
      </div>
    </div>
  );
};

export default GeneratedRoom;
