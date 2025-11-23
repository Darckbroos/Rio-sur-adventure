import { getDictionary } from '@/lib/dictionary';
import { Mountain, Target, CheckCircle, Leaf } from 'lucide-react';
import Image from 'next/image';

type Props = { params: { lang: string } };

export default async function AboutUsPage({ params }: Props) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  return (
    <div className="bg-muted/20">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-headline text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            {dict.about.title}
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Conoce nuestra historia, nuestros valores y la pasión que nos impulsa a compartir la magia del sur de Chile.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-primary/5 border border-primary/20 p-8 md:p-12 rounded-2xl shadow-lg mb-24">
           <div className="flex items-center mb-4 justify-center">
              <CheckCircle className="h-8 w-8 text-primary mr-4" />
              <h2 className="font-headline text-3xl font-semibold text-center">{dict.about.why_choose_us_title}</h2>
            </div>
          <p className="text-center max-w-4xl mx-auto text-muted-foreground text-lg leading-relaxed">
            {dict.about.why_choose_us_text}
          </p>
        </div>

        {/* Panguipulli Magic & Image Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1">
            <div className="flex items-center mb-4">
                <Leaf className="h-8 w-8 text-green-600 mr-3" />
                <h2 className="font-headline text-3xl font-semibold">{dict.about.panguipulli_magic_title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {dict.about.panguipulli_magic_text}
            </p>
          </div>
          <div className="order-1 lg:order-2 relative h-96 rounded-2xl shadow-lg overflow-hidden">
            <Image
              src="/servicios/nosotros.jpg"
              alt={dict.about.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Mission and Vision Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <Target className="h-8 w-8 text-primary mr-4" />
              <h2 className="font-headline text-3xl font-semibold">{dict.about.mission_title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{dict.about.mission_text}</p>
          </div>
          <div className="bg-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <Mountain className="h-8 w-8 text-primary mr-4" />
              <h2 className="font-headline text-3xl font-semibold">{dict.about.vision_title}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{dict.about.vision_text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
