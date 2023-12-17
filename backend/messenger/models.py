from django.db import models
from django.contrib.auth.models import AbstractUser

from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .consumers import ChatConsumer

# Create your models here.
class User(AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    bornAt = models.DateField()
    homeTown = models.CharField(max_length=30)
    avatar = models.ImageField(upload_to="uploads/avatars/", blank=True)
    friends = models.ManyToManyField("self", symmetrical=False, blank=True)
    REQUIRED_FIELDS = ['first_name', 'last_name', 'bornAt', 'homeTown', 'friends']

    @property
    def friendlist(self):
        # Watch for large querysets: it loads everything in memory
        return list(self.friends.all())

    def __str__(self):
        return f"Username: {self.username}, first name: {self.first_name}, last name: {self.last_name}"


class Chat(models.Model):
    firstUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chat_first_user")
    secondUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name="chat_second_user")


class Message(models.Model):
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name="message_chat")
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="message_sender")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="message_receiver")
    text = models.CharField(max_length=10000)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sender login: {self.sender.login}, receiver login: {self.receiver.login}, message: {self.text}"

def get_connected_clients_in_group(group_name):
    channel_layer = get_channel_layer()
    connected_clients = async_to_sync(channel_layer.group_channels)(group_name)
    return connected_clients

@receiver(post_save, sender=Message)
def send_message_update(sender, instance, **kwargs):
    channel_layer = get_channel_layer()
    print("chat: ", instance.chat)
    chat_group_name = f"chat_{instance.chat.id}"
    print("group name: ", chat_group_name)
    print("message: ", instance.text)

    channel_layer = get_channel_layer()

    async_to_sync(channel_layer.group_send)(
        chat_group_name,
        {
            'type': 'chat_message',
            'message': instance.text
        }
    )


class Feedback(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=10000)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sender login: {self.sender.login}, message: {self.message}"
