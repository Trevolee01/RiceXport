from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, RiceProduct, Quote, Order


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ['email', 'username', 'first_name', 'last_name', 'company_name', 'is_verified', 'is_staff']
    list_filter = ['is_verified', 'is_staff', 'is_superuser']
    search_fields = ['email', 'username', 'first_name', 'last_name', 'company_name']
    ordering = ['-created_at']
    
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('company_name', 'phone', 'country', 'is_verified')}),
    )


@admin.register(RiceProduct)
class RiceProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'price_per_ton', 'availability', 'available_qty', 'rating']
    list_filter = ['category', 'availability']
    search_fields = ['name', 'batch_no']
    ordering = ['-created_at']


@admin.register(Quote)
class QuoteAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'product', 'quantity', 'total', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['user__email', 'product__name']
    ordering = ['-created_at']


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'product', 'quantity', 'amount', 'status', 'payment_status', 'created_at']
    list_filter = ['status', 'payment_status', 'created_at']
    search_fields = ['user__email', 'product__name', 'tracking_number']
    ordering = ['-created_at']
