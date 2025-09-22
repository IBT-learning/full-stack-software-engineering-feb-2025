import { Card, CardContent } from '@/components/ui/card';

const ProductSkeleton = () => {
  return (
    <Card className="h-full overflow-hidden border-0 shadow-card">
      <CardContent className="p-0">
        {/* Image Skeleton */}
        <div className="aspect-square bg-muted shimmer" />
        
        {/* Content Skeleton */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <div className="h-3 w-20 bg-muted shimmer rounded" />
          
          {/* Title */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-muted shimmer rounded" />
            <div className="h-4 w-3/4 bg-muted shimmer rounded" />
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 w-4 bg-muted shimmer rounded" />
              ))}
            </div>
            <div className="h-3 w-8 bg-muted shimmer rounded" />
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="h-6 w-16 bg-muted shimmer rounded" />
            <div className="h-8 w-8 bg-muted shimmer rounded" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductSkeleton;