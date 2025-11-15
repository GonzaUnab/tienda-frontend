
from django.db import models

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio = models.IntegerField()
    categoria = models.CharField(max_length=50)
    img1 = models.ImageField(upload_to='productos/')
    img2 = models.ImageField(upload_to='productos/', null=True, blank=True)

    def __str__(self):
        return self.nombre
