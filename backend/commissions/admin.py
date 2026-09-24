from django.contrib import admin

from .models import Commission


@admin.register(Commission)
class CommissionAdmin(admin.ModelAdmin):
    list_display = [
        "deal",
        "salesperson",
        "sale_price",
        "gross_commission",
        "agent_commission",
        "status",
    ]
    readonly_fields = ["gross_commission", "agent_commission", "brokerage_split"]
