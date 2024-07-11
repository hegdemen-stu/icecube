import React, { useState } from 'react';
import './PrivateRoom.css';

const PrivateRoom = () => {
  const [isJoinFormVisible, setJoinFormVisible] = useState(false);

  const handleJoinButtonClick = () => {
    setJoinFormVisible(!isJoinFormVisible);
  };

  return (
    <div className="private-room-container">
      <div className="room-actions">
        <div className="join-room">
          <button className="join-room-button" onClick={handleJoinButtonClick}>
            Join Room
          </button>
          {isJoinFormVisible && (
            <div className="join-room-form glassmorphic-dropdown">
              <input type="text" placeholder="Paste/Type Room Code" />
              <button className="submit-room-code">Submit</button>
            </div>
          )}
        </div>
        <button className="create-room-button">Create Room</button>
      </div>
    </div>
  );
};

export default PrivateRoom;
