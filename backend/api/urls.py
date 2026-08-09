from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactMessageCreateView, ProductViewSet, ContactMessageAdminViewSet, AdminLoginView, ServiceViewSet

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'services', ServiceViewSet, basename='service')
router.register(r'admin/messages', ContactMessageAdminViewSet, basename='admin-message')

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', ContactMessageCreateView.as_view(), name='contact-create'),
    path('admin/login/', AdminLoginView.as_view(), name='admin-login'),
]
