from directorio.models import Person
from directorio.models import Profile
from directorio.models import Credential

USER_FIELDS = ['username', 'email']

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

def create_user_dashboard(strategy, details, user=None, *args, **kwargs):

    person = Person(
        names = kwargs['response']['name']['givenName'],
        paternal_surname = kwargs['response']['name']['familyName'],
        maternal_surname = '',
        birth_date = '1970-01-01',
        gender = '',
    )
    person.save()

    profile = Profile(
        person = person,
        kamikaze_numbre = '',
        company = '',
        area = '',
        job = '',
        job_time = '',
        boss = '',
        avatar = '',
        admision_date = '1970-01-01',
        twitter = '',
        email = kwargs['response']['emails'][0]['value'],
        phone = ''
    )
    profile.save()


    # kwargs['variableconqueta'] = "hola"
    print( kwargs['response']['name'] )
    print( kwargs['response']['emails'][0]['value'] )
    print( type(kwargs) )
    return