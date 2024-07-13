/*npm i react-draggable */

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import ChatBox from '../components/ChatBox';
import axios from 'axios';
import backgroundImgs from '../assets/background6.jpg';
import Draggable from 'react-draggable';
import Modal from 'react-modal';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaCog } from 'react-icons/fa';
import './GeneratedRoom.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const genres = {
  POP: [],
  Rock: [],
  Melody: [],
  LoFi: [],
  Jazz: [],
};

const GeneratedRoom = () => {
  const { roomCode } = useParams();
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [userCount, setUserCount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [chatPosition, setChatPosition] = useState({ x: 0, y: 0 });
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGenre, setCurrentGenre] = useState('POP');
  const [volume, setVolume] = useState(0.5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef(null);
  const [songs, setSongs] = useState([]);

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

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/songs');
        if (Array.isArray(response.data)) {
          const songsData = response.data.map((song) => ({
            name: song.filename,
            url: `http://localhost:8000/stream/${song.filename}`,
            metadata: song.metadata
          }));
          setSongs(songsData);
        } else {
          console.error('Unexpected response format:', response.data);
        }
      } catch (error) {
        console.error('Error fetching songs:', error);
      }
    };

    fetchSongs();
  }, []);

  const togglePlayPause = () => {
    if (!isPlaying && songs[currentSongIndex]) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    if (songs.length > 0) {
      const nextIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(nextIndex);
      setIsPlaying(true);
    }
  };

  const playPreviousSong = () => {
    if (songs.length > 0) {
      const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
      setCurrentSongIndex(prevIndex);
      setIsPlaying(true);
    }
  };

  const handleOtherOptions = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && songs.length > 0) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }

      const handleEnded = () => {
        playNextSong();
      };

      audio.addEventListener('ended', handleEnded);
      return () => {
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSongIndex, isPlaying, songs]);

  useEffect(() => {
    if (isPlaying && songs.length > 0) {
      audioRef.current.play();
    }
  }, [currentSongIndex, songs]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    console.log(`Current song: ${songs[currentSongIndex]?.name}`);
    console.log(`Is playing: ${isPlaying}`);
  }, [currentSongIndex, isPlaying, songs]);

  const fetchSongsByGenre = async (genre) => {
    try {
      const response = await axios.get(`http://localhost:8000/songs`, {
        params: { genre }
      });

      if (response.status !== 200) {
        throw new Error('Error fetching songs');
      }

      const songsData = response.data.map((song) => ({
        name: song.filename,
        url: `http://localhost:8000/stream/${song.filename}`,
        metadata: song.metadata
      }));
      setSongs(songsData);
    } catch (error) {
      console.error('Error fetching songs by genre:', error);
      setSongs([]);
    }
  };

  const handleGenreChange = async (event) => {
    const selectedGenre = event.target.value;
    setCurrentGenre(selectedGenre);
    setIsPlaying(false);
    setCurrentSongIndex(0);
    await fetchSongsByGenre(selectedGenre);
  };

  const handleDrag = (e, ui) => {
    const { x, y } = chatPosition;
    setChatPosition({ x: x + ui.deltaX, y: y + ui.deltaY });
  };

  if (!socket || !userId) {
    return <div>Loading...</div>;
  }

  return (
    <div className='background-room' style={{ backgroundImage: `url(${backgroundImgs})` }}>
      <div className="generated-room">
        <div className="main-content">
          <h1>Hi there! Welcome to your private room</h1>
          <div className="music-player">
            <div className="room-container">
              <h2 className="room-header">PrivateRoom Music Player</h2>
              <div className="current-playing">Now Playing: {songs[currentSongIndex]?.name || 'No song available'}</div>
              <audio ref={audioRef} src={songs[currentSongIndex]?.url} />
              <div className="controls-container">
                <button className="control-button" onClick={playPreviousSong}><FaStepBackward /></button>
                <button className="control-button" onClick={togglePlayPause}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className="control-button" onClick={playNextSong}><FaStepForward /></button>
                <button className="control-button" onClick={handleOtherOptions}><FaCog /></button>
              </div>
            </div>
            <div className="genres-sidebar">
              <h2 className="genres-header">Genres</h2>
              <div className="genres-list">
                {Object.keys(genres).map((genre) => (
                  <button
                    key={genre}
                    className={`genre-button ${currentGenre === genre ? 'bg-green-600' : ''}`}
                    onClick={() => handleGenreChange({ target: { value: genre } })}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Draggable bounds="parent" onDrag={handleDrag}>
          <div className="chat-container" style={{ left: chatPosition.x, top: chatPosition.y }}>
            <div className="chat-box-container">
              <ChatBox socket={socket} roomCode={roomCode} userId={userId} />
            </div>
          </div>
        </Draggable>
      </div>
      <div className="room-info">
        <p>Your room code is: {roomCode}</p>
        <p>Users in room: {userCount}</p>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Volume Control"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Volume Control</h2>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="volume-control"
        />
        <button onClick={() => setIsModalOpen(false)}>Close</button>
      </Modal>
    </div>
  );
};

export default GeneratedRoom;
