import { Link } from "react-router-dom";
import logo from './icecube.png'; // Import the image from the correct relative path
import './navbar.css'; // Import the CSS file

const Navbar = ({ isAuthenticated, onLogout, user }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Home" className="icecube" />
      </Link>
      <div className="glass_morphic">
        <div className="nav-buttons">
          {isAuthenticated ? (
            <>
              <span className="nav-user">{user?.name}</span>
              <button className="nav-button" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/Register" className="nav-link">
                <button className="nav-button">Register</button>
              </Link>
              <Link to="/Login" className="nav-link">
                <button className="nav-button">Login</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
