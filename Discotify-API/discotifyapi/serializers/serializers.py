"""serializers"""
from rest_framework.serializers import ModelSerializer
from discotifyapi.models import Album, Trade, Wishlist, User, Genre, Track

class TrackSerializer(ModelSerializer):
    """track serializer"""

    class Meta:
        model = Track
        fields = ('id', 'name', 'album', 'number')

class AlbumSerializer(ModelSerializer):
    """Album Serializer"""
    tracks = TrackSerializer(many=True)

    class Meta:
        model = Album
        fields = ('id', 'artist_name', 'album_name', 'record_image', 'release_date', 'spotify', 'genre', 'user', 'tracks')
        depth = 1

class TradeSerializer(ModelSerializer):
    """trade serializer"""

    class Meta:
        model = Trade
        fields = ('id', 'user', 'trade_recipient_user', 'trader_album', 'tradee_album')
        depth = 2

class WishlistSerializer(ModelSerializer):
    """wishlist serializer"""

    album = AlbumSerializer()

    class Meta:
        model = Wishlist
        fields = ('id', 'album', 'user')
        depth = 1

class GenreSerializer(ModelSerializer):
    """genre serializer"""

    class Meta:
        model = Genre
        fields = ('id', 'label')

class UserSerializer(ModelSerializer):
    """user serializer"""

    albums = AlbumSerializer(many=True)
    wishlist = WishlistSerializer(many=True)
    trades = TradeSerializer(many=True)
    trade_requests = TradeSerializer(many=True)
    unique_genres = GenreSerializer(many=True)
    
    class Meta:
        model = User
        fields = ('id', 'uid', 'member_since', 'name', 'image', 'albums', 'wishlist', 'trades', 'trade_requests', 'unique_genres', 'favorite_genre', 'artist_names')
        depth = 1
