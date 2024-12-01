# accounts/views.py
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser   # Import your custom user model
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.urls import reverse
from django.utils.http import urlsafe_base64_decode

class UserRegisterView(generics.CreateAPIView):
    queryset = CustomUser .objects.all()  # Use CustomUser  instead of User
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

class UserLoginView(generics.GenericAPIView):
    permission_classes = (AllowAny,)
    
    def post(self, request, *args, **kwargs):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

# New User Profile View
class UserProfileView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
        })

# Password Reset Request View
class PasswordResetView(generics.GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        email = request.data.get("email")
        user = CustomUser .objects.filter(email=email).first()  # Use CustomUser  instead of User
        if user:
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            reset_link = request.build_absolute_uri(reverse('password_reset_confirm', kwargs={'uidb64': uid, 'token': token}))
            send_mail(
                'Password Reset',
                f'Click the link to reset your password: {reset_link}',
                'from@example.com',
                [email],
                fail_silently=False,
            )
        return Response({"detail": "Password reset link sent."}, status=status.HTTP_200_OK)

# Password Reset Confirmation View
class PasswordResetConfirmView(generics.GenericAPIView):
    permission_classes = (AllowAny,)

    def post(self, request, uidb64, token):
        try:
            user_id = force_bytes(urlsafe_base64_decode(uidb64))
            user = CustomUser .objects.get(pk=user_id)  # Use CustomUser  instead of User
        except (TypeError, ValueError, OverflowError, CustomUser .DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            new_password = request.data.get("new_password")
            user.set_password(new_password)
            user.save()
            return Response({"detail": "Password reset successfully."}, status=status.HTTP_200_OK)
        return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)