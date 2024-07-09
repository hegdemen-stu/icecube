import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaCog } from 'react-icons/fa';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel'; // Import Carousel component
import OneLove from '../assets/Onelove.mp3';
import Attention from '../assets/Attention.mp3';
import './PublicRoom.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

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
  const [volume, setVolume] = useState(0.5);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <div className="page-body">
      <div className="container">
        <div className="main-content">
          <div className="carousel-container">
            <Carousel showThumbs={false}>
              <div>
                <img src="/path/to/your/image1.jpg" alt="Carousel Image 1" />
              </div>
              <div>
                <img src="/path/to/your/image2.jpg" alt="Carousel Image 2" />
              </div>
              <div>
                <img src="/path/to/your/image3.jpg" alt="Carousel Image 3" />
              </div>
            </Carousel>
          </div>
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
            </div>
          </div>
        </div>
        <div className="genres-sidebar">
          <h2 className="genres-header">Genres</h2>
          <div className="genres-list">
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

export default PublicRoom;
