from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import PermissionDenied
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response

from .models import Property, PropertyImage
from .permissions import IsPropertyEditorOrReadOnly, can_edit_property
from .serializers import (
    PropertyDetailSerializer,
    PropertyImageSerializer,
    PropertyImageUploadSerializer,
    PropertySerializer,
)


class PropertyViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, IsPropertyEditorOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["status", "property_type", "city", "bedrooms"]
    search_fields = ["title", "address", "city"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return PropertyDetailSerializer
        return PropertySerializer

    def get_queryset(self):
        queryset = Property.objects.select_related("assigned_to").prefetch_related(
            "images"
        )
        if self.action == "retrieve":
            queryset = queryset.prefetch_related("interested_leads__lead")
        return queryset

    @action(
        detail=True,
        methods=["post"],
        url_path="upload_image",
        parser_classes=[MultiPartParser, FormParser],
    )
    def upload_image(self, request, pk=None):
        property_obj = self.get_object()  # enforces IsPropertyEditorOrReadOnly
        serializer = PropertyImageUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        image = serializer.save(property=property_obj)
        return Response(
            PropertyImageSerializer(image, context={"request": request}).data,
            status=status.HTTP_201_CREATED,
        )


class PropertyImageDetailView(generics.DestroyAPIView):
    serializer_class = PropertyImageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        image = get_object_or_404(
            PropertyImage,
            pk=self.kwargs["image_id"],
            property_id=self.kwargs["property_id"],
        )
        if not can_edit_property(self.request.user, image.property):
            raise PermissionDenied(
                "You do not have permission to modify this property's images."
            )
        return image
