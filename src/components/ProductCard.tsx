import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye } from 'lucide-react';
import ReviewStarsDisplay from './ReviewStarsDisplay'; // Assuming you have this component

interface ProductCardProps {
  id: string | number;
  name: string;
  price: number;
  imageUrl: string;
  productUrl: string; // Link to product detail page
  category?: string;
  rating?: number; // Optional average rating
  reviewCount?: number; // Optional review count
  onAddToCart?: (id: string | number) => void;
  isNew?: boolean;
  discountPrice?: number; // Optional discounted price
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  imageUrl,
  productUrl,
  category,
  rating,
  reviewCount,
  onAddToCart,
  isNew,
  discountPrice,
}) => {
  console.log("Rendering ProductCard:", name);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if card is wrapped in Link
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(id);
      console.log("Added to cart:", id);
      // Potentially use toast here
    }
  };

  return (
    <Card className="w-full overflow-hidden group transition-all duration-300 hover:shadow-xl relative">
      <Link to={productUrl} className="block">
        <CardHeader className="p-0 relative">
          <AspectRatio ratio={4 / 3}>
            <img
              src={imageUrl || '/placeholder.svg'}
              alt={name}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
          {(isNew || discountPrice) && (
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {isNew && <Badge variant="destructive">NEW</Badge>}
              {discountPrice && <Badge variant="secondary">SALE</Badge>}
            </div>
          )}
           <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <Button size="icon" variant="outline" asChild className="bg-background/80 hover:bg-background">
                <span aria-label="View Product"><Eye className="h-4 w-4" /></span>
             </Button>
           </div>
        </CardHeader>
        <CardContent className="p-4 space-y-2">
          {category && <p className="text-xs text-muted-foreground uppercase tracking-wider">{category}</p>}
          <h3 className="text-md font-semibold leading-tight group-hover:text-primary truncate">{name}</h3>
          {rating !== undefined && <ReviewStarsDisplay rating={rating} reviewCount={reviewCount} size={14} />}
          <div className="flex items-baseline gap-2">
            <p className={`text-lg font-bold text-primary ${discountPrice ? 'line-through text-muted-foreground text-sm' : ''}`}>
              ${price.toFixed(2)}
            </p>
            {discountPrice && (
                <p className="text-lg font-bold text-destructive">${discountPrice.toFixed(2)}</p>
            )}
          </div>
        </CardContent>
      </Link>
      {onAddToCart && (
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={handleAddToCart} variant="outline">
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
export default ProductCard;