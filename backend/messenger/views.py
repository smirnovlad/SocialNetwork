from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly

from .generator import generate
from rest_framework import generics, mixins
from .models import User, Message, Feedback, Chat
from .serializers import UserSerializer, MessageSerializer, FeedbackSerializer, ChatSerializer
from rest_framework.authtoken.models import Token
from django.db.models import Q

# Create your views here.

class CustomInstanceAPIViews(mixins.CreateModelMixin,
                     generics.RetrieveUpdateDestroyAPIView):
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class UserInstanceAPIViews(CustomInstanceAPIViews):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)


class MessageInstanceAPIViews(CustomInstanceAPIViews):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)

class MessageAPIViews(mixins.ListModelMixin, CustomInstanceAPIViews):
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        if not self.request.query_params:
            return Message.objects.filter(Q(sender=self.request.user.id) | Q(receiver=self.request.user.id)).order_by('timestamp')
        else:
            return Message.objects.filter(Q(chat=self.request.query_params['chat_id'])).order_by('timestamp')

class ChatInstanceAPIViews(CustomInstanceAPIViews):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,)

class ChatAPIViews(mixins.ListModelMixin, CustomInstanceAPIViews):
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        # token = request.META.get('HTTP_AUTHORIZATION').split()[1]
        # user_id = Token.objects.get(key=token).user_id
        return self.list(request, *args, **kwargs)

    def get_queryset(self):
        return Chat.objects.filter(Q(firstUser=self.request.user.id) | Q(secondUser=self.request.user.id))

class FeedbackInstanceAPIViews(CustomInstanceAPIViews):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

class FeedbackAPIViews(mixins.ListModelMixin, FeedbackInstanceAPIViews):
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class UserAPIViews(mixins.ListModelMixin, UserInstanceAPIViews):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)