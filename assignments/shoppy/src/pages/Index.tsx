import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductGrid from '@/components/ProductGrid';
import Cart from '@/components/Cart';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-light to-surface py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Welcome to <span className="text-primary">ShopHub</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Discover amazing products at unbeatable prices. Shop with confidence and enjoy fast, free shipping on orders over $50.
            </p>
          </div>
        </section>

        {/* Products Section */}
        <ProductGrid searchQuery={searchQuery} />
      </main>
      
      <Footer />
      <Cart />
    </div>
  );
};

export default Index;
