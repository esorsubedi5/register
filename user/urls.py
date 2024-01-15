from django.urls import path
from .views import (
    UserLoginView,
    UserRegisterView,
    UserView,
    UserDeleteView,
    UserLogoutView,
)

app_name = 'user'

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('user/', UserView.as_view(), name='user'),
    path('user/delete/', UserDeleteView.as_view(), name='user-delete'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]