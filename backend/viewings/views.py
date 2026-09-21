from django.utils import timezone
from django.utils.dateparse import parse_datetime
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from users.permissions import is_manager_or_admin

from .models import Viewing
from .serializers import ViewingSerializer


def _parse_range_param(value):
    dt = parse_datetime(value) if value else None
    if dt and timezone.is_naive(dt):
        dt = timezone.make_aware(dt)
    return dt


class ViewingViewSet(viewsets.ModelViewSet):
    serializer_class = ViewingSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["status", "assigned_to", "lead", "property"]

    def get_queryset(self):
        queryset = Viewing.objects.select_related("lead", "property", "assigned_to")
        user = self.request.user
        if not is_manager_or_admin(user):
            queryset = queryset.filter(assigned_to=user)

        params = self.request.query_params
        if params.get("upcoming") == "true":
            queryset = queryset.filter(
                start_time__gt=timezone.now(), status=Viewing.Status.SCHEDULED
            )

        range_start = _parse_range_param(params.get("range_start"))
        if range_start:
            queryset = queryset.filter(start_time__gte=range_start)

        range_end = _parse_range_param(params.get("range_end"))
        if range_end:
            queryset = queryset.filter(start_time__lte=range_end)

        return queryset

    @action(detail=True, methods=["post"])
    def complete(self, request, pk=None):
        viewing = self.get_object()
        serializer = self.get_serializer(
            viewing, data={"status": Viewing.Status.COMPLETED}, partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
