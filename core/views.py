# Create your views here.

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from python_client import run


class SearchDeviceModelAPIView(APIView):
    '''
    Class based view to call the scrape data using microservice and call webhook.
    '''

    http_method_names = ['post']

    def post(self, request):
        requested_data = request.data
        model_name = requested_data.get('model_name')
        webhook_url = requested_data.get('webhook_url')

        if not model_name or not webhook_url:
            return Response(
                {"Success": False}, status=status.HTTP_400_BAD_REQUEST
            )

        run(model_name, webhook_url)

        return Response({"Success": True}, status=status.HTTP_200_OK)
