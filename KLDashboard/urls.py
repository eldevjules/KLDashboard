from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'KLDashboard.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),


    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'KLDashboard.views.bienvenida', name='home'),
    url(r'^proximamente/', 'KLDashboard.views.proximamente', name='proximamente'),
    url(r'^directorio/', include('directorio.urls')),
    url(r'^ausencias/', include('ausencias.urls')),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('django.contrib.auth.urls', namespace='auth')),
)
