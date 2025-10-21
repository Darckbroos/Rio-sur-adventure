import Image from 'next/image';
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bike, Waves, Mountain, LifeBuoy, Tent, SunMoon } from 'lucide-react';
import { GiHorseHead } from 'react-icons/gi';

import HeroCarousel from '@/components/HeroCarousel';
import KayakImage from '../../../public/servicios/skayak2.jpg';
import HikingImage from '../../../public/servicios/senderismo.jpg';
import BikingImage from '../../../public/servicios/ciclismo.jpg';
import RaftingImage from '../../../public/servicios/srafting.jpg';
import CampingImage from '../../../public/servicios/camping.jpg';
import HorsebackImage from '../../../public/servicios/senderismo2.jpg';
import LakeImage from '../../../public/servicios/skayak.jpg';

type Props = { params: Promise<{ lang: string }> };

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const services = [
    {
      icon: <Waves className="h-10 w-10 text-primary" />,
      title: dict.services.kayaking_title,
      description: dict.services.kayaking_description.substring(0, 100) + '...',
      imageUrl: KayakImage,
      alt: 'Persona en kayak en un río rodeado de naturaleza.',
    },
    {
      icon: <LifeBuoy className="h-10 w-10 text-primary" />,
      title: dict.services.rafting_title,
      description: dict.services.rafting_description.substring(0, 100) + '...',
      imageUrl: RaftingImage,
      alt: 'Grupo de personas haciendo rafting en aguas bravas.',
    },
    {
      icon: <Mountain className="h-10 w-10 text-primary" />,
      title: dict.services.hiking_title,
      description: dict.services.hiking_description.substring(0, 100) + '...',
      imageUrl: HikingImage,
      alt: 'Persona caminando por un sendero de montaña con vistas espectaculares.',
    },
    {
      icon: <Bike className="h-10 w-10 text-primary" />,
      title: dict.services.biking_title,
      description: dict.services.biking_description.substring(0, 100) + '...',
      imageUrl: BikingImage,
      alt: 'Ciclista de montaña descendiendo por un sendero boscoso.',
    },
    {
      icon: <GiHorseHead className="h-10 w-10 text-primary" />,
      title: dict.services.horseback_riding_title,
      description: dict.services.horseback_riding_description.substring(0, 100) + '...',
      imageUrl: HorsebackImage,
      alt: 'Persona a caballo en un paisaje montañoso.',
    },
    {
      icon: <Waves className="h-10 w-10 text-primary" />,
      title: dict.services.lake_expedition_title,
      description: dict.services.lake_expedition_description.substring(0, 100) + '...',
      imageUrl: LakeImage,
      alt: 'Bote en un lago cristalino frente a montañas.',
    },
    {
      icon: <Tent className="h-10 w-10 text-primary" />,
      title: dict.services.camping_title,
      description: dict.services.camping_description.substring(0, 100) + '...',
      imageUrl: CampingImage,
      alt: 'Tienda de campaña bajo las estrellas.',
    },
    {
      icon: <SunMoon className="h-10 w-10 text-primary" />,
      title: dict.services.night_tourism_title,
      description: dict.services.night_tourism_description.substring(0, 100) + '...',
      imageUrl: HikingImage, // Re-using image, should be updated
      alt: 'Bosque de noche con estrellas visibles.',
    }
  ];

  return (
    <div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-48 w-full">
                  <Image
                    src={service.imageUrl}
                    alt={service.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="items-center text-center">
                  {service.icon}
                  <CardTitle className="mt-4 text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center flex-grow flex flex-col">
                  <p className="text-muted-foreground flex-grow">{service.description}</p>
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
