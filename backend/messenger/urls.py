from django.contrib import admin
from django.urls import path, include
from .views import UserAPIViews, FriendsAPIViews, MessageAPIViews, FeedbackAPIViews

urlpatterns = [
    path('api/v1/users/', UserAPIViews.as_view()),
    path('api/v1/users/<int:pk>', UserAPIViews.as_view()),
    path('api/v1/friends/', FriendsAPIViews.as_view()),
    path('api/v1/friends/<int:pk>', FriendsAPIViews.as_view()),
    path('api/v1/messages/', MessageAPIViews.as_view()),
    path('api/v1/messages/<int:pk>', MessageAPIViews.as_view()),
    path('api/v1/feedback/', FeedbackAPIViews.as_view()),
    path('api/v1/feedback/<int:pk>', FeedbackAPIViews.as_view()),
]