from django.db import models


# Create your models here.
class User(models.Model):
    login = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=50)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    bornAt = models.DateField()
    homeTown = models.CharField(max_length=30)
    avatar = models.ImageField(upload_to="uploads/avatars/", blank=True)

    def __str__(self):
        return f"Login: {self.login}, first name: {self.firstName}, last name: {self.lastName}"


class Friends(models.Model):
    firstUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friends_first_user")
    secondUser = models.ForeignKey(User, on_delete=models.CASCADE, related_name="friends_second_user")

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


class Feedback(models.Model):
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=10000)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Sender login: {self.sender.login}, message: {self.message}"
