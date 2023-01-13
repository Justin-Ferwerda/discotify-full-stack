"""album view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from discotifyapi.models import Album, User, Track, Genre
from discotifyapi.serializers import AlbumSerializer
from discotifyapi.helpers import snake_case_to_camel_case_many, camel_case_to_snake_case

class AlbumView(ViewSet):
    """album views"""

    def list(self, request):
        """get multiple albums"""

        albums = Album.objects.all()

        serializer = AlbumSerializer(albums, many=True)

        data = snake_case_to_camel_case_many(serializer.data)

        return Response(data)

    def create(self, request):
        """handles POST request for albums"""

        data = camel_case_to_snake_case(request.data)
        user = User.objects.get(pk=data['user_id'])
        genre = Genre.objects.get(pk=int(data['genre']))

        album = Album.objects.create(
            user = user,
            artist_name = data['artist_name'],
            album_name = data['album_name'],
            record_image = data
            ['record_image'],
            release_date = data['release_date'],
            spotify = data['spotify_id'],
            genre = genre,
        )

        for track in data['track_list']:
            album_track = Track(
                name = track['name'],
                album = album,
                number = track['track_number']
            )

            album_track.save()

        serializer = AlbumSerializer(album)

        return Response(serializer.data)
