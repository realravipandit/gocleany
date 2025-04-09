from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from django.conf import settings

def home(request):
    return render(request, 'website/home.html')

def about(request):
    return render(request, 'website/about.html')

def services(request):
    return render(request, 'website/services.html')

def contact(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        message = request.POST.get('message')
        
        # Send email
        send_mail(
            f'Contact Form Submission from {name}',
            f'Name: {name}\nEmail: {email}\nMessage: {message}',
            email,
            ['gocleeny@gmail.com'],
            fail_silently=False,
        )
        
        messages.success(request, 'Your message has been sent successfully!')
        return redirect('contact')
    
    return render(request, 'website/contact.html')

def careers(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        position = request.POST.get('position')
        experience = request.POST.get('experience')
        message = request.POST.get('message')
        resume = request.FILES.get('resume')
        
        # In a real application, you would save the resume and send an email
        # with the resume attached
        
        messages.success(request, 'Your application has been submitted successfully!')
        return redirect('careers')
    
    return render(request, 'website/careers.html')

def franchising(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        location = request.POST.get('location')
        investment = request.POST.get('investment')
        message = request.POST.get('message')
        
        # Send email
        send_mail(
            f'Franchise Inquiry from {name}',
            f'Name: {name}\nEmail: {email}\nPhone: {phone}\nLocation: {location}\nInvestment: {investment}\nMessage: {message}',
            email,
            ['gocleeny@gmail.com'],
            fail_silently=False,
        )
        
        messages.success(request, 'Your franchise inquiry has been submitted successfully!')
        return redirect('franchising')
    
    return render(request, 'website/franchising.html')

