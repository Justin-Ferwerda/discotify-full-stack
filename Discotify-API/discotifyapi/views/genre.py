"""genre view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from discotifyapi.models import Genre
from discotifyapi.serializers import GenreSerializer

class GenreView(ViewSet):
    """genre views"""

    def list(self, request):
        """gets multiple genres"""

        genres = Genre.objects.all()

        serializer = GenreSerializer(genres, many=True)

        return Response(serializer.data)
