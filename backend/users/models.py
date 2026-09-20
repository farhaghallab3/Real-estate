from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    class Role(models.TextChoices):
        SALESPERSON = "salesperson", "Salesperson"
        MANAGER = "manager", "Manager"
        ADMIN = "admin", "Admin"

    role = models.CharField(
        max_length=20, choices=Role.choices, default=Role.SALESPERSON
    )

    def __str__(self):
        return self.get_full_name() or self.username
