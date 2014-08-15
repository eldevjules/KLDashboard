# Importamos los modelos que necesitaremos

from directorio.models import Person
from directorio.models import Profile
from directorio.models import Rol
from directorio.models import Permission

from django.core.exceptions import ObjectDoesNotExist

USER_FIELDS = ['username', 'email']

ROL_DEFAULT = 'Kamikaze'
AVATAR_DEFAULT = 'DEFAULT_MANGA.png'

def create_user(strategy, details, user=None, *args, **kwargs):
    if user:
        return {'is_new': False}

    fields = dict((name, kwargs.get(name) or details.get(name))
                        for name in strategy.setting('USER_FIELDS',
                                                      USER_FIELDS))
    if not fields:
        return

    if details['email'].find('@kamikazelab.com') > 0:
        return {
            'is_new': True,
            'user': strategy.create_user(**fields)
        }

    return

def user_dashboard(strategy, details, user=None, *args, **kwargs):
    # Correo obtenido
    email = kwargs['response']['emails'][0]['value']

    try:
        # Revisamos si existe un perfil con el correo obtenido
        profile = Profile.objects.get(email=email)
    except ObjectDoesNotExist:
        profile = None

    if profile == None:
        # Si no existe

        # Guardamos la persona
        person = Person(
            names = kwargs['response']['name']['givenName'],
            paternal_surname = kwargs['response']['name']['familyName'],
            maternal_surname = '',
            birth_date = '1980-01-01',
            gender = '',
        )
        person.save()

        # Guardamos el perfil
        profile = Profile(
            person = person,
            kamikaze_number = '',
            company = '',
            area = '',
            job = '',
            job_time = '',
            boss = '',
            avatar = AVATAR_DEFAULT,
            admission_date = '2009-01-01',
            twitter = '',
            email = kwargs['response']['emails'][0]['value'],
            phone = '',
            status = 'activo'
        )
        profile.save()

        # Le agregamos el rol Kamikaze

        # Buscamos que el rol se encuentre
        rol = Rol.objects.get(denomination=ROL_DEFAULT)

        # Relacionamos el rol con la persona
        person.rols.add( rol )

        # Consultamos los permisos del rol
        permission = Permission.objects.filter(rol__denomination__startswith=ROL_DEFAULT)

        #Relacionamos los permisos con la persona
        for p in permission:
            person.permissions.add( p )

    return