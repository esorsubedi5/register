import React, { useEffect, useState } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import LogoutPage from './components/LogoutPage';

const App = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [setIsLoggedIn]);

  const handleRegisterClick = () => {
    setShowRegistration(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Router>
      <Container>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/">
            {'Register APP'}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              {isLoggedIn ? (
                <>
                  <Link to="/profile">
                    <Button variant="primary" className="mx-2">
                      User Profile
                    </Button>
                  </Link>
                  <Button variant="outline-light" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/register">
                  <Button variant="success" className="mx-2" onClick={handleRegisterClick}>
                    Register
                  </Button>
                </Link>
              )}
              {isLoggedIn || (
                <Link to="/login">
                  <Button variant="outline-light" className="mr-4">
                    Login
                  </Button>
                </Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <h1>Welcome to App</h1>
              ) : (
                <p>Please login or register to access the content.</p>
              )
            }
          />
          <Route path="/register" element={showRegistration && <RegistrationForm />} />
          <Route
            path="/login"
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/logout" element={<LogoutPage />}/>
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
