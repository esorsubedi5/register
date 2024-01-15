import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    // Send a POST request to the logout endpoint
    fetch('/api/logout/', {
      method: 'POST',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle successful logout response
        // Clear user token and redirect to the login page
        localStorage.removeItem('token');
        window.location.href = '/login'; // Change the URL to your login page
      })
      .catch((error) => console.error('Error logging out:', error));
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
