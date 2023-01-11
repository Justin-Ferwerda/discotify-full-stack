"""album view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from discotifyapi.models import Album
from discotifyapi.serializers import AlbumSerializer
from discotifyapi.helpers import case_changer

class AlbumView(ViewSet):
    """album views"""

    def list(self, request):
        """get multiple albums"""

        albums = Album.objects.all()

        serializer = AlbumSerializer(albums, many=True)

        case_changed = case_changer(serializer.data)

        return Response(case_changed)
