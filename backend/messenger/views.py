from django.shortcuts import render
from django.http import HttpResponse
from .generator import generate

# Create your views here.

def index(request):
    print(request)
    generate()
    return HttpResponse('<h1> Cosinus pi na dva! </h1>')