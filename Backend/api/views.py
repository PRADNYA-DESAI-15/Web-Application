from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from rest_framework import generics, permissions
from rest_framework.parsers import MultiPartParser, FormParser
from .models import UploadedFile
from .serializers import UploadedFileSerializer
from django.http import JsonResponse
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .models import UserProfile, Address
from .serializers import UserSerializer, UserUpdateSerializer, AddressSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        return Response({'message': 'User registered successfully'}, status=201)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=400)

        user = authenticate(username=user.username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username': user.username
            })
        return Response({'error': 'Invalid credentials'}, status=400)


class FileUploadView(generics.CreateAPIView):
    queryset = UploadedFile.objects.all()
    serializer_class = UploadedFileSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FileListView(generics.ListAPIView):
    queryset = UploadedFile.objects.all()
    serializer_class = UploadedFileSerializer
    permission_classes = [permissions.IsAuthenticated]



def api_home(request):
    return JsonResponse({"message": "Welcome to the API", "endpoints": [
        "/api/register/",
        "/api/login/",
        "/api/upload/",
        "/api/files/"
    ]})



@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    # Total files uploaded
    total_files = UploadedFile.objects.count()

    # Breakdown of file types
    file_types = UploadedFile.objects.values('file').annotate(count=Count('id'))
    file_type_summary = {}
    for item in file_types:
        ext = item['file'].split('.')[-1].upper()
        file_type_summary[ext] = file_type_summary.get(ext, 0) + item['count']

    # Files uploaded by each user
    files_by_user = UploadedFile.objects.values('user__username').annotate(count=Count('id'))

    return JsonResponse({
        "total_files": total_files,
        "file_type_breakdown": file_type_summary,
        "files_per_user": list(files_by_user)
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_username(request):
    user = request.user
    serializer = UserUpdateSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_phone(request):
    user = request.user
    profile, created = UserProfile.objects.get_or_create(user=user)  # Ensure profile exists
    phone = request.data.get("phone")

    if phone:
        profile.phone = phone
        profile.save()
        return Response({"message": "Phone number updated successfully!"}, status=status.HTTP_200_OK)

    return Response({"error": "Phone number is required"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_address(request):
    user = request.user
    street = request.data.get("street")
    city = request.data.get("city")
    state = request.data.get("state")
    zip_code = request.data.get("zip_code")

    if street and city and state and zip_code:
        Address.objects.create(user=user, street=street, city=city, state=state, zip_code=zip_code)
        return Response({"message": "Address added successfully!"}, status=status.HTTP_201_CREATED)

    return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def manage_address(request):
    if request.method == 'POST':
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        address_id = request.data.get("id")
        Address.objects.filter(id=address_id, user=request.user).delete()
        return Response({"message": "Address deleted"})
