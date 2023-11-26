from django.shortcuts import render
from django.http import HttpResponse
from .generator import generate
from rest_framework import generics, mixins
from .models import User, Message, Feedback, Chat
from .serializers import UserSerializer, MessageSerializer, FeedbackSerializer, ChatSerializer


# Create your views here.

class CustomAPIViews(mixins.ListModelMixin,
                     mixins.CreateModelMixin,
                     generics.RetrieveUpdateDestroyAPIView):
    def get(self, request, *args, **kwargs):
        generate()
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserAPIViews(CustomAPIViews):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class MessageAPIViews(CustomAPIViews):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class ChatAPIViews(CustomAPIViews):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer


class FeedbackAPIViews(CustomAPIViews):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
