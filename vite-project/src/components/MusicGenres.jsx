// src/components/MusicGenres.js
import React from 'react';
import { Link } from 'react-router-dom';

function MusicGenres() {
  const genres = [
    { name: 'POP', path: '/public-room?genre=pop' },
    { name: 'Rock', path: '/public-room?genre=rock' },
    { name: 'Melody', path: '/public-room?genre=melody' },
    { name: 'LoFi', path: '/public-room?genre=lofi' },
    { name: 'Jazz', path: '/public-room?genre=jazz' }
  ];

  return (
    <div>
      <h2>Music Genres</h2>
      <ul>
        {genres.map((genre) => (
          <li key={genre.name}>
            <Link to={genre.path}>{genre.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MusicGenres;
