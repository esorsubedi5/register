import React from 'react';

const UserDeleteButton = () => {
  const handleDelete = () => {
    // Send a DELETE request to the delete user endpoint
    fetch('/api/user/delete/', {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => {
        if (response.status === 204) {
          console.log('User successfully deleted.');
          // Redirect to the login page or any other desired page after deletion
          window.location.href = '/login'; // Change the URL to your login page
        } else {
          console.error('Failed to delete user.');
        }
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <button onClick={handleDelete}>
      Delete Account
    </button>
  );
};

export default UserDeleteButton;
