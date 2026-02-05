from rest_framework import serializers
from .models import Product, Category, ProductQuantity


# 🔹 CATEGORY
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]


# 🔹 PRODUCT QUANTITY (NEW)
class ProductQuantitySerializer(serializers.ModelSerializer):
    discount = serializers.SerializerMethodField()

    class Meta:
        model = ProductQuantity
        fields = ["id", "value", "unit", "mrp", "price", "discount"]

    def get_discount(self, obj):
        # Calculate discount automatically
        return round(obj.mrp - obj.price, 2)


# 🔹 PRODUCT
class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    quantities = ProductQuantitySerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "name",
            "description",
            "image",
            "in_stock",
            "category",
            "quantities",
        ]
