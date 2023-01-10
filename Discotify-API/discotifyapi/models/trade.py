"""trade model"""
from django.db import models
from .user import User
from.album import Album

class Trade(models.Model):
    """trade model"""
    trade_recipient_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='request_user')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='offer_user')
    trader_album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='offer_album')
    tradee_album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='request_album')
    