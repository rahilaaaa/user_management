from django.contrib.auth.models import AbstractUser
from django.db import models

# print("all fields", AbstractUser._meta.get_fields())


class User(AbstractUser):
    profile_image = models.ImageField(upload_to='profiles/', null=True, blank=True)