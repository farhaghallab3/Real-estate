import os

from django.contrib.auth import get_user_model
from rest_framework import serializers

from users.serializers import UserBriefSerializer

from .models import Property, PropertyImage

User = get_user_model()

VALID_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
VALID_IMAGE_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024


class PropertyImageSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(read_only=True)

    class Meta:
        model = PropertyImage
        fields = ["id", "image", "uploaded_at"]


class PropertyImageUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ["image"]

    def validate_image(self, value):
        ext = os.path.splitext(value.name)[1].lower()
        content_type = getattr(value, "content_type", None)
        if ext not in VALID_IMAGE_EXTENSIONS or content_type not in VALID_IMAGE_CONTENT_TYPES:
            raise serializers.ValidationError(
                "Unsupported file type. Only JPG, PNG, and WEBP images are allowed."
            )
        if value.size > MAX_IMAGE_SIZE_BYTES:
            raise serializers.ValidationError("Image must be 5MB or smaller.")
        return value


class PropertySerializer(serializers.ModelSerializer):
    assigned_to = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=False, allow_null=True
    )
    images = PropertyImageSerializer(many=True, read_only=True)

    class Meta:
        model = Property
        fields = [
            "id",
            "title",
            "address",
            "city",
            "price",
            "property_type",
            "bedrooms",
            "bathrooms",
            "area",
            "description",
            "status",
            "assigned_to",
            "images",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["assigned_to"] = (
            UserBriefSerializer(instance.assigned_to).data
            if instance.assigned_to
            else None
        )
        return representation
