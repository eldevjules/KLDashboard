from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Directorio KLDashboardClient Urls
    url(r'^$', 'directorio.views.home', name='homeDirectorio'),
    url(r'^persons/$', 'directorio.views.requestPersons'),
    url(r'^persons-admin/$', 'directorio.views.requestPersonsAdmin'),
    url(r'^person-admin/$', 'directorio.views.requestPersonAdmin'),
    url(r'^rols/$', 'directorio.views.requestRols'),
    url(r'^submit-person/$', 'directorio.views.requestSubmitPerson'),
)
