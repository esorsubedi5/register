import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_email: '',
    confirm_password: '',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  // Set your base URL
  const baseURL = 'http://localhost:8000/';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}api/register/`, formData);
      console.log('User registered successfully:', response.data);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error('Registration failed:', error);

      // Check if error.response is defined before accessing its properties
      if (error.response) {
        console.error('Response data:', error.response.data);
      } else {
        console.error('No response from the server.');
      }
    }
  };

  // Redirect to login page when registration is successful
  useEffect(() => {
    if (registrationSuccess) {
      navigate('/login');
    }
  }, [registrationSuccess, navigate]);

  if (registrationSuccess) {
    return <div>Registration Successful! Redirecting to Login...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Mobile:
        <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} />
      </label>
      <br />
      <label>
        First Name:
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Last Name:
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      <br />
      <label>
        Confirm Email:
        <input type="email" name="confirm_email" value={formData.confirm_email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Confirm Password:
        <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
