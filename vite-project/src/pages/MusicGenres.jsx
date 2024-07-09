// src/pages/MusicGenres.jsx
import React from 'react';

const MusicGenres = ({ setCurrentGenre }) => {
  return (
    <div>
      <h3>Music Genres</h3>
      <ul>
        <li onClick={() => setCurrentGenre('POP')}>POP</li>
        <li onClick={() => setCurrentGenre('Rock')}>Rock</li>
        <li onClick={() => setCurrentGenre('Melody')}>Melody</li>
        <li onClick={() => setCurrentGenre('LoFi')}>LoFi</li>
        <li onClick={() => setCurrentGenre('Jazz')}>Jazz</li>
      </ul>
    </div>
  );
};

export default MusicGenres;
