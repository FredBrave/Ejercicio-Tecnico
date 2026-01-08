from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ModalidadSerializer, CarreraSerializer
from django_filters.rest_framework import DjangoFilterBackend

from .models import Modalidad, Carrera

class ModalidadView(viewsets.ModelViewSet):
    serializer_class = ModalidadSerializer
    queryset = Modalidad.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['estado']
    
class CarreraView(viewsets.ModelViewSet):
    serializer_class = CarreraSerializer
    queryset = Carrera.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['estado', 'modalidad']
