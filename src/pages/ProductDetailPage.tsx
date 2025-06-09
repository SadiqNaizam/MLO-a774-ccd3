import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import ProductImageGallery from '@/components/ProductImageGallery';
import VariantSelector from '@/components/VariantSelector';
import ReviewStarsDisplay from '@/components/ReviewStarsDisplay';
import ReviewListItem from '@/components/ReviewListItem';
import ProductCard from '@/components/ProductCard';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ShoppingCart, Heart } from 'lucide-react';

const ProductDetailPage = () => {
  console.log('ProductDetailPage loaded');

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    color: "blue",
    size: "m"
  });

  const productImages = [
    { src: 'https://source.unsplash.com/random/800x800?tech,product1', alt: 'Product View 1' },
    { src: 'https://source.unsplash.com/random/800x800?tech,product2', alt: 'Product View 2' },
    { src: 'https://source.unsplash.com/random/800x800?tech,product3', alt: 'Product View 3' },
    { src: 'https://source.unsplash.com/random/800x800?tech,product4', alt: 'Product View 4' },
  ];

  const variantGroups = [
    {
      id: "color", name: "Color", type: "radio" as const,
      options: [
        { id: "blue", name: "Ocean Blue", value: "blue", available: true },
        { id: "black", name: "Midnight Black", value: "black", available: true },
        { id: "silver", name: "Glacier Silver", value: "silver", available: false },
      ]
    },
    {
      id: "size", name: "Size", type: "select" as const,
      options: [
        { id: "s", name: "Small", value: "s", available: true },
        { id: "m", name: "Medium", value: "m", available: true },
        { id: "l", name: "Large", value: "l", available: true },
        { id: "xl", name: "Extra Large", value: "xl", available: false },
      ]
    }
  ];

  const reviews = [
    { id: 1, authorName: 'Alice Wonderland', authorAvatarUrl: 'https://source.unsplash.com/random/100x100?face,woman', date: '2024-07-15', rating: 5, title: 'Amazing Product!', comment: 'Absolutely love this! It exceeded all my expectations. Highly recommended.' },
    { id: 2, authorName: 'Bob The Builder', authorAvatarUrl: 'https://source.unsplash.com/random/100x100?face,man', date: '2024-07-10', rating: 4, title: 'Great Value', comment: 'Very good for the price. Works as expected. Delivery was quick.' },
    { id: 3, authorName: 'Charlie Brown', date: '2024-07-05', rating: 3, title: 'It\'s Okay', comment: 'Decent product, but I expected a bit more for the features. It does the job.' },
  ];

  const relatedProducts = [
    { id: 'rp1', name: 'Related Gadget Pro', price: 199.99, imageUrl: 'https://source.unsplash.com/random/400x300?gadget,related1', productUrl: '/product-detail/rp1', rating: 4.5, reviewCount: 75 },
    { id: 'rp2', name: 'Accessory Kit Plus', price: 49.50, imageUrl: 'https://source.unsplash.com/random/400x300?accessory,related2', productUrl: '/product-detail/rp2', rating: 4.0, reviewCount: 30 },
    { id: 'rp3', name: 'Another Cool Item', price: 120.00, imageUrl: 'https://source.unsplash.com/random/400x300?tech,related3', productUrl: '/product-detail/rp3', isNew: true },
  ];

  const handleVariantChange = (variantGroupId: string, optionValue: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantGroupId]: optionValue }));
    console.log(`Variant changed: ${variantGroupId} = ${optionValue}`);
  };

  const productName = "SynergyTech X1 Carbon Laptop";
  const productPrice = 1299.99;
  const productRating = 4.7;
  const productReviewCount = 125;
  const productDescription = "Experience unparalleled performance with the SynergyTech X1 Carbon. This ultra-light, ultra-powerful laptop is designed for professionals on the go. Featuring a stunning 14-inch QHD display, the latest Intel Core i7 processor, 16GB of RAM, and a 1TB NVMe SSD. Its sleek carbon fiber chassis is both durable and stylish. With an all-day battery life, backlit keyboard, and advanced security features, the X1 Carbon is your perfect companion for productivity and creativity.";

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu cartItemCount={1} isLoggedIn={true} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="/products">Laptops</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>{productName}</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <ProductImageGallery images={productImages} defaultImageSrc="https://via.placeholder.com/800x800/CCCCCC/FFFFFF?text=Product" />
          
          <div className="space-y-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{productName}</h1>
            <div className="flex items-center space-x-2">
              <ReviewStarsDisplay rating={productRating} reviewCount={productReviewCount} size={20}/>
            </div>
            <div>
              <Badge variant="outline" className="text-sm mr-2">SKU: STX1C-001</Badge>
              <Badge variant="secondary" className="text-sm">In Stock</Badge>
            </div>
            <p className="text-3xl font-semibold text-primary">${productPrice.toFixed(2)}</p>
            
            <VariantSelector
              variantGroups={variantGroups}
              selectedVariants={selectedVariants}
              onVariantChange={handleVariantChange}
            />
            
            <div>
              <label htmlFor="product-description" className="text-sm font-medium text-muted-foreground block mb-1">Description</label>
              <Textarea id="product-description" value={productDescription} readOnly rows={5} className="bg-muted/30"/>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-grow">
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-grow sm:flex-grow-0">
                <Heart className="mr-2 h-5 w-5" /> Add to Wishlist
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="reviews" className="mt-12">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 max-w-md">
            <TabsTrigger value="description_long">Full Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="description_long" className="py-6">
            <Card>
              <CardContent className="prose prose-sm sm:prose-base max-w-none p-6">
                <p>{productDescription}</p>
                <p>Further details about materials, manufacturing, and special features can be elaborated here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <ul>
                  <li>Feature A: High-performance bla bla.</li>
                  <li>Feature B: Eco-friendly materials.</li>
                  <li>Feature C: Extended warranty.</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="specifications" className="py-6">
            <Card>
              <CardHeader><h3 className="text-xl font-semibold">Technical Specifications</h3></CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><strong>Processor:</strong> Intel Core i7 (12th Gen)</li>
                  <li><strong>RAM:</strong> 16GB DDR5</li>
                  <li><strong>Storage:</strong> 1TB NVMe SSD</li>
                  <li><strong>Display:</strong> 14-inch QHD (2560x1440) IPS, Anti-glare</li>
                  <li><strong>Graphics:</strong> Intel Iris Xe Graphics</li>
                  <li><strong>Weight:</strong> 1.13 kg (2.49 lbs)</li>
                  <li><strong>OS:</strong> Windows 11 Pro</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="reviews" className="py-6">
            <Card>
              <CardHeader><h3 className="text-xl font-semibold">Customer Reviews</h3></CardHeader>
              <CardContent className="divide-y">
                {reviews.length > 0 ? (
                  reviews.map(review => <ReviewListItem key={review.id} {...review} />)
                ) : (
                  <p className="text-muted-foreground py-4">No reviews yet. Be the first to review this product!</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} {...product} onAddToCart={() => console.log('Add to cart:', product.id)} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;