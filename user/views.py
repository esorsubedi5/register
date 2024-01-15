from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout
from django.contrib.auth import get_user_model

from .serializers import UserLoginSerializer, UserRegisterSerializer, UserViewSerializer


UserModel = get_user_model()


class UserRegisterView(APIView):
    """
    API endpoint for user registration.
    """
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        """
        Handle POST request for user registration.

        Args:
            request: HTTP request object.
            *args: Variable-length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            JSON response with user details or validation errors.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        response_data = {
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'mobile': user.mobile,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }
        return Response(response_data, status=status.HTTP_201_CREATED)


class UserLoginView(APIView):
    """
    API endpoint for user login.
    """
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        """
        Handle POST request for user login.

        Args:
            request: HTTP request object.
            *args: Variable-length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            JSON response with user details and token or validation errors.
        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # Log the user in
        login(request, user)

        # Generate or get the user's token
        token, created = Token.objects.get_or_create(user=user)

        # Return the user and token in the response
        response_data = {
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'token': token.key,
        }
        return Response(response_data, status=status.HTTP_200_OK)


class UserView(APIView):
    """
    API endpoint for user details.
    """
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        """
        Handle GET request to retrieve user details.

        Args:
            request: HTTP request object.
            *args: Variable-length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            JSON response with user details.
        """
        serializer = UserViewSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        """
        Handle PUT request to update user details.

        Args:
            request: HTTP request object.
            *args: Variable-length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            JSON response with updated user details or validation errors.
        """
        user = request.user
        serializer = UserRegisterSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserDeleteView(APIView):
    """
    API endpoint for user deletion.
    """
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        """
        Handle DELETE request for user deletion.

        Args:
            request: HTTP request object.
            *args: Variable-length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            JSON response indicating success or permission error.
        """
        user = request.user
        if user:
            user.delete()
            return Response({'detail': 'User successfully deleted.'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(
                {'detail': 'You do not have permission to delete this user.'},
                status=status.HTTP_403_FORBIDDEN
            )

class UserLogoutView(APIView):
    """
    API endpoint for user logout.
    """
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        """
        Handle POST request for user logout.

        Args:
            request: HTTP request object.
            *args: Variable-length argument list.
            **kwargs: Arbitrary keyword arguments.

        Returns:
            JSON response indicating successful logout.
        """
        # Delete the user's token to perform a logout
        Token.objects.filter(user=request.user).delete()

        # Log the user out
        logout(request)

        return Response({'detail': 'User successfully logged out.'}, status=status.HTTP_200_OK)
