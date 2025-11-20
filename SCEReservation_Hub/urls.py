from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about_us, name='about'),

    # -------- Sports Courts -------
    path('sports_courts/', views.sports_courts, name='sports'),
    path('sports/basketball/', views.basketball_page, name='basketball'),
    path('sports/football/', views.football_page, name='football'),
    path('sports/volleyball/', views.volleyball_page, name='volleyball'),
    path('sports/badminton/', views.badminton_page, name='badminton'),

    # -------- Rooms -------
    path('rooms/', views.rooms, name='rooms'),
    path('multimedia/', views.multimedia_room, name='multimedia'),
    path('auditorium/', views.auditorium, name='auditorium'),
    path('conference/', views.conference_room, name='conference'),

    # -------- Reservation -------
    path('reservation/', views.reservation, name='reservation'),
    path('make_reservation/', views.make_reservation, name='make_reservation'),
    path('check_availability/', views.check_availability, name='check_availability'),

    # -------- Contact -------
    path("contact/", views.Contact, name="contact"),

    # -------- Rating Submission -------
    path('submit_rating/', views.submit_rating, name='submit_rating'),

]
