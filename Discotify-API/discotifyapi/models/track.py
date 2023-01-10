"""track model"""
from django.db import models
from .album import Album

class Track(models.Model):
    """track class"""
    name = models.CharField(max_length=50)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    number = models.CharField(max_length=50)
