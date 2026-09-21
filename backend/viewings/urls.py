from rest_framework.routers import DefaultRouter

from .views import ViewingViewSet

router = DefaultRouter()
router.register("", ViewingViewSet, basename="viewing")

urlpatterns = router.urls
