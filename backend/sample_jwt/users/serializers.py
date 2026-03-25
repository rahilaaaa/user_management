from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile_image', 'is_staff')
        read_only_fields = ('id', 'is_staff')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True, required = True, validators=[validate_password])
    password2 = serializers.CharField(write_only = True, required = True)
    class Meta:
        model = User
        fields = ("username", "password", "password2", "email")
    def validate(self, attrs):
        attrs['username'] = attrs['username'].strip()
        attrs['email'] = attrs['email'].strip()
        if attrs['password'] != attrs['password2']:
            messege = {"password2": "password field do not match"}
            raise serializers.ValidationError(messege)       
        return attrs
    
    def create(self, validated_data):
        print("validated data...", validated_data)
        validated_data.pop("password2")
        user = User.objects.create_user(
            username = validated_data['username'],
            email = validated_data['email'],
            password= validated_data['password']
        )
        
        print("user....", user)
        return user
