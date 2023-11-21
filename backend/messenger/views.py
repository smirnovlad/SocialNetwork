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

class UserAPIViews(APIView):
    def get(self, request):
        all = User.objects.all()
        return Response({'get': UserSerializer(all, many=True).data})

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response({'post': serializer.data})

    def put(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method put is not allowed"})

        try:
            instance = User.objects.get(pk=pk)
        except:
            return Response({"error": "Object is not exist"})

        serializer = UserSerializer(data=request.data, instance=instance)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'put': serializer.data})

    def delete(self, request, *args, **kwargs):
        pk = kwargs.get("pk", None)
        if not pk:
            return Response({"error": "Method put is not allowed"})

        try:
            instance = User.objects.get(pk=pk)
        except:
            return Response({"error": "Object is not exist"})

        instance.delete()
        return Response({'delete': "deleted object " + str(pk)})