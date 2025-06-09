import React, { useState, useEffect } from 'react';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card"; // For thumbnail container styling

interface ImageItem {
  src: string;
  alt: string;
}

interface ProductImageGalleryProps {
  images: ImageItem[];
  defaultImageSrc?: string; // Fallback if images array is empty or main image fails
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, defaultImageSrc = '/placeholder.svg' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("Rendering ProductImageGallery, current index:", currentIndex);

  useEffect(() => {
    // Reset to first image if images prop changes and new index is out of bounds
    if (images && images.length > 0 && currentIndex >= images.length) {
      setCurrentIndex(0);
    }
  }, [images, currentIndex]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full">
        <AspectRatio ratio={1}> {/* Default to square aspect ratio */}
          <img
            src={defaultImageSrc}
            alt="Placeholder product image"
            className="object-cover w-full h-full rounded-lg border"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        <p className="text-sm text-muted-foreground text-center mt-2">No images available.</p>
      </div>
    );
  }

  const currentImage = images[currentIndex];

  const handleThumbnailClick = (index: number) => {
    console.log("Thumbnail clicked, new index:", index);
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <Card className="overflow-hidden">
        <AspectRatio ratio={1}> {/* Adjust ratio as needed, e.g., 4/3 or 16/9 */}
          <img
            src={currentImage?.src || defaultImageSrc}
            alt={currentImage?.alt || 'Main product image'}
            className="object-cover w-full h-full transition-opacity duration-300"
            onError={(e) => {
              e.currentTarget.src = defaultImageSrc;
              e.currentTarget.alt = 'Error loading image';
            }}
          />
        </AspectRatio>
      </Card>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`block rounded-md overflow-hidden border-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
                ${index === currentIndex ? 'border-primary' : 'border-transparent hover:border-muted-foreground/50'}`}
              aria-label={`View image ${index + 1} of ${images.length}`}
            >
              <AspectRatio ratio={1}>
                <img
                  src={image.src || defaultImageSrc}
                  alt={image.alt || `Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                  onError={(e) => (e.currentTarget.src = defaultImageSrc)}
                />
              </AspectRatio>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
export default ProductImageGallery;