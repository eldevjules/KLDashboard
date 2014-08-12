from django.db import models

# Create your models here.

# Modelo Telefono
class Phone(models.Model):
    number = models.CharField(max_length = 50)
    label = models.CharField(max_length = 50)

# Modelo Correo
class Email(models.Model):
    email = models.CharField(max_length = 100)
    label = models.CharField(max_length = 50)

# Modelo Permisos
class Permission(models.Model):
    denomination = models.CharField(max_length = 100)
    description = models.CharField(max_length = 500)

# Modelo Habilidades
class Skill(models.Model):
    denomination = models.CharField(max_length = 100)
    description = models.CharField(max_length = 500)

# Modelo Persona
class Person(models.Model):
    names = models.CharField(max_length = 100)
    paternal_surname = models.CharField(max_length = 50)
    maternal_surname = models.CharField(max_length = 50)
    birth_date = models.DateField()
    gender = models.CharField(max_length = 10)

    # Telefonos
    phones = models.ManyToManyField(Phone)

    # Correos
    emails = models.ManyToManyField(Email)

    # Permisos
    permissions = models.ManyToManyField(Permission)

# Modelo Rol
class Rol(models.Model):
    denomination = models.CharField(max_length = 100)
    description = models.CharField(max_length = 500)
    status = models.CharField(max_length = 25)

    #Permisos
    permissions = models.ManyToManyField(Permission)

    #Skills
    skills = models.ManyToManyField(Skill)

# Modelo Perfil
class Profile(models.Model):
    person_id = models.ForeignKey(Person)
    kamikaze_numbre = models.CharField(max_length = 10)
    company = models.CharField(max_length = 100)
    area = models.CharField(max_length = 100)
    job = models.CharField(max_length = 100)
    job_time = models.CharField(max_length = 100)
    boss = models.CharField(max_length = 100)
    avatar = models.CharField(max_length = 100)
    admision_date = models.DateTimeField()
    last_login = models.DateTimeField()
    twitter = models.CharField(max_length = 100)

# Modelo Credenciales
class Credential(models.Model):
    person = models.ForeignKey(Person)
    provider = models.CharField(max_length = 25)
    user = models.CharField(max_length = 50)
    hashed_password = models.CharField(max_length = 50)
    data = models.TextField()
