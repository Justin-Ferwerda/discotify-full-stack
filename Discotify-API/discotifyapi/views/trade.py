"""trade view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from discotifyapi.models import User, Album, Trade, Wishlist
from discotifyapi.helpers import camel_case_to_snake_case, snake_case_to_camel_case_single
from discotifyapi.serializers import TradeSerializer


class TradeView(ViewSet):
    """handles all trade requests"""

    def destroy(self, request, pk):
        """handles 'DELETE' request for trade"""
        trade = Trade.objects.get(pk=pk)
        trade.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)

    def create(self, request):
        """handles create request for trades"""
        data = camel_case_to_snake_case(request.data)

        trade_recipient_user = User.objects.get(pk=data['trade_recipient_user'])
        user = User.objects.get(pk=data['user'])
        trader_album = Album.objects.get(pk=data['trader_album'])
        tradee_album = Album.objects.get(pk=data['tradee_album'])

        trade = Trade.objects.create(
          trade_recipient_user = trade_recipient_user,
          user = user,
          trader_album = trader_album,
          tradee_album = tradee_album,
        )

        serializer = TradeSerializer(trade)

        return Response(snake_case_to_camel_case_single(serializer.data))

    @action(methods=['post'], detail=False)
    def resolve_trade(self, request):
        """handles trade approvals"""

        album1 = Album.objects.get(pk=request.data['album1'])
        album2 = Album.objects.get(pk=request.data['album2'])

        user1 = User.objects.get(pk=request.data['user1'])
        user2 = User.objects.get(pk=request.data['user2'])

        wish = Wishlist.objects.filter(album=album1, user=user1)

        wish.delete()

        album1.user = user1
        album2.user = user2

        album1.save()
        album2.save()

        trade = Trade.objects.get(pk=request.data['trade'])
        trade.delete()

        return Response(None, status=status.HTTP_204_NO_CONTENT)
