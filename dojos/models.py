from django.db import models
from directorio.models import Person
from django.template.defaultfilters import slugify

class Dojo(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=140, blank=True, default='')
    slug = models.SlugField(blank=True, max_length=140)
    owner = models.ForeignKey('directorio.Person', related_name='dojos')
    public = models.BooleanField(default=False)
    source = models.URLField()

    def __unicode__(self):
      return self.title

    def save(self, *args, **kwargs):
      self.do_unique_slug()
      super(Dojo, self).save(*args, **kwargs)

    def do_unique_slug(self):
      """
      Se asegura que el slug siempre es unico para este proyecto
      """
      if not self.id:
        # make sure we have a slug first
        if not len(self.slug.strip()):
          self.slug = slugify(self.title)

        self.slug = self.get_unique_slug(self.slug)
        return True

      return False

    def get_unique_slug(self, slug):
      """
      Itera hasta que un slug unico es encontrado
      """
      orig_slug = slug
      counter = 1

      while True:
        dojos = Dojo.objects.filter(slug=slug)
        if not dojos.exists():
          return slug

        slug = '%s-%s' % (orig_slug, counter)
        counter += 1
