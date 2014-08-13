from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Directorio KLDashboardClient Urls
    url(r'^$', 'directorio.views.home', name='homeDirectorio'),
)
