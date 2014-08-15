from django.db import models

# Create your models here.

# Modelo Permisos
class Permission(models.Model):
    denomination = models.CharField(max_length = 100)
    description = models.CharField(max_length = 500)

# Modelo Habilidades
class Skill(models.Model):
    denomination = models.CharField(max_length = 100)
    description = models.CharField(max_length = 500)

# Modelo Rol
class Rol(models.Model):
    denomination = models.CharField(max_length = 100)
    description = models.CharField(max_length = 500)
    status = models.CharField(max_length = 25)

    #Permisos
    permissions = models.ManyToManyField(Permission)

    #Skills
    skills = models.ManyToManyField(Skill)

# Modelo Persona
class Person(models.Model):
    names = models.CharField(max_length = 100)
    paternal_surname = models.CharField(max_length = 50)
    maternal_surname = models.CharField(max_length = 50)
    birth_date = models.DateField()
    gender = models.CharField(max_length = 10)

    # Roles
    rols = models.ManyToManyField(Rol)

    # Permisos
    permissions = models.ManyToManyField(Permission)

# Modelo Perfil
class Profile(models.Model):
    person = models.ForeignKey(Person)
    kamikaze_number = models.CharField(max_length = 10)
    company = models.CharField(max_length = 100)
    area = models.CharField(max_length = 100)
    job = models.CharField(max_length = 100)
    job_time = models.CharField(max_length = 100)
    boss = models.CharField(max_length = 100)
    avatar = models.CharField(max_length = 100)
    admission_date = models.DateTimeField()
    twitter = models.CharField(max_length = 100)
    email = models.CharField(max_length = 50)
    phone = models.CharField(max_length = 50)
    status = models.CharField(max_length = 25)

# Modelo Credenciales
# class Credential(models.Model):
#     person = models.ForeignKey(Person)
#     provider = models.CharField(max_length = 25)
#     user = models.CharField(max_length = 50)
#     hashed_password = models.CharField(max_length = 50)
#     data = models.TextField()
