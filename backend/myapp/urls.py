

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, SubjectViewSet, NotesViewSet

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'notes', NotesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
