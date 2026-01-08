from django.db import models

class Modalidad(models.Model):
    nombre = models.CharField(max_length=100, unique=True, null=False)
    estado = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class Carrera(models.Model):
    nombre = models.CharField(max_length=100, unique=True, null=False)
    modalidad = models.ForeignKey(Modalidad, on_delete=models.CASCADE, related_name='carreras')
    estado = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre