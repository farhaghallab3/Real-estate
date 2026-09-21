from django.conf import settings
from django.db import models

from leads.models import Lead
from properties.models import Property


class Deal(models.Model):
    class Status(models.TextChoices):
        VIEWING = "viewing", "Viewing"
        OFFER_MADE = "offer_made", "Offer made"
        NEGOTIATION = "negotiation", "Negotiation"
        UNDER_CONTRACT = "under_contract", "Under contract"
        CLOSED = "closed", "Closed"
        LOST = "lost", "Lost"

    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name="deals")
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="deals"
    )
    salesperson = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="deals"
    )
    offer_amount = models.DecimalField(max_digits=12, decimal_places=2)
    commission_rate = models.DecimalField(
        max_digits=5, decimal_places=2, help_text="percentage, e.g. 2.50 for 2.5%"
    )
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.VIEWING
    )
    expected_close_date = models.DateField(null=True, blank=True)
    closed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.lead.name} - {self.property.title} ({self.status})"


class DealStatusHistory(models.Model):
    deal = models.ForeignKey(
        Deal, on_delete=models.CASCADE, related_name="status_history"
    )
    from_status = models.CharField(max_length=20, blank=True)
    to_status = models.CharField(max_length=20)
    changed_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True
    )
    changed_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-changed_at"]
        verbose_name_plural = "deal status histories"

    def __str__(self):
        return f"{self.deal_id}: {self.from_status or '—'} → {self.to_status}"
