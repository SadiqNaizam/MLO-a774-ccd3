import React from 'react';
import { Star, StarHalf } from 'lucide-react'; // Using lucide-react for stars

interface ReviewStarsDisplayProps {
  rating: number; // Average rating, e.g., 4.5
  maxStars?: number;
  reviewCount?: number; // Optional: number of reviews
  size?: number; // Size of the star icons
  className?: string;
}

const ReviewStarsDisplay: React.FC<ReviewStarsDisplayProps> = ({
  rating,
  maxStars = 5,
  reviewCount,
  size = 16,
  className = '',
}) => {
  console.log("Rendering ReviewStarsDisplay, rating:", rating);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex" aria-label={`Rating: ${rating} out of ${maxStars} stars`}>
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} fill="currentColor" strokeWidth={0} className="text-yellow-400" size={size} />
        ))}
        {hasHalfStar && <StarHalf key="half" fill="currentColor" strokeWidth={0} className="text-yellow-400" size={size} />}
        {[...Array(Math.max(0, emptyStars))].map((_, i) => ( // Ensure emptyStars is not negative
          <Star key={`empty-${i}`} className="text-muted-foreground/50" strokeWidth={1} size={size} />
        ))}
      </div>
      {reviewCount !== undefined && (
        <span className="text-sm text-muted-foreground ml-1">
          ({reviewCount} review{reviewCount !== 1 ? 's' : ''})
        </span>
      )}
    </div>
  );
};
export default ReviewStarsDisplay;