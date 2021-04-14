from django.urls import path

from . import views

app_name = 'api'
urlpatterns = [
    path('keywords/', views.keywords, name='keywords')
]