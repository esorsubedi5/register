// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import UserProfile from './components/UserProfile';
import LogoutButton from './components/LogoutButton';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    // Clear user token
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Redirect to login page after logout
    return <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <Link to="/dashboard">User Profile</Link>
                </li>
                <li>
                  <LogoutButton onLogout={handleLogout} />
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/dashboard" element={isLoggedIn ? <UserProfile /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
