"""user model"""
from collections import Counter
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

    @property
    def unique_genres(self):
        """gets unique list of genres from user"""
        genres = []
        for album in self.user_albums.all():
            genres.append(album.genre)
        if len(genres) >=1:
            return set(genres)
        else:
            return []

    @property
    def favorite_genre(self):
        """gets favorite genre"""
        genres = []
        for album in self.user_albums.all():
            genres.append(album.genre)
        count_list = Counter(genres).most_common(1)
        if len(count_list):
            return count_list[0][0].label
        else:
            return ""
        
    @property
    def artist_names(self):
        """gets list of artist names"""
        names = [album.artist_name for album in self.user_albums.all()]
        
        return list(set(names))
