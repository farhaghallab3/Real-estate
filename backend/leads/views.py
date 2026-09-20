from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, viewsets

from users.permissions import is_manager_or_admin

from .models import Lead
from .serializers import LeadSerializer


class LeadViewSet(viewsets.ModelViewSet):
    serializer_class = LeadSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["status", "assigned_to", "lead_type"]
    search_fields = ["name", "email", "phone"]

    def get_queryset(self):
        queryset = Lead.objects.select_related("assigned_to").all()
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
