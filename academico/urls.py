from django.urls import path, include
from rest_framework import routers
from academico import views

router = routers.DefaultRouter()
router.register(r'modalidades', views.ModalidadView, basename='modalidades')
router.register(r'carreras', views.CarreraView, basename='carreras')

urlpatterns = [
    path('v1_0_0/', include(router.urls)),
]