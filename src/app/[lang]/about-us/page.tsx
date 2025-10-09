import Image from 'next/image';
import { getDictionary } from '@/lib/dictionary';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Props = {
  params: { lang: string };
};

export default async function AboutUsPage({ params: { lang } }: Props) {
  const dict = await getDictionary(lang);
  const teamImage = PlaceHolderImages.find(img => img.id === 'about-us-team');

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold">{dict.about.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div>
            <h2 className="font-headline text-3xl font-semibold text-primary">{dict.about.mission_title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{dict.about.mission_text}</p>
          </div>
          <div>
            <h2 className="font-headline text-3xl font-semibold text-primary">{dict.about.story_title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{dict.about.story_text}</p>
          </div>
        </div>
        <div>
          {teamImage && (
            <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-2xl">
              <Image
                src={teamImage.imageUrl}
                alt={teamImage.description}
                fill
                className="object-cover"
                data-ai-hint={teamImage.imageHint}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
