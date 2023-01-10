"""auth view"""
from discotifyapi.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def check_user(request):
    '''Checks to see if User has Associated User

    Method arguments:
      request -- The full HTTP request object
    '''

    uid = request.data['uid']

    try:
        user = User.objects.get(uid=uid)

        data = {
            'id': user.id,
            'uid': user.uid,
            'member_since': user.member_since,
            'name': user.name,
            'image': user.image

        }
        return Response(data)
    except:
        data = { 'valid': False }
        return Response(data)

@api_view(['POST'])
def register_user(request):
    '''Handles the creation of a new user for authentication

    Method arguments:
      request -- The full HTTP request object
    '''
    user = User.objects.create(
        uid=request.data['uid'],
        name=request.data['name'],
        image = request.data['image'],
        member_since = request.data['member_since']
    )

    data = {
            'id': user.id,
            'uid': user.uid,
            'member_since': user.member_since,
            'name': user.name,
            'image': user.image

        }
    return Response(data)
