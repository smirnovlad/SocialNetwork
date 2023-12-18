from django.urls import re_path
from . import consumers


websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<chat_id>\w+)/$', consumers.ChatConsumer.as_asgi()),
    re_path(r'ws/feedback/$', consumers.FeedbackConsumer.as_asgi()),
]