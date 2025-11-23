import { getDictionary } from '@/lib/dictionary';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Star, MapPin, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { servicesData } from '@/lib/servicesData';
import { FaWhatsapp } from 'react-icons/fa';
import { ImageHandler } from '@/components/ui/image-handler';

type Props = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

const slugToServiceMap: { [key: string]: string } = {
  'senderismo-de-montana': 'hiking',
  'mountain-hiking': 'hiking',
  'travesias-7-lagos': 'lake_expedition',
  '7-lakes-crossing': 'lake_expedition',
  'termas': 'hot_springs',
  'hot-springs': 'hot_springs',
  'tour-por-la-ciudad-y-alrededores': 'downtown_tour',
  'city-and-surroundings-tour': 'downtown_tour',
  'cabalgata': 'horseback_riding',
  'horseback-riding': 'horseback_riding',
  'rafting-de-aguas-blancas': 'rafting',
  'whitewater-rafting': 'rafting',
  'renta-de-bicicleta': 'biking',
  'bike-rental': 'biking',
  'canopy': 'canopy',
  'turismo-oscuro': 'night_tourism',
  'dark-tourism': 'night_tourism',
  'aventura-en-sup': 'kayaking',
  'sup-adventure': 'kayaking',
};

export default async function ServiceDetailPage({ params }: Props) {
  const { lang, slug } = await params;

  const dict = await getDictionary(lang);
  const serviceKey = slugToServiceMap[slug];

  if (!serviceKey) {
    notFound();
  }

  const service = dict.services.details[serviceKey as keyof typeof dict.services.details] as any;
  const serviceData = servicesData.find(s => s.key === serviceKey);
  const images = serviceData?.imageUrls || [];

  const generateWhatsappLink = () => {
    const phone = dict.contact.info_phone.replace(/\D/g, '');
    const messageTemplate = dict.services.predefined_whatsapp_message || 'Hola, estoy interesado en el servicio de {serviceName}';
    const message = messageTemplate.replace('{serviceName}', service.title);
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
  };

  const generateEmailLink = () => {
    const params = new URLSearchParams({ service: service.title });
    return `/${lang}/contact-us?${params.toString()}`;
  };

  const whatsappUrl = generateWhatsappLink();
  const emailUrl = generateEmailLink();

  function hasOptions(s: any): boolean {
    return s && Array.isArray(s.options);
  }
  function hasAttractions(s: any): boolean {
    return s && Array.isArray(s.attractions);
  }
  function hasNote(s: any): boolean {
    return s && typeof s.note === 'string';
  }
  function hasSafety(s: any): boolean {
    return s && typeof s.safety_title === 'string' && typeof s.safety_description === 'string';
  }

  return (
    <div className="bg-muted/20 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <Link href={`/${lang}/services`} className="inline-flex items-center text-primary hover:underline mb-8 font-semibold">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {dict.services.back_to_services}
        </Link>

        <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-12 shadow-lg">
          {images.length > 0 && (
            <ImageHandler
              src={images[0]}
              alt={`Imagen principal del servicio ${service.title}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              errorMessage={`Error loading header image for ${service.title}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-10">
            <h1 className="font-headline text-4xl md:text-6xl font-bold text-white shadow-2xl">{service.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="bg-card p-8 rounded-2xl shadow-lg">
              <p className="text-lg text-muted-foreground leading-relaxed">{service.description}</p>
              {hasNote(service) && (
                <p className="text-md text-primary/80 italic mt-6 bg-primary/5 p-4 rounded-lg">{service.note}</p>
              )}
            </div>

            {images.length > 2 && (
              <div className="mt-12">
                <h2 className="font-headline text-3xl font-bold mb-6">Galería de la Aventura</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {images.slice(1, 3).map((img, index) => (
                    <div key={index} className="relative h-64 bg-card/60 rounded-2xl shadow-lg overflow-hidden">
                      <ImageHandler
                        src={img}
                        alt={`Galería de ${service.title} - Imagen ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 50vw"
                        className="object-cover"
                        errorMessage={`Error loading gallery image ${index + 1} for ${service.title}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasOptions(service) && (
              <div className="mt-12">
                <h2 className="font-headline text-3xl font-bold mb-6">{service.options_title || 'Opciones del Servicio'}</h2>
                <div className="space-y-6">
                  {service.options.map((option: any, index: number) => (
                    <div key={index} className="group bg-card p-6 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-[1.02] hover:shadow-primary/20">
                      <h3 className="font-semibold text-2xl mb-2 text-primary flex items-center">
                        <Star className="h-6 w-6 mr-3 text-yellow-400 transition-colors duration-300 group-hover:fill-yellow-400" />
                        {option.title}
                      </h3>
                      <p className="text-muted-foreground pl-9">{option.description}</p>

                      {(option.difficulty || option.map_url) && (
                        <div className="pl-9 mt-4 flex flex-col sm:flex-row sm:items-center gap-4 text-sm">
                          {option.difficulty && (
                            <div className="font-semibold text-white bg-primary/80 rounded-full px-3 py-1 text-xs">
                              <span className="font-normal text-white/80">{service.difficulty_label || 'Dificultad'}:</span> {option.difficulty}
                            </div>
                          )}
                          {option.map_url && (
                            <a href={option.map_url} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline inline-flex items-center">
                              {service.view_on_map || 'Ver en el mapa'}
                              <MapPin className="ml-1 h-4 w-4" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {hasSafety(service) && (
              <div className="mt-12 bg-emerald-50 border-2 border-emerald-200 p-8 rounded-2xl shadow-lg">
                <h2 className="font-headline text-3xl font-bold mb-4 flex items-center text-emerald-800">
                  <ShieldCheck className="h-8 w-8 mr-3 text-emerald-500" />
                  {service.safety_title}
                </h2>
                <p className="text-lg text-emerald-700 leading-relaxed pl-11">
                  {service.safety_description}
                </p>
              </div>
            )}

            {hasAttractions(service) && (
              <div className="mt-12">
                <h2 className="font-headline text-3xl font-bold mb-6">{service.attractions_title || 'Puntos de Interés'}</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {service.attractions.map((attraction: string, index: number) => (
                    <div key={index} className="bg-card p-4 rounded-xl shadow-md text-center">
                      <p className="font-semibold text-muted-foreground">{attraction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-card p-6 rounded-2xl shadow-2xl">
                <h3 className="font-headline text-2xl font-bold mb-5 text-center">¡Reserva tu Aventura!</h3>

                {images.length > 1 && (
                  <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                    <ImageHandler
                      src={images[1]}
                      alt={`Imagen lateral para ${service.title}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover"
                      errorMessage={`Error loading sidebar image for ${service.title}`}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <Button size="lg" asChild className="bg-green-500 hover:bg-green-600 w-full">
                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                      <FaWhatsapp className="mr-2 h-5 w-5" />
                      {dict.services.contact_for_booking}
                    </a>
                  </Button>
                  <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full">
                    <Link href={emailUrl} className="flex items-center justify-center">
                      <Mail className="mr-2 h-5 w-5" />
                      {dict.services.contact_by_email}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
