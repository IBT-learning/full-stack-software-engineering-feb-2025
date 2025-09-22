import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, SortAsc } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { apiService } from '@/services/api';
import { Product } from '@/store/cartStore';

interface ProductGridProps {
  searchQuery?: string;
  selectedCategory?: string;
}

const ProductGrid = ({ searchQuery: externalSearchQuery, selectedCategory }: ProductGridProps) => {
  const [searchQuery, setSearchQuery] = useState(externalSearchQuery || '');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | 'rating'>('name');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products
  const { data: products = [], isLoading, error } = useQuery({
    queryKey: ['products', selectedCategory],
    queryFn: () => selectedCategory 
      ? apiService.getProductsByCategory(selectedCategory)
      : apiService.getProducts(30),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Fetch categories for filter
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: apiService.getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating.rate - a.rating.rate;
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchQuery, sortBy]);

  // Handle external search query changes
  useMemo(() => {
    if (externalSearchQuery !== undefined) {
      setSearchQuery(externalSearchQuery);
    }
  }, [externalSearchQuery]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-bold text-destructive mb-4">
              Failed to Load Products
            </h2>
            <p className="text-muted-foreground mb-6">
              We're having trouble loading products. Please try again later.
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          {selectedCategory ? 
            `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` : 
            'All Products'
          }
        </h1>
        <p className="text-muted-foreground">
          {isLoading ? 'Loading...' : `${filteredAndSortedProducts.length} products found`}
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        {/* Search and Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border rounded-lg p-4 bg-card"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Sort */}
              <div>
                <label className="text-sm font-medium mb-2 block">Sort By</label>
                <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Category Filter (if not already filtered) */}
              {!selectedCategory && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Price Range */}
              <div>
                <label className="text-sm font-medium mb-2 block">Price Range</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="All Prices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="0-25">$0 - $25</SelectItem>
                    <SelectItem value="25-50">$25 - $50</SelectItem>
                    <SelectItem value="50-100">$50 - $100</SelectItem>
                    <SelectItem value="100+">$100+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          : filteredAndSortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))
        }
      </div>

      {/* No Results */}
      {!isLoading && filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            No products found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;