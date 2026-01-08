from django.db import models

class Modalidad(models.Model):
    nombre = models.CharField(max_length=100)
    estado = models.BooleanField(default=True)


class Carrera(models.Model):
    nombre = models.CharField(max_length=100)
    modalidad = models.ForeignKey(Modalidad, on_delete=models.CASCADE, related_name='carreras')
    estado = models.BooleanField(default=True)