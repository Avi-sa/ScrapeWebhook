
from django.urls import path
from core.views import *

urlpatterns = [

    path(
        'search/', SearchDeviceModelAPIView.as_view(), name="search-device-model"
    ),

]
