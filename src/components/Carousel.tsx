import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Card, CardContent } from "@/components/ui/card"; // Example usage of shadcn Card
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface CarouselSlide {
  id: string | number;
  content: React.ReactNode; // Can be an image, text, or a more complex component
  altText?: string; // For accessibility if content is an image
}

interface CarouselProps {
  slides: CarouselSlide[];
  options?: Parameters<typeof useEmblaCarousel>[0];
  autoplayOptions?: Parameters<typeof Autoplay>[0];
}

const Carousel: React.FC<CarouselProps> = ({
  slides,
  options = { loop: true },
  autoplayOptions = { delay: 4000, stopOnInteraction: false },
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);

  console.log("Rendering Carousel with slides:", slides.length);

  const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  if (!slides || slides.length === 0) {
    return <p className="text-center py-10">No slides to display.</p>;
  }

  return (
    <div className="relative w-full group">
      <div className="embla overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide) => (
            <div className="embla__slide flex-[0_0_100%] min-w-0" key={slide.id}>
              {/* Example: Wrap slide content in shadcn Card for consistent styling */}
              <Card className="m-1 shadow-none border-none bg-transparent">
                <CardContent className="flex aspect-[16/7] items-center justify-center p-0">
                  {/* Assuming slide.content could be an img tag or other elements */}
                  {typeof slide.content === 'string' && slide.content.startsWith('<img') ? (
                     <div dangerouslySetInnerHTML={{ __html: slide.content }} />
                  ) : (
                     slide.content
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {emblaApi && slides.length > 1 && (
        <>
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-background/70 hover:bg-background"
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-background/70 hover:bg-background"
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </>
      )}
       {/* Dots Indicator (Optional) */}
        {emblaApi && slides.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {emblaApi.scrollSnapList().map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi.scrollTo(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors 
                                    ${index === emblaApi.selectedScrollSnap() ? 'bg-primary' : 'bg-muted-foreground/50 hover:bg-muted-foreground'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        )}
    </div>
  );
};
export default Carousel;