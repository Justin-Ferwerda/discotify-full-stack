"""wishlist model"""
from django.db import models
from .user import User
from.album import Album

class Wishlist(models.Model):
    """wishlist class"""

    album = models.ForeignKey(Album, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
