from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    """Custom User model"""
    email = models.EmailField(unique=True)
    company_name = models.CharField(max_length=255, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    country = models.CharField(max_length=100, blank=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        return self.email


class RiceProduct(models.Model):
    """Rice Product model"""
    CATEGORY_CHOICES = [
        ('parboiled', 'Parboiled'),
        ('white', 'White Rice'),
        ('ofada', 'Ofada'),
        ('aromatic', 'Aromatic'),
        ('brown', 'Brown Rice'),
        ('broken', 'Broken Rice'),
    ]

    AVAILABILITY_CHOICES = [
        ('in_stock', 'In Stock'),
        ('limited', 'Limited Stock'),
        ('out_of_stock', 'Out of Stock'),
    ]

    name = models.CharField(max_length=255)
    variety = models.CharField(max_length=100)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    origin = models.CharField(max_length=255)
    moq = models.IntegerField(help_text="Minimum Order Quantity")
    moq_unit = models.CharField(max_length=20, default='ton')
    base_price = models.DecimalField(max_digits=10, decimal_places=2)
    price_per_ton = models.DecimalField(max_digits=10, decimal_places=2)
    availability = models.CharField(max_length=20, choices=AVAILABILITY_CHOICES, default='in_stock')
    available_qty = models.IntegerField(default=0)
    description = models.TextField()
    certifications = models.JSONField(default=list)
    specifications = models.JSONField(default=dict)
    harvest_date = models.DateField()
    batch_no = models.CharField(max_length=50, unique=True)
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=0.0)
    reviews_count = models.IntegerField(default=0)
    badge = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-created_at']


class Quote(models.Model):
    """Quote Request model"""
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='quotes')
    product = models.ForeignKey(RiceProduct, on_delete=models.CASCADE, related_name='quotes')
    quantity = models.IntegerField()
    unit = models.CharField(max_length=20, default='ton')
    destination_country = models.CharField(max_length=100)
    destination_port = models.CharField(max_length=255)
    delivery_date = models.DateField()
    requirements = models.TextField(blank=True)
    packaging = models.CharField(max_length=100, default='50kg bags')
    
    # Quote breakdown
    product_price = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    freight = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    insurance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    documentation = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    valid_until = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Quote #{self.id} - {self.user.email}"

    class Meta:
        ordering = ['-created_at']


class Order(models.Model):
    """Order model"""
    STATUS_CHOICES = [
        ('confirmed', 'Confirmed'),
        ('processing', 'Processing'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('unpaid', 'Unpaid'),
        ('partial', 'Partial'),
        ('paid', 'Paid'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    quote = models.ForeignKey(Quote, on_delete=models.SET_NULL, null=True, blank=True)
    product = models.ForeignKey(RiceProduct, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    destination_country = models.CharField(max_length=100)
    destination_port = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='confirmed')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='unpaid')
    tracking_number = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order #{self.id} - {self.user.email}"

    class Meta:
        ordering = ['-created_at']
