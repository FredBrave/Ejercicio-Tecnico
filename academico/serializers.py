from rest_framework import serializers
from .models import Modalidad, Carrera

class ModalidadSerializer(serializers.ModelSerializer):
    def validar_nombre(self, value):
        if not value.strip():
            raise serializers.ValidationError("El nombre no puede estar vacio")
        return value
    
    class Meta:
        model = Modalidad
        fields = '__all__'

class CarreraSerializer(serializers.ModelSerializer):
    
    modalidad_nombre = serializers.CharField(
        source='modalidad.nombre',
        read_only=True
    )
    
    def validar_nombre(self, value):
        if not value.strip():
            raise serializers.ValidationError("El nombre no puede estar vacio")
        return value
    
    class Meta:
        model = Carrera
        fields = '__all__'