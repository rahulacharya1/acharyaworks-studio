import os
from rest_framework import generics, viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.core.mail import send_mail
from django.conf import settings
from .models import ContactMessage, Product, Service
from .serializers import ContactMessageSerializer, ProductSerializer, ServiceSerializer

class AdminLoginView(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.validated_data['user']
            # Only allow staff or superusers to obtain an admin token
            if not user.is_staff and not user.is_superuser:
                return Response(
                    {"detail": "You do not have administrative privileges."},
                    status=status.HTTP_403_FORBIDDEN
                )
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'username': user.username,
                'email': user.email,
                'is_staff': user.is_staff
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

class ContactMessageAdminViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [IsAuthenticated]
    # Restrict inbox viewset methods to read and delete only
    http_method_names = ['get', 'delete', 'head', 'options']

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        instance = serializer.save()
        
        # Prepare email details
        subject = f"New AcharyaWorks Inquiry from {instance.name}"
        message_body = (
            f"You received a new inquiry on AcharyaWorks.in:\n\n"
            f"Sender Name: {instance.name}\n"
            f"Sender Email: {instance.email}\n\n"
            f"Message/Description:\n"
            f"----------------------------------------\n"
            f"{instance.message}\n"
            f"----------------------------------------\n\n"
            f"Received at: {instance.created_at.strftime('%Y-%m-%d %H:%M:%S')} UTC\n"
        )
        
        receiver_email = os.getenv('CONTACT_RECEIVER_EMAIL', 'rahulkumaracharya199@gmail.com')
        
        # Safely trigger SMTP delivery
        try:
            send_mail(
                subject=subject,
                message=message_body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[receiver_email],
                fail_silently=False,
            )
        except Exception as e:
            print(f"SMTP Dispatch Error: {e}")

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
