import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import background1 from './background1.png';
import background2 from './background2.png'; // Ensure the correct path
import './Home.css'; // Ensure this imports your CSS file

export default function Home({ isAuthenticated }) {
  const navigate = useNavigate();

  const handlePrivateRoomClick = () => {
    if (!isAuthenticated) {
      navigate('/Login');
    } else {
      // Navigate to the private room page if authenticated
      // navigate('/PrivateRoom'); // Uncomment and modify if you have a private room route
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
          <button className="button_private" onClick={handlePrivateRoomClick}>Private Cube</button>
          <Link to="/PublicRoom">
            <button className="button_public">Public Cube</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
