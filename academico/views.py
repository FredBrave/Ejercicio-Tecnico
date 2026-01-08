from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ModalidadSerializer, CarreraSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

from .models import Modalidad, Carrera

class ModalidadView(viewsets.ModelViewSet):
    serializer_class = ModalidadSerializer
    queryset = Modalidad.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['estado']
    search_fields = ['nombre']
    
class CarreraView(viewsets.ModelViewSet):
    serializer_class = CarreraSerializer
    queryset = Carrera.objects.all()
    filter_backends = [DjangoFilterBackend, SearchFilter]
    filterset_fields = ['estado', 'modalidad']
    search_fields = ['nombre']