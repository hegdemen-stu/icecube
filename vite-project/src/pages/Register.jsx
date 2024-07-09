import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import './Register.css';
import backgroundImage from '../assets/backgroundImage.jpg'; // Adjust the path to your image file

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const RegisterUser = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;
        try {
            const { data } = await axios.post('/register', {
                name, email, password
            });
            if (data.error) {
                toast.error(data.error);
            } else {
                setData({ name: '', email: '', password: '' });
                toast.success('Registration Successful...welcome');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="register_body">
            <div className="register_content">
                <form className="register_form" onSubmit={RegisterUser}>
                    <label className="register_label">Name</label>
                    <input 
                        className="register_input" 
                        type='text' 
                        placeholder='Enter name...' 
                        value={data.name} 
                        onChange={(e) => setData({ ...data, name: e.target.value })} 
                    />
                    <label className="register_label">Email</label>
                    <input 
                        className="register_input" 
                        type='email' 
                        placeholder='Enter Email...' 
                        value={data.email} 
                        onChange={(e) => setData({ ...data, email: e.target.value })} 
                    />
                    <label className="register_label">Password</label>
                    <input 
                        className="register_input" 
                        type='password' 
                        placeholder='Enter Password...' 
                        value={data.password} 
                        onChange={(e) => setData({ ...data, password: e.target.value })} 
                    />
                    <button className="register_button" type='submit'>Submit</button>
                </form>
            </div>
            <img className="register_background" src={backgroundImage} alt="Background" />
        </div>
    );
}
