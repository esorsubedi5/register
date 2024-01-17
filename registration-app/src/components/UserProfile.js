import React, { useState, useEffect} from "react";
import { Container, Card, Button, Form } from 'react-bootstrap';
import axios from "axios";

const BASE_URL = 'http://127.0.0.1:8000';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedData, setEditedData] = useState({
        username : '',
        email: '',
        mobile: '',
        first_name: '',
        last_name: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchUserData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/user/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setUserData(response.data)
                setEditedData(response.data);
            } catch (error) {
                setError('No User Detials.')

            }
        };
        fetchUserData();
        
    }, []);
    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `${BASE_URL}/api/user/`,
                editedData,
                {
                    headers: {
                        Authorization: `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            // Fetch updated user data after saving
            const response = await axios.get(`${BASE_URL}/api/user/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setUserData(response.data);
            setEditMode(false); // Exit edit mode
        } catch (error) {
            setError('Error updating user details.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

     return (
        <Container>
            <h2>User Profile</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {userData && (
                <Card>
                    <Card.Body>
                        {editMode ? (
                            <Form>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Username"
                                        name="username"
                                        value={editedData.username}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        value={editedData.email}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formMobile">
                                    <Form.Label>Mobile</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter mobile"
                                        name="mobile"
                                        value={editedData.mobile}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter first name"
                                        name="first_name"
                                        value={editedData.first_name}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter last name"
                                        name="last_name"
                                        value={editedData.last_name}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                            </Form>
                        ) : (
                            <>
                                <Card.Title>{userData.username}</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {userData.email}
                                    <br />
                                    <strong>Mobile:</strong> {userData.mobile}
                                    <br />
                                    <strong>First Name:</strong> {userData.first_name}
                                    <br />
                                    <strong>Last Name:</strong> {userData.last_name}
                                </Card.Text>
                            </>
                        )}

                        {editMode ? (
                            <Button variant="primary" onClick={handleSaveClick}>
                                Save
                            </Button>
                        ) : (
                            <Button variant="primary" onClick={handleEditClick}>
                                Edit Profile
                            </Button>
                        )}
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default UserProfile;