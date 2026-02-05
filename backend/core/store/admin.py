from django.contrib import admin
from .models import Product, Category, ProductQuantity


# 🔹 Inline quantities inside Product page
class ProductQuantityInline(admin.TabularInline):
    model = ProductQuantity
    extra = 1


# 🔹 PRODUCT ADMIN
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductQuantityInline]

    list_display = (
        "name",
        "category",
        "display_base_price",
        "in_stock",
    )

    list_editable = ("in_stock",)
    list_filter = ("category", "in_stock")
    search_fields = ("name", "description")
    actions = ["mark_in_stock", "mark_out_of_stock"]

    def display_base_price(self, obj):
        first_qty = obj.quantities.first()
        if first_qty:
            return f"₹{first_qty.price} / {first_qty.unit}"
        return "No pricing"
    display_base_price.short_description = "Base Price"

    @admin.action(description="Mark selected products as In Stock")
    def mark_in_stock(self, request, queryset):
        queryset.update(in_stock=True)

    @admin.action(description="Mark selected products as Out of Stock")
    def mark_out_of_stock(self, request, queryset):
        queryset.update(in_stock=False)


# 🔹 SEPARATE PRODUCT QUANTITY MENU
@admin.register(ProductQuantity)
class ProductQuantityAdmin(admin.ModelAdmin):
    list_display = (
        "product",
        "value",
        "unit",
        "mrp",
        "price",
        "discount_amount_display",
        "discount_percent_display",
    )

    def discount_percent_display(self, obj):
        return f"{obj.discount_percent()} %"
    discount_percent_display.short_description = "Discount %"

    def discount_amount_display(self, obj):
        return f"₹{obj.discount_amount()}"
    discount_amount_display.short_description = "Discount ₹"



# 🔹 CATEGORY
admin.site.register(Category)
