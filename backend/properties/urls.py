from django.urls import path
from rest_framework.routers import DefaultRouter

from .views import PropertyImageDetailView, PropertyViewSet

router = DefaultRouter()
router.register("", PropertyViewSet, basename="property")

urlpatterns = [
    path(
        "<int:property_id>/images/<int:image_id>/",
        PropertyImageDetailView.as_view(),
        name="property-image-detail",
    ),
] + router.urls
