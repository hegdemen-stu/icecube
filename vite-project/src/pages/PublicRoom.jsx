// npm install react-icons
import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaCog } from 'react-icons/fa';
import OneLove from '../assets/Onelove.mp3';
import Attention from '../assets/Attention.mp3'; // Updated path

const songs = [
  { name: 'One Love', url: OneLove },
  { name: 'Attention', url: Attention },
  // Add more songs as needed
];

const PublicRoom = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setIsPlaying(!isPlaying);
  };

  const playNextSong = () => {
    const nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true); // Ensure the next song starts playing automatically
  };

  const playPreviousSong = () => {
    const prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true); // Ensure the previous song starts playing automatically
  };

  const handleOtherOptions = () => {
    console.log('Other options functionality to be implemented');
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
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
  }, [currentSongIndex, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [currentSongIndex]);

  useEffect(() => {
    console.log(`Current song: ${songs[currentSongIndex].name}`);
    console.log(`Is playing: ${isPlaying}`);
  }, [currentSongIndex, isPlaying]);

  return (
    <div>
      <h2>PublicRoom Music Player</h2>
      <div>Now Playing: {songs[currentSongIndex].name}</div>
      <audio ref={audioRef} src={songs[currentSongIndex].url} />
      <button onClick={playPreviousSong}><FaStepBackward /></button> {/* Previous */}
      <button onClick={togglePlayPause}>
        {isPlaying ? <FaPause /> : <FaPlay />} {/* Play/Pause */}
      </button>
      <button onClick={playNextSong}><FaStepForward /></button> {/* Next */}
      <button onClick={handleOtherOptions}><FaCog /></button> {/* Other Options */}
    </div>
  );
};

export default PublicRoom;
