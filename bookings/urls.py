from django.urls import path
from . import views

urlpatterns = [
    path('booking/', views.booking, name='booking'),
    path('my-bookings/', views.my_bookings, name='my_bookings'),
    path('booking/<uuid:booking_id>/cancel/', views.cancel_booking, name='cancel_booking'),
    path('signup/', views.signup, name='signup'),
]

