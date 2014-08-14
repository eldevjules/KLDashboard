from django.shortcuts import render_to_response
from django.template.context import RequestContext

# Para revisar el login
from django.contrib.auth.decorators import login_required

# Revisa que este logeado
@login_required(login_url="/")
def home(request):
   context = RequestContext(request,
                           {'request': request,
                            'user': request.user})
   return render_to_response('directorio/home.html',
                             context_instance=context)
