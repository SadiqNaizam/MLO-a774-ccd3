import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Footer from '@/components/layout/Footer';
import Sidebar from '@/components/layout/Sidebar';
import ProductCard from '@/components/ProductCard';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ListFilter, LayoutGrid, LayoutList } from 'lucide-react';

const ProductListingPage = () => {
  console.log('ProductListingPage loaded');
  const [priceRange, setPriceRange] = useState<[number, number]>([50, 500]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); // Example state for view mode

  const products = Array.from({ length: 12 }).map((_, i) => ({
    id: `plp${i + 1}`,
    name: `Awesome Gadget ${i + 1}`,
    price: parseFloat((Math.random() * (1000 - 20) + 20).toFixed(2)),
    imageUrl: `https://source.unsplash.com/random/400x300?tech,item${i+1}`,
    productUrl: `/product-detail/plp${i + 1}`,
    category: i % 2 === 0 ? 'Electronics' : 'Accessories',
    rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)),
    reviewCount: Math.floor(Math.random() * 200),
    isNew: i % 4 === 0,
  }));

  // Placeholder for mobile filter state
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const FilterContent = () => (
     <>
        <div>
          <h3 className="text-md font-semibold mb-3">Category</h3>
          <div className="space-y-2">
            {['Smartphones', 'Laptops', 'Audio', 'Wearables', 'Gaming'].map(cat => (
              <div key={cat} className="flex items-center space-x-2">
                <Checkbox id={`cat-${cat.toLowerCase()}`} />
                <Label htmlFor={`cat-${cat.toLowerCase()}`} className="text-sm font-normal">{cat}</Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-md font-semibold mb-3">Price Range</h3>
          <Slider
            defaultValue={[priceRange[0], priceRange[1]]}
            max={1000}
            min={0}
            step={10}
            onValueChange={(value) => setPriceRange([value[0], value[1]])}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
        <Separator />
        <div>
            <h3 className="text-md font-semibold mb-3">Brand</h3>
             <Select>
                <SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="brand-a">Brand A</SelectItem>
                    <SelectItem value="brand-b">Brand B</SelectItem>
                    <SelectItem value="brand-c">Brand C</SelectItem>
                </SelectContent>
            </Select>
        </div>
         <Separator />
        <div>
            <h3 className="text-md font-semibold mb-3">Rating</h3>
            {/* Placeholder for star rating filter */}
            <div className="text-sm text-muted-foreground">Star Rating Filter (e.g., 4 stars & up)</div>
        </div>
     </>
  );


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <NavigationMenu cartItemCount={3} isLoggedIn={true}/>
      
      {/* Mobile Filter Drawer (conceptual, actual Drawer component from shadcn/ui can be used) */}
      {isMobileFiltersOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileFiltersOpen(false)}>
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-card p-6 z-50 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="space-y-6">
             <FilterContent />
            </div>
            <Button onClick={() => setIsMobileFiltersOpen(false)} className="w-full mt-6">Apply Filters</Button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <Sidebar title="Filter Products" className="hidden md:block">
           <FilterContent />
        </Sidebar>

        <main className="flex-grow">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbPage>All Products</BreadcrumbPage></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <div className="flex items-center gap-2">
               <Button variant="outline" size="icon" className="md:hidden" onClick={() => setIsMobileFiltersOpen(true)}>
                  <ListFilter className="h-4 w-4" />
                  <span className="sr-only">Filters</span>
                </Button>
              <Select defaultValue="popularity">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Average Rating</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                </SelectContent>
              </Select>
              <div className="hidden sm:flex"> {/* View mode toggles for larger screens */}
                  <Button variant={viewMode === 'grid' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('grid')}>
                      <LayoutGrid className="h-5 w-5" />
                  </Button>
                  <Button variant={viewMode === 'list' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('list')}>
                      <LayoutList className="h-5 w-5" />
                  </Button>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">Showing {products.length} products</p>

          <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' : 'grid-cols-1'}`}>
            {products.map(product => (
              <ProductCard
                key={product.id}
                {...product}
                onAddToCart={() => console.log('Add to cart (PLP):', product.id)}
                // Add className for list view if needed
                // className={viewMode === 'list' ? 'flex flex-row items-center' : ''} 
              />
            ))}
          </div>

          <Pagination className="mt-12">
            <PaginationContent>
              <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
              <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">2</PaginationLink></PaginationItem>
              <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
              <PaginationItem><PaginationEllipsis /></PaginationItem>
              <PaginationItem><PaginationNext href="#" /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListingPage;