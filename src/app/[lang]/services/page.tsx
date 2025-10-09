import Image from 'next/image';
import { getDictionary } from '@/lib/dictionary';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  params: { lang: string };
};

export default async function ServicesPage({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);

  const services = [
    {
      title: dict.services.kayaking_title,
      description: dict.services.kayaking_description,
      image: PlaceHolderImages.find(img => img.id === 'service-kayaking'),
    },
    {
      title: dict.services.hiking_title,
      description: dict.services.hiking_description,
      image: PlaceHolderImages.find(img => img.id === 'service-hiking'),
    },
    {
      title: dict.services.biking_title,
      description: dict.services.biking_description,
      image: PlaceHolderImages.find(img => img.id === 'service-biking'),
    },
    {
      title: dict.services.camping_title,
      description: dict.services.camping_description,
      image: PlaceHolderImages.find(img => img.id === 'service-camping'),
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
             {service.image && (
                <div className="relative h-64 w-full">
                    <Image
                        src={service.image.imageUrl}
                        alt={service.image.description}
                        fill
                        className="object-cover"
                        data-ai-hint={service.image.imageHint}
                    />
                </div>
            )}
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
