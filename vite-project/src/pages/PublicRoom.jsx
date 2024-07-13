import React, { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaCog } from 'react-icons/fa';
import Modal from 'react-modal';
import { Carousel } from 'react-responsive-carousel';
import Carousel1 from '../assets/carousel1.jpg';
import Carousel2 from '../assets/carousel2.jpg';
import Carousel3 from '../assets/carousel3.jpg';
import Carousel4 from '../assets/carousel4.jpg';
import Carousel5 from '../assets/carousel5.jpg';
import Carousel6 from '../assets/carousel6.jpg';
import Carousel7 from '../assets/carousel7.jpg';
import './PublicRoom.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';

const genres = {
  POP: [],
  Rock: [],
  "R&B":[],
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
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('http://localhost:8000/songs');
        console.log('API Response:', response.data); // Log the response data
    
        if (Array.isArray(response.data)) {
          const songsData = response.data.map((song) => ({
            name: song.metadata.name, // Update to use name from metadata
            artist: song.metadata.artist, // Update to use artist from metadata
            url:` http://localhost:8000/stream/${song.filename}`,
            metadata: song.metadata // Include metadata for genre display
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
    console.log(`Artist: ${songs[currentSongIndex]?.artist}`);
    console.log(`Is playing: ${isPlaying}`);
  }, [currentSongIndex, isPlaying, songs]);

  // Function to fetch songs based on selected genre
  const fetchSongsByGenre = async (genre) => {
    try {
      const response = await axios.get(`http://localhost:8000/songs`, {
        params: { genre }
      });
  
      if (response.status !== 200) {
        throw new Error('Error fetching songs');
      }
  
      const songsData = response.data.map((song) => ({
        name: song.metadata.name,
        artist: song.metadata.artist,
        url: `http://localhost:8000/stream/${song.filename}`,
        metadata: song.metadata
      }));
  
      setSongs(songsData); // Update songs state with songsData fetched by genre
    } catch (error) {
      console.error('Error fetching songs by genre:', error);
      setSongs([]); // Clear songs state on error
    }
  };
  
  // Handle genre selection
  const handleGenreChange = async (event) => {
    const selectedGenre = event.target.value;
    setCurrentGenre(selectedGenre);
    
    // Pause the playback and reset current song index
    setIsPlaying(false);
    setCurrentSongIndex(0); // Reset to the first song index or handle differently as per your requirement
    
    // Fetch songs based on the selected genre
    await fetchSongsByGenre(selectedGenre);
  };

  return (
    <div className="page-body">
      <div className="container-pr">
        <div className="main-content-pr">
          <div className="carousel-container">
            <Carousel showThumbs={false} autoPlay interval={3000} infiniteLoop>
              <div>
                <img src={Carousel1} alt="Carousel Image 1" />
              </div>
              <div>
                <img src={Carousel2} alt="Carousel Image 2" />
              </div>
              <div>
                <img src={Carousel3} alt="Carousel Image 3" />
              </div>
              <div>
                <img src={Carousel4} alt="Carousel Image 4" />
              </div>
              <div>
                <img src={Carousel5} alt="Carousel Image 5" />
              </div>
              <div>
                <img src={Carousel6} alt="Carousel Image 6" />
              </div>
              <div>
                <img src={Carousel7} alt="Carousel Image 7" />
              </div>
            </Carousel>
          </div>
          <div className="top-content">
            <div className="room-container">
              <h2 className="room-header-public">Tune in and Relax!</h2>
              <div className="current-playing">
                Now Playing: {songs[currentSongIndex]?.name || 'No song available'} - {songs[currentSongIndex]?.artist || 'Unknown artist'}
              </div>
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
        <div className="genres-sidebar-pr">
          <h2 className="genres-header-pr">Genres</h2>
          <div className="genres-list-pr">
            {Object.keys(genres).map((genre) => (
              <button
                key={genre}
                className={`genre-button-pr ${currentGenre === genre ? 'bg-green-600' : ''}`}
                onClick={() => handleGenreChange({ target: { value: genre } })}
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