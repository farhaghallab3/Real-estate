from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, viewsets

from users.permissions import is_manager_or_admin

from .models import Lead, LeadProperty
from .serializers import LeadDetailSerializer, LeadPropertySerializer, LeadSerializer


class LeadViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["status", "assigned_to", "lead_type"]
    search_fields = ["name", "email", "phone"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return LeadDetailSerializer
        return LeadSerializer

    def get_queryset(self):
        queryset = Lead.objects.select_related("assigned_to").all()
        if self.action == "retrieve":
            queryset = queryset.prefetch_related("property_interests__property")
        user = self.request.user
        if is_manager_or_admin(user):
            return queryset
        return queryset.filter(assigned_to=user)

    def perform_create(self, serializer):
        user = self.request.user
        if not serializer.validated_data.get("assigned_to") and not is_manager_or_admin(
            user
        ):
            serializer.save(assigned_to=user)
        else:
            serializer.save()


class LeadPropertyViewSet(viewsets.ModelViewSet):
    serializer_class = LeadPropertySerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "lead", "property"]

    def get_queryset(self):
        queryset = LeadProperty.objects.select_related(
            "lead", "lead__assigned_to", "property"
        ).all()
        user = self.request.user
        if is_manager_or_admin(user):
            return queryset
        return queryset.filter(lead__assigned_to=user)
