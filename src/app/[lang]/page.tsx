

import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bike, Waves, Mountain, LifeBuoy, Tent, SunMoon, TicketPercent } from 'lucide-react';
import { GiHorseHead } from 'react-icons/gi';
import { FaCity, FaHotTub, FaTree } from 'react-icons/fa';

import HeroCarousel from '@/components/HeroCarousel';
import { servicesData } from '@/lib/servicesData';
import { ImageHandler } from '@/components/ui/image-handler';
import type { Metadata } from 'next';

type Props = {
  params: { lang: 'es' | 'en' };
};

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const dict = await getDictionary(lang);

  return {
    title: {
      absolute: 'Rio Sur Adventure | Turismo Aventura en Panguipulli, Chile'
    },
    description: dict.home.hero_subtitle,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        'es': '/es',
        'en': '/en',
      },
    },
    openGraph: {
      title: 'Rio Sur Adventure | Turismo Aventura en Panguipulli, Chile',
      description: dict.home.hero_subtitle,
      url: `/${lang}`,
    },
  };
}

const iconComponents: { [key: string]: React.ElementType } = {
  Waves,
  LifeBuoy,
  Mountain,
  Bike,
  GiHorseHead,
  Tent,
  SunMoon,
  FaCity,
  FaHotTub,
  FaTree,
};

const featuredServiceKeys = ['lake_expedition', 'hot_springs', 'rafting', 'night_tourism', 'canopy', 'hiking'];

export default async function HomePage({ params }: Props) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  const allServices = servicesData.map(service => {
    const IconComponent = iconComponents[service.icon];
    const title = dict.services[`${service.key}_title` as keyof typeof dict.services];
    return {
      ...service,
      title: title,
      description: dict.services[`${service.key}_description` as keyof typeof dict.services].substring(0, 100) + '...',
      icon: IconComponent ? <IconComponent className="h-10 w-10 text-primary" /> : null,
      imageUrl: service.imageUrls[0],
      alt: `Servicio de ${title} en Panguipulli`,
    };
  });

  const featuredServices = allServices.filter(service => featuredServiceKeys.includes(service.key));

  return (
    <main>
      {/* Hero Section with Carousel */}
      <section className="relative h-[60vh] md:h-[80vh] w-full">
        <HeroCarousel />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white p-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <Card 
                key={index} 
                className="flex flex-col overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="relative h-48 w-full">
                  <ImageHandler
                    src={service.imageUrl}
                    alt={service.alt}
                    fill
                    className="object-cover"
                    errorMessage={`Error loading image for service: ${service.title} (image: ${service.imageUrl})`}
                  />
                </div>
                <CardHeader className="items-center text-center">
                  {service.icon}
                  <CardTitle className="mt-4 text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-grow">
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href={`/${lang}/services`}>{dict.home.hero_cta}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Promotion Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{backgroundImage: "url('/servicios/senderismo2.jpg')"}}
        />
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-background/80 backdrop-blur-sm p-8 md:p-12 rounded-2xl border border-primary/20 shadow-2xl">
            <TicketPercent className="mx-auto h-16 w-16 text-accent mb-4" />
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
              {dict.home.featured_promotion_title}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {dict.home.featured_promotion_description}
            </p>
            <Button asChild size="lg" className="mt-8 bg-accent hover:bg-accent/90 text-accent-foreground animate-pulse hover:animate-none">
              <Link href={`/${lang}/promotions`}>{dict.home.featured_promotion_cta}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
