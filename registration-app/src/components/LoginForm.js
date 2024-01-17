import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const LoginForm = ({ setIsLoggedIn}) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/login/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Handle success, redirect user to home page or perform other actions
      console.log('User logged in successfully', response.data);
      localStorage.setItem('token', response.data.token);
      setLoginSuccess(true);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed:', error);
      setLoginError('Invalid username or password. Please try again.');
    }
  };
  useEffect(() => {
    if (loginSuccess){
        const redirectTimer = setTimeout(() => {
            navigate('/');
        }, 2000);

        return () => clearTimeout(redirectTimer);
    }
  }, [loginSuccess, navigate])

  return (
    <Container>
        {loginSuccess ? ( <Alert variant="success">
        <p>Registration Successful! Redirecting to HomePage...</p>
      </Alert>
    ) : (
        <>
      <h2>Login Form</h2>
      {loginError && <Alert variant="danger">{loginError}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      </>
      )}
    </Container>
  );
};

export default LoginForm;
