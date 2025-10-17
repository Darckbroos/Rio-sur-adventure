import Image from 'next/image';
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

// Import local images for all services
import KayakImage1 from '@/../public/servicios/skayak.jpg';
import KayakImage2 from '@/../public/servicios/skayak2.jpg';
import RaftingImage1 from '@/../public/servicios/srafting.jpg';
import RaftingImage2 from '@/../public/servicios/srafting2.jpg';
import HikingImage1 from '@/../public/servicios/senderismo.jpg';
import HikingImage2 from '@/../public/servicios/senderismo2.jpg';
import BikingImage from '@/../public/servicios/ciclismo.jpg';
import CampingImage from '@/../public/servicios/camping.jpg';

type Props = { params: Promise<{ lang: string }> };

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const services = [
    {
      title: dict.services.kayaking_title,
      description: dict.services.kayaking_description,
      alt: "Imágenes del servicio de kayak",
      imageUrls: [KayakImage1, KayakImage2],
    },
    {
      title: dict.services.rafting_title,
      description: dict.services.rafting_description,
      alt: "Imágenes del servicio de rafting",
      imageUrls: [RaftingImage1, RaftingImage2],
    },
    {
      title: dict.services.hiking_title,
      description: dict.services.hiking_description,
      alt: "Imágenes del servicio de senderismo",
      imageUrls: [HikingImage1, HikingImage2],
    },
    {
      title: dict.services.biking_title,
      description: dict.services.biking_description,
      alt: "Imagen del servicio de ciclismo de montaña",
      imageUrls: [BikingImage],
    },
    {
      title: dict.services.camping_title,
      description: dict.services.camping_description,
      alt: "Imagen del servicio de camping",
      imageUrls: [CampingImage],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{dict.services.title}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{dict.services.description}</p>
      </div>

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
                          <Image
                            src={src}
                            alt={`${service.alt} #${i + 1}`}
                            fill
                            className="object-contain" // Changed to ensure the whole image is visible
                            priority={index < 2}
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80" />
                  <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80" />
                </Carousel>
              ) : (
                <Image
                  src={service.imageUrls[0]}
                  alt={service.alt}
                  fill
                  className="object-contain" // Changed to ensure the whole image is visible
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
                <Button className="w-full bg-primary hover:bg-primary/90">{dict.services.book_now}</Button>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
