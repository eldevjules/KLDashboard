from django.db import models
from directorio.models import Person

# Create your models here.
class Ausencia(models.Model):

    TIPOS_DE_AUSENCIA = (
        ('HO', 'Home Office'),
        ('VC', 'Vacaciones'),
        ('IV', 'Imprevistos'),
    )

    STATUS = (
        ('S', 'Solicitada'),
        ('A', 'Aceptada'),
        ('R', 'Rechazada'),
        ('NA', 'No Aplica'),
    )

    emisor = models.ForeignKey('directorio.Person',related_name='emisor')
    receptor = models.ForeignKey('directorio.Person',related_name='receptor')
    detail = models.CharField(max_length=500, blank=True, default='')
    kind = models.CharField(max_length=50, choices=TIPOS_DE_AUSENCIA, blank=True)
    initial_date = models.DateField(blank=True, null=True)
    final_date = models.DateField(blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, choices=STATUS, blank=True)

class Laboral_Especial(models.Model):

    TIPOS_LABORAL_ESPECIAL = (
        ('HO', 'Home Office'),
        ('FV', 'Festivo'),
    )

    denomination = models.CharField(max_length=100, blank=True)
    day = models.CharField(max_length=2, blank=True)
    month = models.CharField(max_length=2, blank=True)
    year = models.CharField(max_length=4, blank=True)
    kind = models.CharField(max_length=50, choices=TIPOS_LABORAL_ESPECIAL, blank=True)

class Configuracion_Ausencias(models.Model):

    denomination = models.CharField(max_length=100, blank=True)
    detail = models.CharField(max_length=500, blank=True)
    variable = models.CharField(max_length=100, blank=True)
    value = models.CharField(max_length=100, blank=True)
    status = models.CharField(max_length=50, blank=True)
