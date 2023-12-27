from django.contrib import admin
from .models import User, Feedback

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'password', 'first_name', 'last_name', 'bornAt', 'homeTown', 'avatar']
    list_editable = ['password', 'avatar']
    list_display_links = ['username']

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ['sender', 'text', 'timestamp']


admin.site.register(User, UserAdmin)
admin.site.register(Feedback, FeedbackAdmin)