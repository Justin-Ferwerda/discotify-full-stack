"""trade view"""

from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from discotifyapi.models import User, Album, Trade
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

        trade_recipient_user = User.objects.get(pk=data['trade_request_user'])
        user = User.objects.get(data['trade_offer_user'])
        trader_album = Album.objects.get(data['trade_offer_album'])
        tradee_album = Album.objects.get(data['trade_request_album'])

        trade = Trade.objects.create(
          trade_recipient_user = trade_recipient_user,
          user = user,
          trader_album = trader_album,
          tradee_album = tradee_album
        )

        serializer = TradeSerializer(trade)

        return Response(snake_case_to_camel_case_single(serializer.data))
