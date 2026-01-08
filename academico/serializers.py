from rest_framework import serializers
from .models import Modalidad, Carrera

class ModalidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modalidad
        fields = ('id', 'nombre', 'estado')

class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = ('id', 'nombre', 'modalidad', 'estado')