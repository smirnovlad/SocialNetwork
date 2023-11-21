from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['login', 'password', 'firstName', 'lastName', 'bornAt', 'homeTown', 'avatar']
    list_editable = ['password', 'avatar']
    list_display_links = ['login']

admin.site.register(User, UserAdmin)