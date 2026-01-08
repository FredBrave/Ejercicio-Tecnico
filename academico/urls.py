from django.urls import path, include
from rest_framework import routers
from academico import views

router = routers.DefaultRouter()
router.register(r'modalidades', views.ModalidadView, 'Modalidades')
urlpatterns = [
    path("api/v1_0_0/", include(router.urls))
]