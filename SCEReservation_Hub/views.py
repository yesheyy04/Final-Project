from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import messages
from django.contrib.auth.models import User
from .models import Reservation, Rating


# ------------------------------
# Basic Pages
# ------------------------------

def index(request):
    return render(request, 'index.html')

def about_us(request):
    return render(request, "About_Us.html")

def sports_courts(request):
    return render(request, 'sports_courts.html')

def basketball_page(request):
    return render(request, "basketball.html")

def football_page(request):
    return render(request, "football.html")

def volleyball_page(request):
    return render(request, "volleyball.html")

def badminton_page(request):
    return render(request, "badminton.html")

def rooms(request):
    return render(request, 'rooms.html')

def multimedia_room(request):
    return render(request, 'multimedia.html')

def auditorium(request):
    return render(request, 'auditorium.html')

def conference_room(request):
    return render(request, 'conference.html')

def Contact(request):
    return render(request, "contact.html")


# ------------------------------
# Reservation Form Page
# ------------------------------

def reservation(request):
    return render(request, 'reservation_form.html')


# ------------------------------
# Handle Reservation Submission
# ------------------------------

def make_reservation(request):
    if request.method == "POST":
        name = request.POST['name']
        email = request.POST['email']
        resource = request.POST['resource']
        date = request.POST['date']
        start_time = request.POST['start_time']
        end_time = request.POST['end_time']

        # Check conflict
        conflict = Reservation.objects.filter(
            resource=resource,
            date=date,
            start_time__lt=end_time,
            end_time__gt=start_time
        ).exists()

        if conflict:
            return render(request, 'reservation_result.html', {
                'error': f"The {resource} is already booked for that time."
            })

        # Save reservation
        reservation = Reservation.objects.create(
            name=name,
            email=email,
            resource=resource,
            date=date,
            start_time=start_time,
            end_time=end_time
        )

        # Success page INCLUDING reservation object (important)
        return render(request, 'reservation_result.html', {
            'success': "Reservation confirmed!",
            'reservation': reservation
        })

    return redirect('reservation')


# ------------------------------
# AJAX Availability Check
# ------------------------------

def check_availability(request):
    resource = request.GET.get('resource')
    date = request.GET.get('date')
    start_time = request.GET.get('start_time')
    end_time = request.GET.get('end_time')

    exists = Reservation.objects.filter(
        resource=resource,
        date=date,
        start_time__lt=end_time,
        end_time__gt=start_time
    ).exists()

    return JsonResponse({'available': not exists})


# ------------------------------
# Submit Rating
# ------------------------------

def submit_rating(request):
    if request.method == 'POST':
        score = request.POST.get('rating')
        feedback = request.POST.get('feedback')

        # Optional: attach Django user if logged in
        user = request.user if request.user.is_authenticated else None

        Rating.objects.create(
            user=user,
            score=score,
            comment=feedback
        )

        messages.success(request, "Thank you for your feedback!")

        return redirect('index')

    return redirect('index')
