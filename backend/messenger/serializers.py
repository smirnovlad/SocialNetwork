import io

from rest_framework import serializers
from rest_framework.parsers import JSONParser
from rest_framework.renderers import JSONRenderer

from .models import User

class UserSerializer(serializers.Serializer):
    login = serializers.CharField(max_length=30)
    password = serializers.CharField(max_length=30)
    firstName = serializers.CharField(max_length=30)
    lastName = serializers.CharField(max_length=30)
    bornAt = serializers.DateField()
    homeTown = serializers.CharField(max_length=30)

    def create(self, validated_data):
        return User.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.login = validated_data.get('login', instance.login)
        instance.password = validated_data.get('password', instance.password)
        instance.firstName = validated_data.get('firstName', instance.firstName)
        instance.lastName = validated_data.get('lastName', instance.lastName)
        instance.bornAt = validated_data.get('bornAt', instance.bornAt)
        instance.homeTown = validated_data.get('homeTown', instance.homeTown)
        instance.save()
        return instance

class FriendsSerializer(serializers.Serializer):
    firstUser = serializers.IntegerField()
    secondUser = serializers.IntegerField()
