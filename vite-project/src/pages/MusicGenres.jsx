// src/pages/MusicGenres.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const genres = ['POP', 'Rock', 'Melody', 'LoFi', 'Jazz'];

const MusicGenres = ({ setCurrentGenre }) => {
  return (
    <div>
      <h3>Music Genres</h3>
      <ul>
        {genres.map((genre) => (
          <li key={genre}>
            <Link to="#" onClick={() => setCurrentGenre(genre)}>
              {genre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicGenres;
