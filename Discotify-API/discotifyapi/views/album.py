"""album view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from discotifyapi.models import Album, User, Track, Genre
from discotifyapi.serializers import AlbumSerializer
from discotifyapi.helpers import snake_case_to_camel_case_many, camel_case_to_snake_case, snake_case_to_camel_case_single

class AlbumView(ViewSet):
    """album views"""

    def retrieve(self, request, pk):
        """get single album"""

        album = Album.objects.get(pk=pk)

        serializer = AlbumSerializer(album)

        return Response(snake_case_to_camel_case_single(serializer.data))


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

    def update(self, request, pk):
        """handles update request for albums"""
        data = camel_case_to_snake_case(request.data)

        album = Album.objects.get(pk=pk)

        album.artist_name = data['artist_name']
        album.album_name = data['album_name']
        album.release_date = data['release_date']

        genre = Genre.objects.get(pk=data['genre']['id'])

        album.genre = genre
        album.save()

        serializer = AlbumSerializer(album)

        return Response(snake_case_to_camel_case_single(serializer.data))

    def destroy(self, request, pk):
        """ handles delete requests for album"""

        album = Album.objects.get(pk=pk)
        album.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)
