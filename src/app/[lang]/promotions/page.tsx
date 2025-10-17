import Image from 'next/image';
import { getDictionary } from '@/lib/dictionary';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TicketPercent, Star, Info } from 'lucide-react';

type Props = { params: Promise<{ lang: string }> };

export default async function PromotionsPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const promotions = dict.promotions.packages.map(pkg => ({
    ...pkg,
    image: PlaceHolderImages.find(img => img.id === pkg.image),
  }));

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{dict.promotions.title}</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{dict.promotions.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {promotions.map((promo) => (
          <Card key={promo.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                    <CardDescription className="font-medium text-base">{promo.duration}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-muted-foreground">
                    {promo.activities.map((activity, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        {activity}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">{dict.promotions.claim_offer}</Button>
                </CardFooter>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="max-w-5xl mx-auto mt-12 space-y-6">
          <Card className="bg-card border-l-4 border-accent p-6">
              <div className="flex items-start gap-4">
                  <Star className="h-8 w-8 text-accent mt-1" />
                  <div>
                      <h3 className="font-headline text-xl font-bold">{dict.promotions.bonus_track_title}</h3>
                      <p className="text-muted-foreground">{dict.promotions.bonus_track_description}</p>
                  </div>
              </div>
          </Card>
          <Card className="bg-card border-l-4 border-blue-500 p-6">
              <div className="flex items-start gap-4">
                  <Info className="h-8 w-8 text-blue-500 mt-1" />
                  <div>
                      <p className="text-muted-foreground">{dict.promotions.includes}</p>
                  </div>
              </div>
          </Card>
      </div>

    </div>
  );
}
