from django.contrib import admin
from django.urls import path, include, re_path
from .views import UserInstanceAPIViews, UserAPIViews, MessageInstanceAPIViews, FeedbackInstanceAPIViews, ChatInstanceAPIViews

urlpatterns = [
    path('api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('api/v1/users/', UserAPIViews.as_view()),
    path('api/v1/users/<int:pk>', UserInstanceAPIViews.as_view()),
    # path('api/v1/messages/', MessageAPIViews.as_view()),
    # path('api/v1/messages/<int:pk>', MessageAPIViews.as_view()),
    # path('api/v1/chatlist/', ChatAPIViews.as_view()),
    # path('api/v1/chatlist/<int:pk>', ChatAPIViews.as_view()),
    # path('api/v1/feedback/', FeedbackAPIViews.as_view()),
    # path('api/v1/feedback/<int:pk>', FeedbackAPIViews.as_view()),
]