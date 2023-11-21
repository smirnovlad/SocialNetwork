from django.contrib import admin
from django.urls import path, include
from .views import UserListAPIViews, UserUpdateAPIViews

urlpatterns = [
    path('api/v1/userlist/', UserListAPIViews.as_view()),
    path('api/v1/userupdate/<int:pk>', UserUpdateAPIViews.as_view()),
]