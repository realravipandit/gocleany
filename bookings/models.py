from django.db import models
from django.contrib.auth.models import User
import uuid

class Booking(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('canceled', 'Canceled'),
    )
    
    SERVICE_CHOICES = (
        ('home', 'Home Cleaning'),
        ('office', 'Office Cleaning'),
        ('tenancy', 'End of Tenancy Cleaning'),
        ('airbnb', 'Airbnb & Holiday Let Cleaning'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='bookings')
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    service_type = models.CharField(max_length=20, choices=SERVICE_CHOICES)
    date = models.DateField()
    notes = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    cancel_reason = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Booking {self.id} - {self.name} - {self.service_type}"
    
    def get_service_name(self):
        return dict(self.SERVICE_CHOICES).get(self.service_type, self.service_type)

