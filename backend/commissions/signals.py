from decimal import Decimal

from django.db.models.signals import post_save
from django.dispatch import receiver

from deals.models import Deal

from .models import Commission


@receiver(post_save, sender=Deal)
def create_commission_on_deal_closed(sender, instance, **kwargs):
    if instance.status != Deal.Status.CLOSED:
        return
    Commission.objects.get_or_create(
        deal=instance,
        defaults={
            "salesperson": instance.salesperson,
            "sale_price": instance.offer_amount,
            "commission_rate": instance.commission_rate,
            "agent_split": Decimal("50.00"),
        },
    )
