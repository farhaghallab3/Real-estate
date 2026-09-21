from django.contrib import admin

from .models import Deal, DealStatusHistory


class DealStatusHistoryInline(admin.TabularInline):
    model = DealStatusHistory
    extra = 0
    can_delete = False
    readonly_fields = ["from_status", "to_status", "changed_by", "changed_at"]

    def has_add_permission(self, request, obj=None):
        return False


@admin.register(Deal)
class DealAdmin(admin.ModelAdmin):
    list_display = [
        "lead",
        "property",
        "salesperson",
        "status",
        "offer_amount",
        "expected_close_date",
    ]
    inlines = [DealStatusHistoryInline]
