import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, Heart, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { apiService } from '@/services/api';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Cart from '@/components/Cart';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCartStore();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => apiService.getProduct(Number(id)),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.title} added to your cart.`,
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-5 w-5 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="h-5 w-5 text-gray-300" />
        );
      }
    }
    
    return stars;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Card className="p-8 text-center">
            <CardContent>
              <h2 className="text-2xl font-bold text-destructive mb-4">
                Product Not Found
              </h2>
              <p className="text-muted-foreground mb-6">
                The product you're looking for doesn't exist or has been removed.
              </p>
              <Button onClick={() => navigate('/')}>
                Return to Home
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
        <Cart />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted shimmer rounded-lg" />
            </div>
            
            {/* Details Skeleton */}
            <div className="space-y-6">
              <div className="h-8 bg-muted shimmer rounded" />
              <div className="h-6 bg-muted shimmer rounded w-3/4" />
              <div className="h-4 bg-muted shimmer rounded w-1/2" />
              <div className="space-y-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted shimmer rounded" />
                ))}
              </div>
            </div>
          </div>
        ) : product ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Product Images */}
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square bg-surface flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Category */}
              <Badge variant="secondary" className="text-xs font-medium">
                {product.category.toUpperCase()}
              </Badge>

              {/* Title */}
              <h1 className="text-3xl font-bold text-foreground">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating.rate)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating.rate} ({product.rating.count} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              <Separator />

              {/* Quantity Selector */}
              <div className="space-y-4">
                <h3 className="font-semibold">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-10 w-10"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-10 w-10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <span className="text-sm text-muted-foreground">
                    Total: ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                
                <div className="flex space-x-4">
                  <Button variant="outline" className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    Save for Later
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <Card>
                <CardContent className="p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="font-medium">{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Availability:</span>
                    <span className="font-medium text-success">In Stock</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping:</span>
                    <span className="font-medium">Free shipping on orders over $50</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        ) : null}
      </main>
      
      <Footer />
      <Cart />
    </div>
  );
};

export default ProductDetail;