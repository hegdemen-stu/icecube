import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import PublicRoom from './pages/PublicRoom';
import Navbar from './components/navbar';
import ChatPublic from './pages/ChatPublic';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is already logged in when the app loads
        axios.get('/check-auth')
            .then(response => {
                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
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
                navigate('/');
            })
            .catch(error => {
                console.log('Error during logout', error);
            });
    };

    return (
        <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
            <Routes>
                <Route path='/' element={<Home isAuthenticated={isAuthenticated} />} />
                <Route path='/Register' element={<Register />} />
                <Route path='/Login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/PublicRoom' element={<PublicRoom />} />
                <Route path='/ChatPublic' element={<ChatPublic />} />
            </Routes>
        </>
    );
}

export default App;
