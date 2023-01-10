"""user model"""
from django.db import models

class User(models.Model):
    """user attributes"""

    uid = models.CharField(max_length=50)
    member_since = models.DateField()
    name = models.CharField(max_length=50)
    image = models.CharField(max_length=300)

    @property
    def albums(self):
        """user albums"""
        albums = [album for album in self.user_albums.all()]
        return albums

    @property
    def trades(self):
        """user trades"""
        trades = [trade for trade in self.offer_user.all()]
        return trades

    @property
    def trade_requests(self):
        """user trade requests"""
        trades = [trade for trade in self.request_user.all()]
        return trades

    @property
    def wishlist(self):
        """user wishlist"""
        wishlist = [wish for wish in self.user_wishlist.all()]
        return wishlist
  