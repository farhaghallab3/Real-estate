"""
Shared role-based permission helpers.

Any app (leads, properties, tasks, viewings, deals, commissions, ...) can
import from here to apply the same manager/admin-vs-salesperson rules
instead of re-implementing role checks.
"""

from rest_framework.permissions import BasePermission

from .models import User


def is_manager_or_admin(user):
    """True if `user` is authenticated and has manager/admin privileges."""
    return bool(
        user
        and user.is_authenticated
        and (user.role in (User.Role.MANAGER, User.Role.ADMIN) or user.is_superuser)
    )


class IsManagerOrAdmin(BasePermission):
    """Allows access only to authenticated managers/admins (or superusers)."""

    message = "Only managers or admins can perform this action."

    def has_permission(self, request, view):
        return is_manager_or_admin(request.user)
