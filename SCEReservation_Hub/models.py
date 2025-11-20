from django.db import models

class Reservation(models.Model):
    RESOURCE_CHOICES = [
        ('Auditorium', 'Auditorium'),
        ('Conference Hall', 'Conference Hall'),
        ('Multimedia Room', 'Multimedia Room'),
        ('Basketball Court', 'Basketball Court'),
        ('Football Court', 'Football Court'),
        ('Volleyball Court', 'Volleyball Court'),
        ('Badminton Hall', 'Badminton Hall'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField()
    resource = models.CharField(max_length=50, choices=RESOURCE_CHOICES)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"{self.name} - {self.resource} on {self.date} from {self.start_time} to {self.end_time}"
    
from django.db import models
from django.contrib.auth.models import User

class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    score = models.PositiveSmallIntegerField(default=0)  # 1-5 stars
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} - {self.score} stars"