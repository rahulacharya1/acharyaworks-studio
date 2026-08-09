from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.email}"

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    features = models.JSONField(default=list, help_text="List of features/technologies as JSON array")
    link = models.CharField(max_length=500, default="#")
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0, help_text="Ascending sort order")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.name

class Service(models.Model):
    title = models.CharField(max_length=255)
    desc = models.TextField()
    price = models.CharField(max_length=100)
    features = models.JSONField(default=list, help_text="List of service capabilities as JSON array")
    is_active = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    order = models.IntegerField(default=0, help_text="Ascending sort order")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return self.title
