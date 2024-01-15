import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();

  // Set your base URL
  const baseURL = 'http://localhost:8000/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}api/login/`, formData);
      console.log('User logged in successfully:', response.data);

      
      navigate('/'); 
    } catch (error) {
      console.error('Login failed:', error);

      
      setLoginError('Invalid username or password.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Login</button>

      {loginError && <div style={{ color: 'red' }}>{loginError}</div>}
    </form>
  );
};

export default LoginForm;
