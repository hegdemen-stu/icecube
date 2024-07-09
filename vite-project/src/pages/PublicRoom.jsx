import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaCog } from 'react-icons/fa';
import OneLove from '../assets/Onelove.mp3';
import Attention from '../assets/Attention.mp3';
import './PublicRoom.css';
import MusicGenres from './MusicGenres'; // Ensure this path is correct

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
  const [volume, setVolume] = useState(0.5); // Volume state
  const [showSettings, setShowSettings] = useState(false); // Settings visibility state
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

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && songs.length > 0) {
      audio.volume = volume;
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
  }, [currentSongIndex, isPlaying, songs, volume]);

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
    <div>
      <h2>PublicRoom Music Player</h2>
      <div>Now Playing: {songs[currentSongIndex]?.name || 'No song available'}</div>
      <audio ref={audioRef} src={songs[currentSongIndex]?.url} />
      <button onClick={playPreviousSong}><FaStepBackward /></button>
      <button onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button onClick={playNextSong}><FaStepForward /></button>
      <button onClick={toggleSettings}><FaCog /></button>
      {showSettings && (
        <div className="settings">
          <h3>Settings</h3>
          <label>
            Volume:
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(e.target.value)}
            />
          </label>
        </div>
      )}
      <MusicGenres setCurrentGenre={setCurrentGenre} />
    </div>
  );
};

export default PublicRoom;
