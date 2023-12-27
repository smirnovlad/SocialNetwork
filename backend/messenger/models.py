from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    bornAt = models.DateField()
    homeTown = models.CharField(max_length=30)
    avatar = models.ImageField(upload_to="uploads/avatars/", default="uploads/avatars/default_avatar.png")
    friends = models.ManyToManyField("self", symmetrical=False, blank=True)
    REQUIRED_FIELDS = ['first_name', 'last_name', 'bornAt', 'homeTown']

    @property
    def friendlist(self):
        # Watch for large querysets: it loads everything in memory
        return list(self.friends.all())

    def save(self, *args, **kwargs):
        if not self.avatar:
            self.avatar = "uploads/avatars/default_avatar.png"
        super(User, self).save(*args, **kwargs)

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
        return f"Sender login: {self.sender.username}, receiver login: {self.receiver.username}, message: {self.text}"

class Feedback(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=10000)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sender login: {self.sender.username}, message: {self.text}"
