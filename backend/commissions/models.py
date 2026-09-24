from decimal import ROUND_HALF_UP, Decimal

from django.conf import settings
from django.db import models

from deals.models import Deal

TWO_PLACES = Decimal("0.01")


class Commission(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        APPROVED = "approved", "Approved"
        PAID = "paid", "Paid"

    deal = models.OneToOneField(
        Deal, on_delete=models.CASCADE, related_name="commission"
    )
    salesperson = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="commissions"
    )
    sale_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        help_text="copied from deal.offer_amount at calculation time",
    )
    commission_rate = models.DecimalField(
        max_digits=5, decimal_places=2, help_text="copied from deal.commission_rate"
    )
    gross_commission = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        editable=False,
        help_text="calculated: sale_price * commission_rate / 100",
    )
    agent_split = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=Decimal("50.00"),
        help_text="percentage of gross commission going to the agent",
    )
    agent_commission = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        editable=False,
        help_text="calculated: gross_commission * agent_split / 100",
    )
    brokerage_split = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        editable=False,
        help_text="calculated: 100 - agent_split",
    )
    status = models.CharField(
        max_length=20, choices=Status.choices, default=Status.PENDING
    )
    paid_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Commission for deal #{self.deal_id}"

    def save(self, *args, **kwargs):
        self.gross_commission = (
            self.sale_price * self.commission_rate / Decimal("100")
        ).quantize(TWO_PLACES, rounding=ROUND_HALF_UP)
        self.agent_commission = (
            self.gross_commission * self.agent_split / Decimal("100")
        ).quantize(TWO_PLACES, rounding=ROUND_HALF_UP)
        self.brokerage_split = Decimal("100") - self.agent_split
        super().save(*args, **kwargs)
