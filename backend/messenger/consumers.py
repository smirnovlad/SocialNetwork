import json

from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Message
from .serializers import MessageSerializer

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