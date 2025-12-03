
import Link from 'next/link';
import { getDictionary } from '@/lib/dictionary';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { servicesData } from '@/lib/servicesData';
import { ImageHandler } from '@/components/ui/image-handler';
import type { Metadata } from 'next';

type Props = {
  params: { lang: 'es' | 'en' };
};

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const dict = await getDictionary(lang);
  const title = dict.services.title;
  const description = dict.services.description;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `/${lang}/services`,
      languages: {
        'es': '/es/services',
        'en': '/en/services',
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: `/${lang}/services`,
    },
  };
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  const services = servicesData.map(s => {
    const title = dict.services[`${s.key}_title` as keyof typeof dict.services];
    return {
      ...s,
      title: title,
      description: dict.services[`${s.key}_description` as keyof typeof dict.services],
      slug: lang === 'es' ? s.slug_es : s.slug_en,
      alt: `Imágenes del servicio de ${title} en Panguipulli`,
    }
  });

  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{dict.services.title}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{dict.services.description}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="relative h-64 w-full bg-secondary">
              {service.imageUrls.length > 1 ? (
                <Carousel className="w-full h-full">
                  <CarouselContent>
                    {service.imageUrls.map((src, i) => (
                      <CarouselItem key={i}>
                        <div className="relative h-64 w-full">
                          <ImageHandler
                            src={src}
                            alt={`${service.alt}, imagen ${i + 1}`}
                            fill
                            className="object-contain"
                            priority={index < 2}
                            errorMessage={`Error loading image for service: ${service.title} (image: ${src})`}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80" />
                </Carousel>
              ) : (
                <ImageHandler
                  src={service.imageUrls[0]}
                  alt={service.alt}
                  fill
                  className="object-contain"
                  errorMessage={`Error loading image for service: ${service.title} (image: ${service.imageUrls[0]})`}
                />
              )}
            </div>
            <div className="flex flex-col flex-grow p-6">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-primary hover:bg-primary/90">
                  {service.slug ? (
                    <Link href={`/${lang}/services/${service.slug}`}>
                      {dict.services.view_details}
                    </Link>
                  ) : (
                    <Link href={`/${lang}/contact-us?service=${encodeURIComponent(service.title)}`}>
                      {dict.services.book_now}
                    </Link>
                  )}
                </Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
