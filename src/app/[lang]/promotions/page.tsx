
import { getDictionary } from '@/lib/dictionary';
import { PromotionsClientPage } from './promotions-client-page';
import type { Metadata } from 'next';

type Props = {
  params: { lang: 'es' | 'en' };
};

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
  const dict = await getDictionary(lang);
  const title = dict.promotions.title;
  const description = dict.promotions.description;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `/${lang}/promotions`,
      languages: {
        'es': '/es/promotions',
        'en': '/en/promotions',
      },
    },
    openGraph: {
      title: title,
      description: description,
      url: `/${lang}/promotions`,
    },
  };
}


export default async function PromotionsPage({ params }: Props) {
  const { lang } = params;
  const dict = await getDictionary(lang);

  const promotions = dict.promotions.packages.map((pkg: any) => ({
    ...pkg,
    image: {
      imageUrl: '/promos/promos.jpg',
      description: pkg.title
    },
  }));

  return <PromotionsClientPage dict={dict} promotions={promotions} lang={lang} />;
}
