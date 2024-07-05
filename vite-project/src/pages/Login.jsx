import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-hot-toast';

export default function Login({ setIsAuthenticated }) {
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
                toast.success('Login Successful...welcome');
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={loginUser}>
                <label>Email</label>
                <input 
                    type='email' 
                    placeholder='Enter Email...' 
                    value={data.email} 
                    onChange={(e) => setData({ ...data, email: e.target.value })} 
                />
                <label>Password</label>
                <input 
                    type='password' 
                    placeholder='Enter Password...' 
                    value={data.password} 
                    onChange={(e) => setData({ ...data, password: e.target.value })} 
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}
