"""serializers"""
from rest_framework.serializers import ModelSerializer
from discotifyapi.models import Album, Trade, Wishlist, User, Genre, Track

class AlbumSerializer(ModelSerializer):
    """Album Serializer"""

    class Meta:
        model = Album
        fields = ('id', 'artist_name', 'album_name', 'record_image', 'release_date', 'spotify', 'genre', 'user')
        depth = 1

class TradeSerializer(ModelSerializer):
    """trade serializer"""

    class Meta:
        model = Trade
        fields = ('id', 'user', 'trade_recipient_user', 'trader_album', 'tradee_album')
        depth = 1

class WishlistSerializer(ModelSerializer):
    """wishlist serializer"""

    class Meta:
        model = Wishlist
        fields = ('id', 'album', 'user')
        depth = 1

class UserSerializer(ModelSerializer):
    """user serializer"""
    albums = AlbumSerializer(many=True)
    wishlist = WishlistSerializer(many=True)
    trades = TradeSerializer(many=True)
    trade_requests = TradeSerializer(many=True)

    class Meta:
        model = User
        fields = ('id', 'uid', 'member_since', 'name', 'image', 'albums', 'wishlist', 'trades', 'trade_requests')
        depth = 1



class GenreSerializer(ModelSerializer):
    """genre serializer"""

    class Meta:
        model = Genre
        fields = ('id', 'label')

class TrackSerializer(ModelSerializer):
    """track serializer"""

    class Meta:
        model = Track
        fields = ('id', 'name', 'album', 'number')
        depth = 1
