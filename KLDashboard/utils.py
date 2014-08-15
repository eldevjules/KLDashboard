# Modelos

from django.contrib.auth.models import User
from directorio.models import Person
from directorio.models import Profile
from directorio.models import Permission

# Exepciones

from django.core.exceptions import ObjectDoesNotExist

from django.conf import settings

def permisos(request):

    try:
        # Obtenemos el correo del usuario
        user = User.objects.get(username=request.user.username)
        # Obtenemos el Perfil y el Correo
        profile = Profile.objects.get(email=user.email)
        # Consultamos los permisos de la persona
        permissionsList = []
        permission = Permission.objects.filter(person=profile.person.id)

        for p in permission:
            permissionsList.append( p.denomination )

        host = request.META['HTTP_HOST']

        usr = { "names": profile.person.names, "paternal_surname":  profile.person.paternal_surname, "maternal_surname":  profile.person.maternal_surname, "email": profile.email, "avatar": "http://" + host + '/static/directorio/img/avatars/' + profile.avatar, "permss": permissionsList }
    except ObjectDoesNotExist:
        usr = {}

    return usr