from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.http import HttpResponse, HttpResponseRedirect

# Convertidor json
from KLDashboard.serializer import *

# Permisos
from KLDashboard.utils import permisos

# Para revisar el login
from django.contrib.auth.decorators import login_required

# Modelos
from django.contrib.auth.models import User
from directorio.models import Person
from directorio.models import Profile
from directorio.models import Permission
from directorio.models import Rol

# 
from django.core.exceptions import ObjectDoesNotExist

# Revisa que este logeado
@login_required(login_url="/")
def home(request):

    # Obtenemos los permisos del usuario
    usr = permisos( request )

    if usr:
        permss = usr['permss']
    else:
        permss = []

    context = RequestContext(request,
                        {'request': request,
                        'user': request.user,
                        'permss': permss,
                        'usr': json_from(usr)})

    return render_to_response('directorio/home.html',context_instance=context)

def requestPersons(request):
    listProfiles = []
    profiles = Profile.objects.filter(status='activo')

    for p in profiles:
        listProfiles.append( { 
            "names": p.person.names, 
            "paternal_surname": p.person.paternal_surname,
            "maternal_surname": p.person.maternal_surname,
            "birth_date": p.person.birth_date.isoformat(),
            "company": p.company,
            "area": p.area,
            "job": p.job,
            "avatar": p.avatar,
            "admission_date": p.admission_date.isoformat(),
            "email": p.email,
            "phone": p.phone,
            "twitter": p.twitter
            })

    result = {"persons": listProfiles }

    return json_response_from(result)

def requestPersonsAdmin(request):
    listProfiles = []
    profiles = Profile.objects.filter()

    for p in profiles:
        listProfiles.append( { 
            "id": p.id,
            "names": p.person.names, 
            "paternal_surname": p.person.paternal_surname,
            "maternal_surname": p.person.maternal_surname,
            "company": p.company,
            "area": p.area,
            "job": p.job,
            "avatar": p.avatar,
            })

    result = {"persons": listProfiles }

    return json_response_from(result)

def requestPersonAdmin(request):
    profileId = request.POST.get( 'id', 'default' )

    try:
        # Revisamos si existe un perfil con el correo obtenido
        profile = Profile.objects.get(id=profileId)
    except ObjectDoesNotExist:
        profile = None

    if profile == None:
        result = {"response": False, "msg": "Persona no encontrada." }
    else:
        # Buscamos sus permisos y sus roles

        # Consultamos los permisos de la persona
        permissionsList = []
        permission = Permission.objects.filter(person=profile.person.id)

        for p in permission:
            permissionsList.append( p.id )

        # Consultamos los roles de la persona
        rolsPersonList = []
        rol = Rol.objects.filter(person=profile.person.id)

        for r in rol:
            # Recorremos cada rol y ahora consultamos todos sus permisos
            permission = Permission.objects.filter(rol=r.id)

            # Lsita donde guardaremos los permisos del rol
            permissionsRolList = []

            # Recorremos los permisos del rol
            for p in permission:
                # Revisamos si el permiso esta en la lista
                if p.id in permissionsList:
                    permissionsRolList.append( { "id": p.id, "label": p.denomination, "detail": p.description, "selected": True } )
                else:
                    permissionsRolList.append( { "id": p.id, "label": p.denomination, "detail": p.description, "selected": False } )

            rolsPersonList.append( { "value": r.id, "label": r.denomination, "detail": r.description, "permissions": permissionsRolList } )

        person = {
            "id": profile.id,
            "names": profile.person.names,
            "paternal_surname": profile.person.paternal_surname,
            "maternal_surname": profile.person.maternal_surname,
            "birth_date": profile.person.birth_date.isoformat(),
            "gender": profile.person.gender,
            "kamikaze_number": profile.kamikaze_number,
            "company": profile.company,
            "area": profile.area,
            "job": profile.job,
            "job_time": profile.job_time,
            "boss": profile.boss,
            "avatar": profile.avatar,
            "admission_date": profile.admission_date.isoformat(),
            "twitter": profile.twitter,
            "email": profile.email,
            "phone": profile.phone,
            "status": profile.status
        }

        result = {"response": True, "person": person, "rols": rolsPersonList }

    return json_response_from(result)

def requestRols(request):
    rolsList = []
    rol = Rol.objects.filter(status='activo')

    rolsList.append( { "value": 0, "label": "Selecciona un Rol", "detail": "", "permissions": [] } )

    for r in rol:
        # Recorremos cada rol y ahora consultamos todos sus permisos
        permission = Permission.objects.filter(rol=r.id)

        # Lsita donde guardaremos los permisos del rol
        permissionsRolList = []

        # Recorremos los permisos del rol
        for p in permission:
            permissionsRolList.append( { "id": p.id, "label": p.denomination, "detail": p.description, "selected": True } )

        rolsList.append( { "value": r.id, "label": r.denomination, "detail": r.description, "permissions": permissionsRolList } )

    return json_response_from( { "rols": rolsList } )

def requestSubmitPerson(request):
    if request.method == "POST":
        profile = request.POST.dict()
        rols = profile['roles'].split(",")
        permissions = profile['permissions'].split(",")

        try:
            # Revisamos si existe un perfil con el correo obtenido
            perfil = Profile.objects.get(id=profile['id'])
        except ObjectDoesNotExist:
            perfil = None

        if perfil == None:
            # Creamos
            print('creamos')

            response = {"response": True, "msg": "creado"}
        else:

            # Actualiamos Perfil
            perfil.area = profile['area']
            perfil.admission_date = profile['admission_date']
            perfil.area = profile['area']
            perfil.avatar = profile['avatar']
            perfil.boss = profile['boss']
            perfil.company = profile['company']
            perfil.email = profile['email']
            perfil.job = profile['job']
            perfil.job_time = profile['job_time']
            perfil.kamikaze_number = profile['kamikaze_number']
            perfil.phone = profile['phone']
            perfil.status = profile['status']
            perfil.twitter = profile['twitter']
            perfil.save()

            person = Person.objects.get(id=perfil.person.id)
            person.names = profile['names']
            person.gender = profile['gender']
            person.paternal_surname = profile['paternal_surname']
            person.maternal_surname = profile['maternal_surname']
            person.birth_date = profile['birth_date']
            person.save()

            # # Consultamos los roles de la persona
            rol = Rol.objects.filter(person=person.id)

            for r in rol:
                # Recorremos cada rol y ahora consultamos todos sus permisos
                permission = Permission.objects.filter(person=person.id)

                for p in permission:
                    Person.permissions.through.objects.get(person__id=person.id, permission__id=p.id).delete()
                Person.rols.through.objects.get(person__id=person.id, rol__id=r.id).delete()

            response = {"response": True, "msg": "Actualizado"}

        # Agregamos los roles
        for r in rols:
            rol = Rol.objects.get(id=r)
            person.rols.add( rol )

        # Agregamos los permisos
        for p in permissions:
            perm = Permission.objects.get(id=p)
            person.permissions.add( perm )

    else:
        response = {"response": False, "msg": "No se accedio de manera correcta"}

    return json_response_from(response)

