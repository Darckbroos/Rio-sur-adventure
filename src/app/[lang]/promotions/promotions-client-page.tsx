'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TicketPercent, Star, Info, Users, CalendarDays, Mail, MessageSquare, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ImageHandler } from '@/components/ui/image-handler';
import { es, enUS } from 'date-fns/locale';

// These types are derived from what getDictionary returns
type Dictionary = any;
type Promotion = any;

interface PromotionsClientPageProps {
  dict: Dictionary;
  promotions: Promotion[];
  lang: string;
}

export function PromotionsClientPage({ dict, promotions, lang }: PromotionsClientPageProps) {
  const [selections, setSelections] = useState<{[key: string]: { date?: Date, people: number } }>({});
  const locale = lang === 'es' ? es : enUS;

  useEffect(() => {
    const initialSelections: {[key: string]: { date?: Date, people: number }} = {};
    promotions.forEach(p => {
      initialSelections[p.id] = { 
        date: new Date(), 
        people: p.id === 'promo-parejas' ? 2 : 1 
      };
    });
    setSelections(initialSelections);
  }, [promotions]);

  const handleSelectionChange = (id: string, value: { date?: Date, people?: number }) => {
    setSelections(prev => ({
      ...prev,
      [id]: { ...prev[id], ...value }
    }));
  };
  
  const generateWhatsappLink = (promo: Promotion) => {
    if (!dict || !selections[promo.id]) return '';
    const selection = selections[promo.id];
    const formattedDate = selection.date ? selection.date.toLocaleDateString(lang) : '...';
    
    const message = dict.promotions.predefined_whatsapp_message
      .replace('{promotionName}', promo.title)
      .replace('{peopleCount}', String(selection.people))
      .replace('{date}', formattedDate);

    const phone = dict.contact.info_phone.replace(/\D/g, '');
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };
  
  const generateContactPageLink = (promo: Promotion) => {
    if (!dict || !selections[promo.id]) return `/${lang}/contact-us`;

    const selection = selections[promo.id];
    const { date, people } = selection;
    
    const message = dict.promotions.predefined_email_body
        .replace('{promotionName}', promo.title)
        .replace('{peopleCount}', String(people))
        .replace('{date}', date ? date.toLocaleDateString(lang) : '...');

    const params = new URLSearchParams({
        message: message,
    });

    return `/${lang}/contact-us?${params.toString()}`;
  };

  if (!dict) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading...</div>;
  }

  const visiblePromotions = promotions.filter(p => p.id !== 'promo-aventurera');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{dict.promotions.title}</h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">{dict.promotions.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {visiblePromotions.map((promo) => (
            <Card key={promo.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative w-full">
                  <ImageHandler
                      src="/servicios/promos.jpg"
                      alt={`Image for promotion ${promo.title}`}
                      width={1600}
                      height={900}
                      className="h-auto w-full"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      errorMessage={`Failed to load image for ${promo.title}`}
                  />
              </div>
              <div className="flex flex-col flex-grow">
                  <CardHeader className="p-4">
                      <CardTitle className="font-headline text-2xl flex items-center gap-2">
                          <TicketPercent className="h-7 w-7 text-accent" />
                          {promo.title}
                      </CardTitle>
                      <CardDescription className="font-medium text-base">{promo.duration}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow p-4 space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">{dict.promotions.includes_in_package}</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        {promo.activities.map((activity: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-sm">
                            <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {promo.note && (
                      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                        <p className="font-bold flex items-center gap-2"><AlertTriangle className="h-5 w-5"/> Oferta Especial</p>
                        <p>{promo.note}</p>
                      </div>
                    )}

                    <Card className="bg-muted/50 p-4">
                      <h4 className="font-bold text-sm text-accent-foreground/90">{dict.promotions.pricing_note_title}</h4>
                      <p className="text-sm text-muted-foreground">{dict.promotions.pricing_note_description}</p>
                    </Card>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className='space-y-2'>
                          <Label className='flex items-center gap-2 font-semibold'><CalendarDays className='w-5 h-5'/> {dict.promotions.select_date}</Label>
                          <Calendar
                            mode="single"
                            selected={selections[promo.id]?.date}
                            onSelect={(date) => handleSelectionChange(promo.id, { date })}
                            className="rounded-md border p-0"
                            locale={locale}
                          />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor={`people-${promo.id}`} className='flex items-center gap-2 font-semibold'><Users className='w-5 h-5' /> {dict.promotions.select_people}</Label>
                            <Input
                                id={`people-${promo.id}`}
                                type="number"
                                min={promo.id === 'promo-parejas' ? 2 : 1}
                                max={promo.id === 'promo-parejas' ? 2 : undefined}
                                value={selections[promo.id]?.people || (promo.id === 'promo-parejas' ? 2 : 1)}
                                onChange={(e) => handleSelectionChange(promo.id, { people: parseInt(e.target.value, 10) || 1 })}
                                className="w-full"
                                disabled={promo.id === 'promo-parejas'}
                            />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-start bg-muted/30 p-4 mt-auto">
                      <h4 className='font-semibold mb-3'>{dict.promotions.manage_adventure}</h4>
                      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <Button asChild className="w-full">
                          <a href={generateWhatsappLink(promo)} target="_blank" rel="noopener noreferrer">
                            <MessageSquare className="mr-2 h-4 w-4"/> {dict.promotions.contact_via_whatsapp}
                          </a>
                        </Button>
                        <Button asChild className="w-full">
                          <Link href={generateContactPageLink(promo)}>
                            <Mail className="mr-2 h-4 w-4"/> {dict.promotions.contact_via_email}
                          </Link>
                        </Button>
                      </div>
                  </CardFooter>
              </div>
            </Card>
        ))}
      </div>
      
      <div className="max-w-6xl mx-auto mt-12 space-y-6">
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
