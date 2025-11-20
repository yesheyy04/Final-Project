from django.contrib import admin
from .models import Reservation, Rating

class ReservationAdmin(admin.ModelAdmin):
    list_display = ('name', 'resource', 'date', 'start_time', 'end_time', 'email')
    list_filter = ('resource', 'date')
    search_fields = ('name', 'email', 'resource')

# Unregister first if already registered
try:
    admin.site.unregister(Reservation)
except admin.sites.NotRegistered:
    pass

# Register Reservation with custom admin
admin.site.register(Reservation, ReservationAdmin)

# Register Rating
admin.site.register(Rating)
