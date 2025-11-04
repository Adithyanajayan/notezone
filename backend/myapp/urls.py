from django.contrib import admin
from django.urls import path
from myapp import views

urlpatterns = [
    path("api/text-to-pdf/", views.text_to_pdf_api, name="text_to_pdf_api"),
    
]

