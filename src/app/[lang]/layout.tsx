import type { ReactNode } from 'react';
import { getDictionary } from '@/lib/dictionary';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

type Props = {
  children: ReactNode;
  params: { lang: string };
};

export default async function LangLayout({ children, params: { lang } }: Props) {
  const dict = await getDictionary(lang);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={lang} navigation={dict.navigation} languageSwitcher={dict.language} />
      <main className="flex-grow">{children}</main>
      <Footer dict={dict.footer} />
    </div>
  );
}
