from rest_framework import serializers
from django.contrib.auth import authenticate
from .models import CustomUser, Subject, Notes


# -------------------- USER SERIALIZERS --------------------

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'password']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            password=validated_data['password']
        )
        return user


class LoginSerializer(serializers.Serializer):  # ✅ THIS IS THE ONE DJANGO NEEDS
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password")
        if not user.is_active:
            raise serializers.ValidationError("User account is disabled")

        data['user'] = user
        return data


# -------------------- SUBJECT & NOTES SERIALIZERS --------------------

class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'name']


class NotesSerializer(serializers.ModelSerializer):
    uploader = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Notes
        fields = ['id', 'title', 'description', 'file', 'subject', 'uploader', 'uploaded_at']
        read_only_fields = ['uploader', 'uploaded_at']

