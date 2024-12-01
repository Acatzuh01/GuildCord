# accounts/urls.py
from django.urls import path
from .views import (
    UserRegisterView,
    UserLoginView,
    UserProfileView,
    PasswordResetView,
    PasswordResetConfirmView,  # Fixed the typo here
)

urlpatterns = [
    path('register/', UserRegisterView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('password_reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password_reset_confirm/<uidb64>/<token>/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]