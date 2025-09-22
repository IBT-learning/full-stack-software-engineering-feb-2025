import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCartStore } from '@/store/cartStore';
import { toast } from '@/hooks/use-toast';

const Cart = () => {
  const navigate = useNavigate();
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCartStore();

  const [removingItems, setRemovingItems] = useState<Set<number>>(new Set());

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId: number) => {
    setRemovingItems(prev => new Set(prev).add(productId));
    
    setTimeout(() => {
      removeItem(productId);
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
      
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    }, 300);
  };

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="space-y-4">
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Shopping Cart ({totalItems})</span>
            </span>
            {items.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCart}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            <AnimatePresence>
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Add some products to get started
                  </p>
                  <Button onClick={closeCart} variant="outline">
                    Continue Shopping
                  </Button>
                </motion.div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, x: -100 }}
                    className={`flex space-x-4 p-4 bg-card rounded-lg border ${
                      removingItems.has(item.id) ? 'opacity-50' : ''
                    }`}
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-16 h-16 bg-surface rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-card-foreground truncate">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        ${item.price.toFixed(2)} each
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Price and Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      
                      <span className="font-semibold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              {/* Total */}
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary-hover text-primary-foreground"
                  size="lg"
                >
                  Checkout
                </Button>
                
                <Button
                  onClick={closeCart}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;