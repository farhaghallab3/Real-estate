from drf_spectacular.utils import extend_schema
from rest_framework import permissions, serializers, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView


class EstateFlowTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "role": self.user.role,
        }
        return data


class LoginUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField()
    role = serializers.CharField()


class TokenObtainPairResponseSerializer(serializers.Serializer):
    """Documentation-only: describes the actual login response shape."""

    access = serializers.CharField()
    refresh = serializers.CharField()
    user = LoginUserSerializer()


@extend_schema(responses=TokenObtainPairResponseSerializer)
class LoginView(TokenObtainPairView):
    serializer_class = EstateFlowTokenObtainPairSerializer


class LogoutRequestSerializer(serializers.Serializer):
    refresh = serializers.CharField()


@extend_schema(request=LogoutRequestSerializer, responses={205: None, 400: None})
class LogoutView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        refresh = request.data.get("refresh")
        if not refresh:
            return Response(
                {"refresh": "This field is required."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            RefreshToken(refresh).blacklist()
        except TokenError:
            return Response(
                {"refresh": "Invalid or expired token."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(status=status.HTTP_205_RESET_CONTENT)
