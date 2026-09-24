from datetime import timedelta

from django.contrib.auth import get_user_model
from django.utils import timezone
from rest_framework import serializers

from leads.models import Lead
from leads.serializers import LeadBriefSerializer
from properties.models import Property
from tasks.models import Task
from users.serializers import UserBriefSerializer

from .models import Viewing

User = get_user_model()


class PropertyBriefSerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = ["id", "title"]


class ViewingSerializer(serializers.ModelSerializer):
    lead = serializers.PrimaryKeyRelatedField(queryset=Lead.objects.all())
    property = serializers.PrimaryKeyRelatedField(queryset=Property.objects.all())
    assigned_to = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Viewing
        fields = [
            "id",
            "lead",
            "property",
            "assigned_to",
            "start_time",
            "end_time",
            "status",
            "feedback",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["lead"] = LeadBriefSerializer(instance.lead).data
        representation["property"] = PropertyBriefSerializer(instance.property).data
        representation["assigned_to"] = UserBriefSerializer(instance.assigned_to).data
        return representation

    def validate(self, attrs):
        instance = self.instance
        start_time = attrs.get(
            "start_time", instance.start_time if instance else None
        )
        end_time = attrs.get("end_time", instance.end_time if instance else None)
        assigned_to = attrs.get(
            "assigned_to", instance.assigned_to if instance else None
        )

        if start_time and end_time and end_time <= start_time:
            raise serializers.ValidationError(
                {"end_time": "End time must be after start time."}
            )

        if assigned_to and start_time and end_time:
            conflicts = Viewing.objects.filter(
                assigned_to=assigned_to,
                status=Viewing.Status.SCHEDULED,
                start_time__lt=end_time,
                end_time__gt=start_time,
            )
            if instance:
                conflicts = conflicts.exclude(pk=instance.pk)
            if conflicts.exists():
                raise serializers.ValidationError(
                    "This agent already has a scheduled viewing that overlaps "
                    "this time range."
                )

        return attrs

    def update(self, instance, validated_data):
        previous_status = instance.status
        viewing = super().update(instance, validated_data)
        if (
            previous_status != Viewing.Status.COMPLETED
            and viewing.status == Viewing.Status.COMPLETED
        ):
            self._create_follow_up_task(viewing)
        return viewing

    @staticmethod
    def _create_follow_up_task(viewing):
        Task.objects.create(
            title=f"Follow up after viewing: {viewing.property.title}",
            task_type=Task.TaskType.FOLLOW_UP,
            assigned_to=viewing.assigned_to,
            lead=viewing.lead,
            due_date=timezone.now() + timedelta(days=1),
        )
