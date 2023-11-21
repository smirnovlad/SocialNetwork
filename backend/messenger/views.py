from django.forms import model_to_dict
from django.shortcuts import render
from django.http import HttpResponse
from .generator import generate
from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

class UserListAPIViews(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserUpdateAPIViews(generics.UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer