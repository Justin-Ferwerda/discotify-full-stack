"""wishlist view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from discotifyapi.models import User, Album, Wishlist
from discotifyapi.serializers import WishlistSerializer
from discotifyapi.helpers import camel_case_to_snake_case

class WishlistView(ViewSet):
    """wishlist views"""

    def create(self, request):
        """handles POST requests for wishlist"""

        data = camel_case_to_snake_case(request.data)
        album = Album.objects.get(pk=data['album_id'])
        user = User.objects.get(pk=data['user_id'])

        wishlist = Wishlist.objects.create(
          album = album,
          user = user
        )

        serializer = WishlistSerializer(wishlist)

        return Response(serializer.data)

    def destroy(self, request, pk):
        """deletes wish object"""
        album = Album.objects.get(pk=pk)

        wish = Wishlist.objects.filter(album=album)
        wish.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)
