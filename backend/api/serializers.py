from rest_framework import serializers
from .models import ContactMessage, Product, Service

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'message', 'created_at']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'features', 'link', 'is_featured', 'order', 'created_at']

class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = ['id', 'title', 'desc', 'price', 'features', 'is_active', 'is_featured', 'order', 'created_at']
