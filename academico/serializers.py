from rest_framework import serializers
from .models import Modalidad, Carrera

class ModalidadSerializer(serializers.ModelSerializer):
    def validar_nombre(self, value):
        if not value.strip():
            raise serializers.ValidationError("El nombre no puede estar vacio")
        return value
    
    class Meta:
        model = Modalidad
        fields = ('id', 'nombre', 'estado')

class CarreraSerializer(serializers.ModelSerializer):
    def validar_nombre(self, value):
        if not value.strip():
            raise serializers.ValidationError("El nombre no puede estar vacio")
        return value
    
    class Meta:
        model = Carrera
        fields = ('id', 'nombre', 'modalidad', 'estado')