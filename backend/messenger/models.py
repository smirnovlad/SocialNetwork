from django.db import models

# Create your models here.
class Users(models.Model):
    login = models.CharField(max_length=15)
    password = models.CharField(max_length=50)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    bornAt = models.DateField()
    homeTown = models.CharField(max_length=30)
    avatarUrl = models.URLField(max_length=200)

    def __str__(self):
        return f"Login: {self.login}, first name: {self.firstName}, last name: {self.lastName}"

class Friends(models.Model):
    firstUserId = models.IntegerField()
    secondUserId = models.IntegerField()

class Messages(models.Model):
    senderId = models.IntegerField()
    receiverId = models.IntegerField()
    message = models.CharField(max_length=10000)
    timestamp = models.DateTimeField(auto_created=True)

    def __str__(self):
        return f"Sender id: {self.senderId}, receiver id: {self.receiverId}, message: {self.message}"

class Feedback(models.Model):
    senderId = models.IntegerField()
    message = models.CharField(max_length=10000)
    timestamp = models.DateTimeField(auto_created=True)

    def __str__(self):
        return f"Sender id: {self.senderId}, message: {self.message}"