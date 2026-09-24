from rest_framework.permissions import SAFE_METHODS, BasePermission

from users.permissions import is_manager_or_admin


def can_edit_property(user, property_obj):
    """Managers/admins can edit any property; salespeople only their own."""
    return is_manager_or_admin(user) or property_obj.assigned_to_id == user.id


class IsPropertyEditorOrReadOnly(BasePermission):
    """
    Any authenticated user can read (list/retrieve) all properties.
    Writes (update/destroy/image upload) are limited to managers/admins
    or the salesperson the property is assigned to.
    """

    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return can_edit_property(request.user, obj)
