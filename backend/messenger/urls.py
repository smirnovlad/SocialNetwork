from django.contrib import admin
from django.urls import path, include
from .views import MessengerAPIViews

urlpatterns = [
    path('api/v1/userlist/', MessengerAPIViews.as_view()),
]