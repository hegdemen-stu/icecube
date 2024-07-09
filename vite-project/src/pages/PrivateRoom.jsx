import React from 'react';
import './PrivateRoom.css';

const PrivateRoom = () => {
  return (
    <div className="page-body">
      <div className="container">
        <div className="main-content">
          <div className="room-container">
            <div className="room-header">PrivateRoom Music Player</div>
            <div className="current-playing">Now Playing: One Love</div>
            <div className="controls-container">
              <button className="control-button">⏮️</button>
              <button className="control-button">⏯️</button>
              <button className="control-button">⏭️</button>
              <button className="control-button">🔄</button> {/* New feature: Repeat */}
              <button className="control-button">🔀</button> {/* New feature: Shuffle */}
            </div>
            <div className="genres-wrapper">
              <button className="genre-button">POP</button>
              <button className="genre-button">Rock</button>
              <button className="genre-button">Melody</button>
              <button className="genre-button">LoFi</button>
              <button className="genre-button">Jazz</button>
            </div>
          </div>
          <div className="new-feature">
            <button className="new-feature-button">Lyrics</button> {/* New feature: Lyrics */}
          </div>
        </div>
        <div className="music-library">
          <div className="music-library-header">Your Library</div>
          <div className="music-item">
            <div className="music-item-name">One Love</div>
            <div className="music-item-info">3:45</div>
          </div>
          {/* Add more music items here */}
        </div>
      </div>
    </div>
  );
};

export default PrivateRoom;
