import Image from 'next/image';
import { getDictionary } from '@/lib/dictionary';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TicketPercent } from 'lucide-react';

type Props = { params: Promise<{ lang: string }> };

export default async function PromotionsPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const promotions = [
    {
      title: dict.promotions.summer_title,
      description: dict.promotions.summer_description,
      image: PlaceHolderImages.find(img => img.id === 'promotion-summer'),
    },
    {
      title: dict.promotions.group_title,
      description: dict.promotions.group_description,
      image: PlaceHolderImages.find(img => img.id === 'promotion-group'),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{dict.promotions.title}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{dict.promotions.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {promotions.map((promo, index) => (
          <Card key={index} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
             {promo.image && (
                <div className="relative h-64 w-full">
                    <Image
                        src={promo.image.imageUrl}
                        alt={promo.image.description}
                        fill
                        className="object-cover"
                        data-ai-hint={promo.image.imageHint}
                    />
                </div>
            )}
            <div className="flex flex-col flex-grow p-6">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl flex items-center gap-2">
                        <TicketPercent className="h-7 w-7 text-accent" />
                        {promo.title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription className="text-base">{promo.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{dict.promotions.claim_offer}</Button>
                </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
