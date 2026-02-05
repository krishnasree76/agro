from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name="products")
    image = models.ImageField(upload_to="products/")
    in_stock = models.BooleanField(default=True)

    def __str__(self):
        return self.name


# ✅ THIS MODEL WAS MISSING — ADD IT
class ProductQuantity(models.Model):
    product = models.ForeignKey(Product, related_name="quantities", on_delete=models.CASCADE)
    value = models.CharField(max_length=50)   # e.g. 1, 5, 500
    unit = models.CharField(max_length=50)    # kg, ltr, ml
    mrp = models.DecimalField(max_digits=10, decimal_places=2)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def discount_percent(self):
        if self.mrp and self.price:
            return round(((self.mrp - self.price) / self.mrp) * 100, 2)
        return 0

    def discount_amount(self):
        if self.mrp and self.price:
            return round(self.mrp - self.price, 2)
        return 0

    def __str__(self):
        return f"{self.product.name} - {self.value} {self.unit}"
