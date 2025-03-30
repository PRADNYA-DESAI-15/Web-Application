from rest_framework import serializers
from .models import UploadedFile, UserProfile, Address
from rest_framework import serializers
from django.contrib.auth.models import User



class UploadedFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UploadedFile
        fields = ['id', 'file', 'upload_date']


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'city', 'state', 'zip_code']

class UserProfileSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)

    class Meta:
        model = UserProfile
        fields = ['phone', 'addresses']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    addresses = AddressSerializer(many=True, read_only=True)
    phone = serializers.CharField(source='userprofile.phone', allow_blank=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'profile', 'addresses', 'phone']

class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']


