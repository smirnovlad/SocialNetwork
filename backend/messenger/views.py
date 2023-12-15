from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .generator import generate
from rest_framework import generics, mixins
from .models import User, Message, Feedback, Chat
from .serializers import UserSerializer, MessageSerializer, FeedbackSerializer, ChatSerializer


# Create your views here.

class CustomInstanceAPIViews(mixins.CreateModelMixin,
                     generics.RetrieveUpdateDestroyAPIView):
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserInstanceAPIViews(CustomInstanceAPIViews):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (IsAuthenticated,)


class MessageInstanceAPIViews(CustomInstanceAPIViews):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)


class ChatInstanceAPIViews(CustomInstanceAPIViews):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,)


class FeedbackInstanceAPIViews(CustomInstanceAPIViews):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

class UserAPIViews(mixins.ListModelMixin, UserInstanceAPIViews):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        generate()
        return self.list(request, *args, **kwargs)