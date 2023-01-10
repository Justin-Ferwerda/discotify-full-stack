"""album model"""
from django.db import models
from .genre import Genre
from .user import User

class Album(models.Model):
    """album model"""
    artist_name = models.CharField(max_length=50)
    album_name = models.CharField(max_length=50)
    record_image = models.CharField(max_length=300)
    release_date = models.DateField()
    spotify = models.CharField(max_length=50)
    genre = models.ForeignKey(Genre, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
