from django.db import models
from django.contrib.auth.models import AbstractBaseUser,BaseUserManager, PermissionsMixin


class UserManager(BaseUserManager):
    def create_user(self, email, phone = None, password = None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(phone=phone, email=email, **extra_fields)
        user.set_password(password)
        user.save(using = self._db)
        return user

    def create_superuser(self, email, phone = None, password = None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', 'admin')
        return self.create_user(email, phone, password, **extra_fields)
    


class CustomUser(AbstractBaseUser,PermissionsMixin):
    
    phone = models.CharField(max_length=10,unique=True)
    profile_pic = models.ImageField(upload_to='profile_images/', null=True, blank=True)
    first_name = models.CharField(max_length=15)
    last_name = models.CharField(max_length=15)
    role = models.CharField(max_length=10, choices=[('player', 'Player'), ('owner', 'Owner'), ('admin', 'admin')],default='player')
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_blocked = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["phone", "first_name", "last_name"]

    objects = UserManager()


    def __str__(self):
        return self.username
    
class Subject(models.Model):
    name = models.CharField(unique=True,max_length=20)
    
    def __str__(self):
        return self.name
    
    

class Notes(models.Model):
    uploader = models.ForeignKey(CustomUser,on_delete=models.CASCADE,related_name="note")
    subject_name = models.ForeignKey(Subject,on_delete=models.CASCADE,related_name="note")
    notes = models.FileField(upload_to="NOTES")
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    