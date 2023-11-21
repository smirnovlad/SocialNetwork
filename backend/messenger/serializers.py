import io

from rest_framework import serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['login', 'password', 'firstName', 'lastName', 'bornAt', 'homeTown']

class FriendsSerializer(serializers.Serializer):
    firstUser = serializers.IntegerField()
    secondUser = serializers.IntegerField()
