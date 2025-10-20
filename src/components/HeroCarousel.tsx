'use client';

import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

type HeroCarouselProps = {
  images: string[];
  altText: string;
};

export function HeroCarousel({ images, altText }: HeroCarouselProps) {
  return (
    <Carousel 
      className="w-full h-full"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 5000, // 5 seconds
        }),
      ]}
    >
      <CarouselContent className="h-full">
        {images.map((src, index) => (
          <CarouselItem key={index} className="h-full">
            <Image
              src={src}
              alt={`${altText} ${index + 1}`}
              fill
              priority={index === 0} // Prioritize the first image
              className="object-cover"
              sizes="100vw"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
