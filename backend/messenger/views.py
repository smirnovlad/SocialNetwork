from django.shortcuts import render
from django.http import HttpResponse
from .models import User
from .generator import generate

# Create your views here.

def index(request):
    all = User.objects.all()
    generate()
    return render(request, 'messenger/index.html', {'users': all, 'title': 'Users list'})