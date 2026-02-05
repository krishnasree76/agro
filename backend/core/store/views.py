from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from .serializers import ProductSerializer


@api_view(["GET"])
def product_list(request):
    products = Product.objects.prefetch_related("quantities").all()
    serializer = ProductSerializer(products, many=True, context={"request": request})
    return Response(serializer.data)


@api_view(['GET'])
def product_list(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def category_list(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


# @api_view(['GET'])
# def gallery_list(request):
#     images = Gallery.objects.all()
#     serializer = GallerySerializer(images, many=True)
#     return Response(serializer.data)
