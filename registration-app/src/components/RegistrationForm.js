import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    confirm_email: '',
    mobile: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationErrors, setRegistrationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/api/register/`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('User registered successfully:', response.data);
      setRegistrationSuccess(true);
      // Handle success
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle error
      if (error.response) {
        console.error('Response data:', error.response.data);
        setRegistrationErrors(error.response.data);
      } else {
        console.error('No response from the server.');
      }
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      // Wait for a short time and then redirect to login
      const redirectTimer = setTimeout(() => {
        navigate('/login');
      }, 2000); // Adjust the time as needed

      // Clear the timer when the component unmounts
      return () => clearTimeout(redirectTimer);
    }
  }, [registrationSuccess, navigate]);

  return (
    <Container>
      {registrationSuccess ? (
        <Alert variant="success">
          <p>Registration Successful! Redirecting to Login...</p>
        </Alert>
      ) : (
        <Container>
          <h2>Registration Form</h2>
          <Form onSubmit={handleSubmit}>
            {Object.keys(formData).map((fieldName, index) => (
              <Form.Group controlId={`form${fieldName}`} key={index}>
                <Form.Label>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</Form.Label>
                <Form.Control
                  type={fieldName.includes('password') ? 'password' : 'text'}
                  placeholder={`Enter ${fieldName}`}
                  name={fieldName}
                  value={formData[fieldName]}
                  onChange={handleChange}
                />
                {registrationErrors[fieldName] && (
                  <Alert variant="danger">
                    <p>{registrationErrors[fieldName]}</p>
                  </Alert>
                )}
              </Form.Group>
            ))}
            {registrationErrors.non_field_errors && (
              <Alert variant="danger">
                <ul>
                  {registrationErrors.non_field_errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            )}
            <Button variant="success" type="submit">
              Register
            </Button>
          </Form>
        </Container>
      )}
    </Container>
  );
};

export default RegistrationForm;
