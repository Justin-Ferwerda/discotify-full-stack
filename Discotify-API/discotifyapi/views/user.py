"""user view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from discotifyapi.models import User
from discotifyapi.serializers import UserSerializer

class UserView(ViewSet):
    """user views"""

    def retrieve(self, request, pk):
        """get single user"""
        user = User.objects.get(pk=pk)

        serializer = UserSerializer(user)

        return Response(serializer.data)
