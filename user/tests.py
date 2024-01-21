from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class UserAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            'username': 'testuser',
            'email': 'testuser@example.com',
            'mobile': '1234567890',
            'first_name': 'Test',
            'last_name': 'User',
            'password': 'testuserpassword',
        }
        self.login_data = {
            'username': 'existinguser',
            'password': '2006Italy@2010Spain',
        }
        # Creating a user for testing purposes
        self.user = UserModel.objects.create_user(
            username='existinguser',
            email='existinguser@example.com',
            mobile='9876543210',
            password='2006Italy@2010Spain'
        )

    def print_error_response(self, response):
        if response.status_code != status.HTTP_200_OK:
            print(response.content)

    def test_user_registration(self):
        self.user_data['confirm_email'] = self.user_data['email']
        self.user_data['confirm_password'] = self.user_data['password']
        response = self.client.post('/api/register/', self.user_data, format='json')
        self.print_error_response(response)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_user_login(self):
        response = self.client.post('/api/login/', self.login_data, format='json')
        if response.status_code != status.HTTP_200_OK:
            print("Request data:", self.login_data)
            print("Response content:", response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_details(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get('/api/user/', format='json')
        self.print_error_response(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], self.user.username)

    def test_user_update(self):
        self.client.force_authenticate(user=self.user)
        update_data = {'first_name': 'Updated'}
        response = self.client.put('/api/user/', update_data, format='json')
        self.print_error_response(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['first_name'], 'Updated')

    def test_user_logout(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.post('/api/logout/', format='json')
        self.print_error_response(response)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_user_deletion(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.delete('/api/user/delete/', follow=True, format='json')
        expected_status_code = status.HTTP_204_NO_CONTENT  
        self.assertEqual(response.status_code, expected_status_code)
