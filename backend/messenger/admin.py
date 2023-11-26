from django.contrib import admin
from .models import User

# Register your models here.
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'password', 'first_name', 'last_name', 'bornAt', 'homeTown', 'avatar']
    list_editable = ['password', 'avatar']
    list_display_links = ['username']

admin.site.register(User, UserAdmin)