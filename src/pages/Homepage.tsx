import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Carousel from '@/components/Carousel';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  console.log('Homepage loaded');

  const carouselSlides = [
    { id: 1, content: <img src="https://source.unsplash.com/random/1200x500?technology,sale" alt="Tech Sale Banner" className="w-full h-full object-cover" />, altText: "Big Tech Sale" },
    { id: 2, content: <div className="w-full h-full bg-primary text-primary-foreground flex flex-col items-center justify-center p-8"><h2 className="text-4xl font-bold mb-4">New Arrivals</h2><p className="text-lg">Check out the latest gadgets!</p></div>, altText: "New Arrivals" },
    { id: 3, content: <img src="https://source.unsplash.com/random/1200x500?innovation,future" alt="Innovation Banner" className="w-full h-full object-cover" />, altText: "Future of Innovation" },
  ];

  const featuredProducts = [
    { id: 'fp1', name: 'Wireless Pro Headphones', price: 149.99, imageUrl: 'https://source.unsplash.com/random/400x300?headphones,product', productUrl: '/product-detail/fp1', category: 'Audio', rating: 4.8, reviewCount: 210, isNew: true },
    { id: 'fp2', name: 'Smart Fitness Tracker X5', price: 79.00, imageUrl: 'https://source.unsplash.com/random/400x300?smartwatch,product', productUrl: '/product-detail/fp2', category: 'Wearables', rating: 4.5, reviewCount: 150 },
    { id: 'fp3', name: 'Ultra HD 4K Webcam', price: 89.50, imageUrl: 'https://source.unsplash.com/random/400x300?webcam,product', productUrl: '/product-detail/fp3', category: 'Accessories', rating: 4.6, reviewCount: 95, discountPrice: 75.00 },
    { id: 'fp4', name: 'Portable Power Bank 20000mAh', price: 45.99, imageUrl: 'https://source.unsplash.com/random/400x300?powerbank,product', productUrl: '/product-detail/fp4', category: 'Mobile', rating: 4.7, reviewCount: 300 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu cartItemCount={0} isLoggedIn={false}/>
      <main className="flex-grow">
        <section className="mb-12">
          <Carousel slides={carouselSlides} options={{ loop: true }} autoplayOptions={{ delay: 5000 }} />
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-foreground">Featured Products</h2>
            <Button variant="link" asChild>
              <Link to="/products">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} {...product} onAddToCart={() => console.log('Add to cart (Homepage):', product.id)} />
            ))}
          </div>
        </section>

        <section className="bg-muted py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-4">Why Shop With Us?</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    Discover top-quality electronics, unbeatable prices, and exceptional customer service. We are committed to bringing you the latest technology.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="bg-card p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-primary mb-2">Latest Tech</h3>
                        <p className="text-sm text-muted-foreground">Curated selection of the newest gadgets and devices.</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-primary mb-2">Fast Shipping</h3>
                        <p className="text-sm text-muted-foreground">Get your orders delivered quickly and reliably.</p>
                    </div>
                    <div className="bg-card p-6 rounded-lg shadow">
                        <h3 className="text-xl font-semibold text-primary mb-2">Support 24/7</h3>
                        <p className="text-sm text-muted-foreground">Our team is here to help you around the clock.</p>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;