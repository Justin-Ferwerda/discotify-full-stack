"""genre model"""
from django.db import models

class Genre(models.Model):
    """genre model"""
    label = models.CharField(max_length=50)
