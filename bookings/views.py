from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth import login, authenticate
from .models import Booking
from .forms import BookingForm, CancelBookingForm, SignUpForm

def signup(request):
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('my_bookings')
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})

def booking(request):
    if request.method == 'POST':
        form = BookingForm(request.POST)
        if form.is_valid():
            booking = form.save(commit=False)
            if request.user.is_authenticated:
                booking.user = request.user
            booking.save()
            
            # Send confirmation email to customer
            send_mail(
                'Booking Confirmation - GoCleeny',
                f'Thank you for booking with GoCleeny!\n\nBooking Details:\nService: {booking.get_service_name()}\nDate: {booking.date}\n\nIf you need to make any changes, please visit your My Bookings page.',
                'noreply@gocleeny.com',
                [booking.email],
                fail_silently=False,
            )
            
            # Send notification to admin
            send_mail(
                f'New Booking: {booking.id}',
                f'A new booking has been made:\n\nCustomer: {booking.name}\nEmail: {booking.email}\nPhone: {booking.phone}\nService: {booking.get_service_name()}\nDate: {booking.date}\nNotes: {booking.notes or "None"}',
                'noreply@gocleeny.com',
                ['gocleeny@gmail.com'],
                fail_silently=False,
            )
            
            messages.success(request, 'Your booking has been confirmed!')
            if request.user.is_authenticated:
                return redirect('my_bookings')
            else:
                return redirect('booking_success')
    else:
        form = BookingForm()
    
    return render(request, 'bookings/booking.html', {'form': form})

@login_required
def my_bookings(request):
    active_bookings = Booking.objects.filter(user=request.user, status='active').order_by('-date')
    history_bookings = Booking.objects.filter(user=request.user).exclude(status='active').order_by('-date')
    
    return render(request, 'bookings/my_bookings.html', {
        'active_bookings': active_bookings,
        'history_bookings': history_bookings
    })

@login_required
def cancel_booking(request, booking_id):
    booking = get_object_or_404(Booking, id=booking_id, user=request.user)
    
    if booking.status != 'active':
        messages.error(request, 'This booking cannot be canceled.')
        return redirect('my_bookings')
    
    if request.method == 'POST':
        form = CancelBookingForm(request.POST)
        if form.is_valid():
            reason = form.cleaned_data.get('reason')
            booking.status = 'canceled'
            booking.cancel_reason = reason
            booking.save()
            
            # Send cancellation confirmation to customer
            send_mail(
                'Booking Cancellation - GoCleeny',
                f'Your booking has been canceled successfully.\n\nBooking Details:\nService: {booking.get_service_name()}\nDate: {booking.date}\n\nWe hope to serve you again in the future!',
                'noreply@gocleeny.com',
                [booking.email],
                fail_silently=False,
            )
            
            # Send notification to admin
            send_mail(
                f'Booking Canceled: {booking.id}',
                f'A booking has been canceled:\n\nCustomer: {booking.name}\nEmail: {booking.email}\nService: {booking.get_service_name()}\nDate: {booking.date}\nReason: {reason or "No reason provided"}',
                'noreply@gocleeny.com',
                ['gocleeny@gmail.com'],
                fail_silently=False,
            )
            
            messages.success(request, 'Your booking has been canceled successfully.')
            return redirect('my_bookings')
    else:
        form = CancelBookingForm()
    
    return render(request, 'bookings/cancel_booking.html', {'booking': booking, 'form': form})

