import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Bike, Waves, Mountain } from 'lucide-react';

type Props = {
  params: { lang: string };
};

export default async function HomePage({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-home');
  const kayakImage = PlaceHolderImages.find(img => img.id === 'service-kayaking');
  const hikeImage = PlaceHolderImages.find(img => img.id === 'service-hiking');
  const bikeImage = PlaceHolderImages.find(img => img.id === 'service-biking');

  const services = [
    {
      icon: <Waves className="h-10 w-10 text-primary" />,
      title: dict.services.kayaking_title,
      description: dict.services.kayaking_description.substring(0, 100) + '...',
      image: kayakImage
    },
    {
      icon: <Mountain className="h-10 w-10 text-primary" />,
      title: dict.services.hiking_title,
      description: dict.services.hiking_description.substring(0, 100) + '...',
      image: hikeImage
    },
    {
      icon: <Bike className="h-10 w-10 text-primary" />,
      title: dict.services.biking_title,
      description: dict.services.biking_description.substring(0, 100) + '...',
      image: bikeImage
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl font-bold">
            {dict.home.hero_title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            {dict.home.hero_subtitle}
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href={`/${lang}/services`}>{dict.home.hero_cta}</Link>
          </Button>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            {dict.home.featured_services_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                {service.image && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={service.image.imageUrl}
                      alt={service.image.description}
                      fill
                      className="object-cover"
                      data-ai-hint={service.image.imageHint}
                    />
                  </div>
                )}
                <CardHeader className="items-center text-center">
                  {service.icon}
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">{service.description}</p>
                   <Button asChild variant="link" className="mt-4 text-primary">
                    <Link href={`/${lang}/services`}>{dict.services.book_now}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Promotion Section */}
      <section className="py-16 md:py-24 bg-card">
         <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-headline text-3xl md:text-4xl font-bold">
              {dict.home.featured_promotion_title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.home.featured_promotion_description}
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href={`/${lang}/promotions`}>{dict.home.featured_promotion_cta}</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
