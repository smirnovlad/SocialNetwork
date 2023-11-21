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

class MessengerAPIViews(APIView):
    def get(self, request):
        all = User.objects.all()
        values = all.values()
        return Response({'Data': [values]})

    def post(self, request):
        created = User.objects.create(
            login=request.data['login'],
            password=request.data['password'],
            firstName=request.data['firstName'],
            lastName=request.data['lastName'],
            bornAt=request.data['bornAt'],
            homeTown=request.data['homeTown'],
        )
        return Response({'post': model_to_dict(created, exclude=['avatar'])})
