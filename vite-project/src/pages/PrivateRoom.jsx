import React from 'react';
import './PrivateRoom.css';

const PrivateRoom = () => {
  return (
    <div className="private-room-container">
      <div className="music-player">
        <h2>PrivateRoom Music Player</h2>
        <p>Now Playing: Private Song</p>
        <div className="controls">
          <button>⏮</button>
          <button>⏯</button>
          <button>⏭</button>
        </div>
        <div className="genres">
          <button>POP</button>
          <button>Rock</button>
          <button>Melody</button>
          <button>LoFi</button>
          <button>Jazz</button>
        </div>
      </div>
    </div>
  );
};

export default PrivateRoom;
