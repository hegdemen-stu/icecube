import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaCog } from 'react-icons/fa';
import OneLove from '../assets/Onelove.mp3';
import Attention from '../assets/Attention.mp3';
import './PublicRoom.css';

const genres = {
  POP: [{ name: 'One Love', url: OneLove }],
  Rock: [{ name: 'Attention', url: Attention }],
  Melody: [],
  LoFi: [],
  Jazz: [],
};

const PublicRoom = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentGenre, setCurrentGenre] = useState('POP');
  const audioRef = useRef(null);

  const songs = genres[currentGenre] || [];

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
    console.log('Other options functionality to be implemented');
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
    console.log(`Current song: ${songs[currentSongIndex]?.name}`);
    console.log(`Is playing: ${isPlaying}`);
  }, [currentSongIndex, isPlaying, songs]);

  return (
    <div className="page-body">
      <div className="container">
        <div className="sidebar">
          <h2 className="sidebar-header">Your Library</h2>
          <div className="sidebar-item">Playlists</div>
          <div className="sidebar-item">Podcasts</div>
          <div className="sidebar-item">Artists</div>
          <div className="sidebar-item">Albums</div>
        </div>
        <div className="main-content">
          <div className="top-content">
            <div className="room-container">
              <h2 className="room-header">PublicRoom Music Player</h2>
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
              <div className="genres-wrapper">
                {Object.keys(genres).map((genre) => (
                  <button
                    key={genre}
                    className={`genre-button ${currentGenre === genre ? 'bg-green-600' : ''}`}
                    onClick={() => setCurrentGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="music-library">
            <h2 className="music-library-header">Your Library</h2>
            {songs.map((song, index) => (
              <div
                key={index}
                className="music-item"
                onClick={() => setCurrentSongIndex(index)}
              >
                <div className="music-item-name">{song.name}</div>
                <div className="music-item-info">{/* Add any additional info here */}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicRoom;
