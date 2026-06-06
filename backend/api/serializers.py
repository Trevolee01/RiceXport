from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import RiceProduct, Quote, Order

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """User serializer"""
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 
                  'company_name', 'phone', 'country', 'is_verified', 
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'is_verified', 'created_at', 'updated_at']


class RegisterSerializer(serializers.ModelSerializer):
    """Registration serializer"""
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password2', 
                  'first_name', 'last_name', 'company_name', 'phone', 'country']

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Passwords don't match"})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user


class RiceProductSerializer(serializers.ModelSerializer):
    """Rice Product serializer"""
    class Meta:
        model = RiceProduct
        fields = '__all__'


class QuoteSerializer(serializers.ModelSerializer):
    """Quote serializer"""
    user_email = serializers.EmailField(source='user.email', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Quote
        fields = '__all__'
        read_only_fields = ['user', 'product_price', 'freight', 'insurance', 
                            'documentation', 'total', 'valid_until', 'created_at', 'updated_at']


class OrderSerializer(serializers.ModelSerializer):
    """Order serializer"""
    user_email = serializers.EmailField(source='user.email', read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']
