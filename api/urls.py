from django.urls import path

from . import views

app_name = 'inspector'
urlpatterns = [
    path('keywords/', views.keywords, name='keywords')
]