"""user model"""
from django.db import models

class User(models.Model):
    """user attributes"""

    uid = models.CharField(max_length=50)
    member_since = models.DateField()
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=300)
  