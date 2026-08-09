from django.contrib import admin
from .models import ContactMessage, Product, Service

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    readonly_fields = ('name', 'email', 'message', 'created_at')
    search_fields = ('name', 'email', 'message')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'link', 'is_featured', 'order', 'created_at')
    list_editable = ('order', 'is_featured')
    search_fields = ('name', 'description')

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'is_active', 'is_featured', 'order', 'created_at')
    list_editable = ('order', 'is_active', 'is_featured')
    search_fields = ('title', 'desc')
