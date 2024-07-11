import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-hot-toast';
import './Login.css'; // Import the CSS file
import backgroundImage from '../assets/backgroundImage.jpg'; // Adjust the path to your image file

export default function Login({ setIsAuthenticated, setUser }) {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const response = await axios.post('/login', {
                email, password
            });
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({});
                setIsAuthenticated(true);
                setUser(response.data.user);
                toast.success('Login Successful...welcome');
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="login_body">
            <div className="login_content">
                <form onSubmit={loginUser} className="login_form">
                    <label className="login_label">Email</label>
                    <input 
                        type='email' 
                        placeholder='Enter Email...' 
                        value={data.email} 
                        onChange={(e) => setData({ ...data, email: e.target.value })} 
                        className="login_input"
                    />
                    <label className="login_label">Password</label>
                    <input 
                        type='password' 
                        placeholder='Enter Password...' 
                        value={data.password} 
                        onChange={(e) => setData({ ...data, password: e.target.value })} 
                        className="login_input"
                    />
                    <button type='submit' className="login_button">Login</button>
                </form>
                <p className="register_prompt">
                    Don't have an Account? <Link to="/register" className="register_link">Register now!</Link>
                </p>
            </div>
            <div className="login_background">
                <img src={backgroundImage} alt="Background" className="background_image" />
            </div>
        </div>
    );
}
