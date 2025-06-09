import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReviewStarsDisplay from './ReviewStarsDisplay'; // Use the star display component

interface ReviewListItemProps {
  id: string | number;
  authorName: string;
  authorAvatarUrl?: string;
  date: string; // Or Date object, format as needed
  rating: number; // 0-5
  comment: string;
  title?: string; // Optional review title
}

const ReviewListItem: React.FC<ReviewListItemProps> = ({
  authorName,
  authorAvatarUrl,
  date,
  rating,
  comment,
  title,
}) => {
  console.log("Rendering ReviewListItem for author:", authorName);

  const getInitials = (name: string) => {
    const names = name.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    return initials;
  };

  return (
    <article className="py-6 border-b last:border-b-0">
      <div className="flex items-start space-x-3">
        <Avatar>
          <AvatarImage src={authorAvatarUrl} alt={authorName} />
          <AvatarFallback>{getInitials(authorName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">{authorName}</h4>
            <time dateTime={new Date(date).toISOString()} className="text-xs text-muted-foreground">
              {new Date(date).toLocaleDateString()}
            </time>
          </div>
          <ReviewStarsDisplay rating={rating} size={14} />
          {title && <h5 className="text-md font-medium text-foreground pt-1">{title}</h5>}
          <p className="text-sm text-muted-foreground whitespace-pre-line">{comment}</p>
        </div>
      </div>
    </article>
  );
};
export default ReviewListItem;