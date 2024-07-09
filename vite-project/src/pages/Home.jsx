import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background1 from './background1.png';
import background2 from './background2.png';
import './Home.css';

export default function Home({ isAuthenticated }) {
  const navigate = useNavigate();

  const handlePrivateRoomClick = () => {
    if (!isAuthenticated) {
      navigate('/Login');
    } else {
      navigate('/PrivateRoom');
    }
  };

  return (
    <div className="home-container">
      <div className="background-layer">
        <img src={background1} alt="Background 1" className="bg1" />
        <img src={background2} alt="Background 2" className="bg2" />
      </div>
      <div className="content_text">
        <div className="huge-text">Unlock Your Music.</div>
        <div className="sub-text">Get Cube, Jam Out, Let Music Connect Us!</div>
        <div className="button_container_home">
          <Link to="/PrivateRoom">
          <button className="button_private" onClick={handlePrivateRoomClick}>Private Cube</button>
          </Link>
          <Link to="/PublicRoom">
            <button className="button_public">Public Cube</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
