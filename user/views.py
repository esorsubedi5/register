from urllib import response
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.generics import DestroyAPIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import login
from .serializers import UserLoginSerializer, UserRegisterSerializer, UserViewSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth import logout

UserModel = get_user_model()


class UserRegisterView(APIView):
    serializer_class = UserRegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response ({
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'mobile': user.mobile,
            'first_name': user.first_name,
            'last_name': user.last_name,
        }, status=status.HTTP_201_CREATED)

class UserLoginView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # Log the user in
        login(request, user)

        # Generate or get the user's token
        token, created = Token.objects.get_or_create(user=user)

        # Return the user and token in the response
        return Response({
            'user_id': user.id,
            'username': user.username,
            'email': user.email,
            'token': token.key,
        }, status=status.HTTP_200_OK)

class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = UserViewSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, *args, **kwargs):
        user = request.user
        serializer = UserRegisterSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user  # The authenticated user

        # Ensure that the authenticated user can only delete their own account
        if user:
            user.delete()
            return Response({'detail': 'User successfully deleted.'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(
                {'detail': 'You do not have permission to delete this user.'},
                status=status.HTTP_403_FORBIDDEN
            )

class UserLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        # Delete the user's token to perform a logout
        Token.objects.filter(user=request.user).delete()

        # Log the user out
        logout(request)

        return Response({'detail': 'User successfully logged out.'}, status=status.HTTP_200_OK)