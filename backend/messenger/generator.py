import datetime
import random
import string
from .models import User, Message, Feedback, Chat
from django.db import connection
from random_username.generate import generate_username


def generate():
    user1 = User(username=generate_username()[0], password="qwerty123", first_name="Vlad", last_name="Smirnov",
                 bornAt=datetime.date(2000, 5, 9), homeTown="Moscow")
    print(f"user id: {user1.id}, {user1}")
    user1.save()
    print(f"user id: {user1.id}")

    user2 = User(username=generate_username()[0], password="password", first_name="Alexander", last_name="Ivanov",
                 bornAt=datetime.date(2001, 3, 8), homeTown="Moscow")
    print(f"user id: {user2.id}, {user2}")
    user2.save()
    print(f"user id: {user2.id}")
    print(connection.queries)

    chat = Chat.objects.create(firstUser=user1, secondUser=user2)

    message = ''.join(random.choices(string.ascii_uppercase, k=20))
    Message.objects.create(chat=chat, sender=user2, receiver=user1, text=message)
    print(connection.queries)
