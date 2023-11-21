import io

from rest_framework import serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from .models import User

class UserModel:
    def __init__(self, login, password):
        self.login = login
        self.password = password

class UserSerializer(serializers.Serializer):
    login = serializers.CharField(max_length=30)
    password = serializers.CharField(max_length=30)
    firstName = serializers.CharField(max_length=30)
    lastName = serializers.CharField(max_length=30)
    bornAt = serializers.DateField(read_only=True)
    homeTown = serializers.CharField(max_length=30)

class FriendsSerializer(serializers.Serializer):
    firstUser = serializers.IntegerField()
    secondUser = serializers.IntegerField()
