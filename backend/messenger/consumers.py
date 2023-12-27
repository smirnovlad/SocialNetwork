import json

from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message, Feedback
from .serializers import MessageSerializer, FeedbackSerializer
import logging
class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.chat_id = self.scope['url_route']['kwargs']['chat_id']
        self.chat_group_name = f"chat_{self.chat_id}"

        print("Chat consumer. Connect to room: ", self.chat_group_name, ". Channel name: ", self.channel_name)

        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.chat_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'chat.message',
                'message': message
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))

@receiver(post_save, sender=Message)
def send_message_update(sender, instance, **kwargs):
    chat_group_name = f"chat_{instance.chat.id}"
    print("Chat: ", instance.chat, "; Group name: ", chat_group_name, "; Message: ", instance.text)

    serializer = MessageSerializer(instance)

    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        chat_group_name,
        {
            'type': 'chat_message',
            'message': serializer.data
        }
    )

class FeedbackConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.group_name = "feedback"

        print("Chat consumer. Connect to room: ", self.group_name, ". Channel name: ", self.channel_name)

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        review = text_data_json['review']

        await self.channel_layer.group_send(
            self.group_name,
            {
                'type': 'feedback_review',
                'review': review
            }
        )

    async def feedback_review(self, event):
        review = event['review']

        await self.send(text_data=json.dumps({
            'review': review
        }))

@receiver(post_save, sender=Feedback)
def send_feedback_update(sender, instance, **kwargs):
    group_name = "feedback"
    print("Chat: ", instance.text, "; Group name: ", group_name, "; Review: ", instance.text)

    serializer = FeedbackSerializer(instance)
    review = serializer.data
    review['name'] = instance.sender.first_name + " " + instance.sender.last_name

    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            'type': 'feedback_review',
            'review': review
        }
    )