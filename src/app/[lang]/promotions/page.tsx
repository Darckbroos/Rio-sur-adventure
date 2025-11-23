import { getDictionary } from '@/lib/dictionary';
import { PromotionsClientPage } from './promotions-client-page';

type Props = { params: { lang: string } };

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
