from django.shortcuts import render
from django.http import HttpResponse
from .generator import generate
from rest_framework import generics, mixins
from .models import User, Friends, Message, Feedback
from .serializers import UserSerializer, FriendsSerializer, MessageSerializer, FeedbackSerializer


# Create your views here.

class CustomAPIViews(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.RetrieveUpdateDestroyAPIView):
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserAPIViews(CustomAPIViews):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class FriendsAPIViews(CustomAPIViews):
    queryset = Friends.objects.all()
    serializer_class = FriendsSerializer


class MessageAPIViews(CustomAPIViews):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class FeedbackAPIViews(CustomAPIViews):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
