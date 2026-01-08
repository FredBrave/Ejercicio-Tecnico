from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ModalidadSerializer, CarreraSerializer
from .models import Modalidad, Carrera

class ModalidadView(viewsets.ModelViewSet):
    serializer_class = ModalidadSerializer
    queryset = Modalidad.objects.all()
    
class CarreraView(viewsets.ModelViewSet):
    serializer_class = CarreraSerializer
    queryset = Modalidad.objects.all()
