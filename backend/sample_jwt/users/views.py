from rest_framework.views import APIView #base class for creating custom API endpoints
from rest_framework.response import Response #used to send data back to client 
from rest_framework import status #for status codes 
from .serializers import RegisterSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView#APIview handles login,rtn access&refresh token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer#validates username/password generates access + refresh tokens for login
from rest_framework import generics, permissions, parsers, viewsets, filters
from django.contrib.auth import get_user_model


User = get_user_model()

class RegisterView(APIView):#API view handle user registration requests
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()#automatically calls the serializer’s create() method
            message = {'message': 'User Registered SuccessFully'}
            return Response(message, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomTokenObtainPairView(TokenObtainPairView):#login
    serializer_class = TokenObtainPairSerializer
   

class UserProfileViews(generics.RetrieveUpdateAPIView):#generic CRUD
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated] 
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]# it read (parse) the incoming request data
    
    def get_object(self):
        return self.request.user

class UserAdminViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email']

class LogoutView(APIView):
    def post(self, request):
        message = {'message': 'Logged Out'}
        return Response(message, status=status.HTTP_200_OK)
        