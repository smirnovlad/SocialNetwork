from django.db.models.signals import post_save
from .models import Feedback
from .consumers import send_feedback_update

post_save.connect(send_feedback_update, sender=Feedback)