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

def encode():
    model = UserModel(login='programmer', password='thorup')
    modelSer = UserSerializer(model)
    json = JSONRenderer().render(modelSer.data)

def decode():
    stream = io.BytesIO(b'{"login": "some_login", "password": "easy_pass"}')
    data = JSONParser().parse(stream)
    serializer = UserSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    print(serializer.validated_data)