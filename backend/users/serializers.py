from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserBriefSerializer(serializers.ModelSerializer):
    """Minimal {id, name} representation, for nesting on other models."""

    name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "name"]

    def get_name(self, obj):
        return obj.get_full_name() or obj.username
