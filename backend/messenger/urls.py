from django.contrib import admin
from django.urls import path, include
from .views import UserAPIViews

urlpatterns = [
    path('api/v1/userlist/', UserAPIViews.as_view()),
    path('api/v1/userlist/<int:pk>', UserAPIViews.as_view()),
]