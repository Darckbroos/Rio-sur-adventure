import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Logo } from '@/components/logo';
import { LanguageSwitcher } from '@/components/language-switcher';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

type NavItem = {
  href: string;
  label: string;
};

type Props = {
  lang: string;
  navigation: {
    home: string;
    services: string;
    promotions: string;
    about: string;
    contact: string;
  };
  languageSwitcher: {
    current: string;
    switch: string;
  };
};

export function Header({ lang, navigation, languageSwitcher }: Props) {
  const navItems: NavItem[] = [
    { href: `/${lang}/`, label: navigation.home },
    { href: `/${lang}/services`, label: navigation.services },
    { href: `/${lang}/promotions`, label: navigation.promotions },
    { href: `/${lang}/about-us`, label: navigation.about },
    { href: `/${lang}/contact-us`, label: navigation.contact },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-auto md:mr-0 md:flex-1">
          <Link href={`/${lang}`} className="mr-6 flex items-center">
            <Logo />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center justify-center space-x-6 text-sm font-medium flex-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-2 rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Nav */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href={`/${lang}`} className="mb-8 flex items-center">
              <Logo />
            </Link>
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex items-center ml-auto md:ml-0 md:flex-1 md:justify-end">
          <nav className="flex items-center">
            <LanguageSwitcher dict={languageSwitcher} />
          </nav>
        </div>
      </div>
    </header>
  );
}
