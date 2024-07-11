import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PublicRoom from './pages/PublicRoom';
import PrivateRoom from './pages/PrivateRoom'; // Import PrivateRoom
import Navbar from './components/navbar';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import GeneratedRoom from './pages/GeneratedRoom';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in when the app loads
        axios.get('/check-auth')
            .then(response => {
                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
                    setUser(response.data.user);
                }
            })
            .catch(error => {
                console.log('Error checking auth status', error);
            });
    }, []);

    const handleLogout = () => {
        axios.post('/logout')
            .then(() => {
                setIsAuthenticated(false);
                setUser(null);
                navigate('/');
            })
            .catch(error => {
                console.log('Error during logout', error);
            });
    };

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} user={user} />
            <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
            <Routes>
                <Route path='/' element={<Home isAuthenticated={isAuthenticated} />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/Login' element={<Login setIsAuthenticated={setIsAuthenticated} setUser={setUser} />} />
                <Route path='/PublicRoom' element={<PublicRoom />} />
                <Route path='/PrivateRoom' element={<PrivateRoom />} /> {/* Add PrivateRoom route */}
                <Route path="/PrivateRoom/:roomCode" element={<GeneratedRoom />} />
            </Routes>
        </>
    );
}

export default App;
