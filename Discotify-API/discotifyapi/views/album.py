"""album view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from discotifyapi.models import Album
from discotifyapi.serializers import AlbumSerializer
from discotifyapi.helpers import snake_case_to_camel_case

class AlbumView(ViewSet):
    """album views"""

    def list(self, request):
        """get multiple albums"""

        albums = Album.objects.all()

        serializer = AlbumSerializer(albums, many=True)

        data = snake_case_to_camel_case(serializer.data)

        return Response(data)
