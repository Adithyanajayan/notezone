

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, LoginView, SubjectViewSet, NotesViewSet,AddNoteView
from . import views

router = DefaultRouter()
router.register(r'subjects', SubjectViewSet)
router.register(r'notes', NotesViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('recent-notes/', views.recent_notes, name="recent-notes"),
    path('dashboard-stats/', views.dashboard_stats, name="dashboard-stats"),
    path("notes/<int:pk>/download/", views.download_note, name="download-note"),
    path('notes/add/', AddNoteView.as_view(), name="add-note"),
    path("search-notes/", views.search_notes, name="search-notes"),
]
