from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Convertidor json
from KLDashboard.serializer import *

# Permisos
from KLDashboard.utils import permisos

def bienvenida(request):

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

    return render_to_response('bienvenida.html',context_instance=context)

def proximamente(request):

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
                        'usr': json_response_from(usr)})
    return render_to_response('proximamente.html',context_instance=context)