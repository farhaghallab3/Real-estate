from datetime import timedelta

from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from users.permissions import is_manager_or_admin

from .models import Task
from .serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["task_type", "completed", "assigned_to", "lead", "property"]
    search_fields = ["title", "notes"]

    def get_queryset(self):
        queryset = Task.objects.select_related("assigned_to", "lead", "property")
        user = self.request.user
        if not is_manager_or_admin(user):
            queryset = queryset.filter(assigned_to=user)

        due = self.request.query_params.get("due")
        if due == "today":
            start = timezone.localtime(timezone.now()).replace(
                hour=0, minute=0, second=0, microsecond=0
            )
            end = start + timedelta(days=1)
            queryset = queryset.filter(due_date__gte=start, due_date__lt=end)
        elif due == "overdue":
            queryset = queryset.filter(due_date__lt=timezone.now(), completed=False)

        return queryset

    @action(detail=True, methods=["post"])
    def complete(self, request, pk=None):
        task = self.get_object()
        task.completed = True
        task.completed_at = timezone.now()
        task.save(update_fields=["completed", "completed_at"])
        return Response(self.get_serializer(task).data)
