// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = event => {
    event.preventDefault();

    axios.post('/api/login', {
      username: username,
      password: password
    })
    .then(response => {
      console.log(response);
      // handle success
      if (response.data.status === 'success') {
        // Redirect to Home page
        navigate('/public-room-list');
      }
    })
    .catch(error => {
      console.log(error);
      // handle error
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Login;
