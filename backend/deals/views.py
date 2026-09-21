from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from users.permissions import is_manager_or_admin

from .models import Deal
from .serializers import DealDetailSerializer, DealSerializer


class DealViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "salesperson", "lead", "property"]

    def get_serializer_class(self):
        if self.action == "retrieve":
            return DealDetailSerializer
        return DealSerializer

    def get_queryset(self):
        queryset = Deal.objects.select_related("lead", "property", "salesperson")
        if self.action == "retrieve":
            queryset = queryset.prefetch_related("status_history__changed_by")
        user = self.request.user
        if is_manager_or_admin(user):
            return queryset
        return queryset.filter(salesperson=user)

    @action(detail=True, methods=["post"])
    def close(self, request, pk=None):
        outcome = request.data.get("outcome")
        if outcome not in (Deal.Status.CLOSED, Deal.Status.LOST):
            return Response(
                {"outcome": "Must be 'closed' or 'lost'."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        deal = self.get_object()
        serializer = self.get_serializer(deal, data={"status": outcome}, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
