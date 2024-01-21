import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LogoutPage = () => {
  return (
    <Container>
      <h2>Logout Page</h2>
      <p>You have been successfully logged out.</p>
      <div>
        <Link to="/">
          <Button variant="primary" className="mr-2">
            Go to Homepage
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="success">Login Again</Button>
        </Link>
      </div>
    </Container>
  );
};

export default LogoutPage;
