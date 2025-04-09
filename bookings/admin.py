from django.contrib import admin
from .models import Booking

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'email', 'service_type', 'date', 'status', 'created_at')
    list_filter = ('status', 'service_type', 'date')
    search_fields = ('name', 'email', 'id')
    readonly_fields = ('id', 'created_at', 'updated_at')
    date_hierarchy = 'date'

