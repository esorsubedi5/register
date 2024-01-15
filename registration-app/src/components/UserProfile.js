import React, { useState, useEffect } from 'react';
import LogoutButton from './LogoutButton';
import UserDeleteButton from './UserDeleteButton';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    // Fetch user details when the component mounts
    fetch('/api/user/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch user details. Please try again.');
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateUser = () => {
    setIsUpdating(true);

    fetch('/api/user/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        setFormData({
          username: '',
          email: '',
          mobile: '',
          first_name: '',
          last_name: '',
        });
      })
      .catch((error) => {
        console.error('Error updating user details:', error);
        setError('Failed to update user details. Please try again.');
      })
      .finally(() => setIsUpdating(false));
  };

  const handleDeleteUser = () => {
    const confirmation = window.confirm(
      'Are you sure you want to delete your account? This action is irreversible.'
    );

    if (confirmation) {
      fetch('/api/user/delete/', {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          if (response.status === 204) {
            console.log('User successfully deleted.');
            localStorage.removeItem('token');
            window.location.href = '/login'; // Redirect to login page
          } else {
            console.error('Failed to delete user.');
          }
        })
        .catch((error) => console.error('Error deleting user:', error));
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <strong>Username:</strong> {user.username}
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>
      <div>
        <strong>Mobile:</strong> {user.mobile}
      </div>
      <div>
        <strong>First Name:</strong> {user.first_name}
      </div>
      <div>
        <strong>Last Name:</strong> {user.last_name}
      </div>
      <h3>Update Profile</h3>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Mobile:</label>
        <input
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleUpdateUser} disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update Profile'}
      </button>
      <br />
      <LogoutButton />
      <br />
      <UserDeleteButton onDelete={handleDeleteUser} />
    </div>
  );
};

export default UserProfile;
