import { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCartStore, Product } from '@/store/cartStore';
import { toast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem(product);
    toast({
      title: "Added to cart!",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="h-4 w-4 text-gray-300" />
        );
      }
    }
    
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <Card className="h-full overflow-hidden border-0 shadow-card hover:shadow-card-hover transition-all duration-300 bg-card hover:bg-card-hover">
          <CardContent className="p-0">
            {/* Product Image */}
            <div className="relative aspect-square overflow-hidden bg-surface">
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 shimmer rounded-t-lg" />
              )}
              
              {!imageError ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className={`w-full h-full object-contain transition-all duration-500 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
              
              {/* Quick Add Button - Appears on Hover */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <Button
                  onClick={handleAddToCart}
                  size="sm"
                  className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-lg"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Quick Add
                </Button>
              </motion.div>
            </div>

            {/* Product Info */}
            <div className="p-4 space-y-3">
              {/* Category */}
              <div className="text-xs font-medium text-primary uppercase tracking-wide">
                {product.category}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {product.title}
              </h3>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating.rate)}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.rating.count})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-card-foreground">
                  ${product.price.toFixed(2)}
                </span>
                
                <Button
                  onClick={handleAddToCart}
                  variant="outline"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-all duration-300 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default ProductCard;