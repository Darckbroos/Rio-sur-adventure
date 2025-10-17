'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';

type Props = {
  dict: {
    current: string;
    switch: string;
  };
};

const ChileFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="20" height="15">
        <rect width="900" height="600" fill="#d52b1e"/>
        <rect width="900" height="300" fill="#fff"/>
        <rect width="300" height="300" fill="#0039a6"/>
        <path d="M150 114.3l-35.3 25.4 13.5-41.2-35.3-25.4 43.6-.1 13.5-41.2 13.5 41.2 43.6.1-35.3 25.4 13.5 41.2z" fill="#fff"/>
    </svg>
);

const UKFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="15">
        <clipPath id="a"><path d="M0 0v30h60V0z"/></clipPath>
        <path d="M0 0v30h60V0z" fill="#00247d"/>
        <path d="M0 0l60 30m-60 0L60 0" stroke="#fff" strokeWidth="6" clipPath="url(#a)"/>
        <path d="M0 0l60 30m-60 0L60 0" stroke="#cf142b" strokeWidth="4" clipPath="url(#a)"/>
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30 0v30M0 15h60" stroke="#cf142b" strokeWidth="6"/>
    </svg>
);

export function LanguageSwitcher({ dict }: Props) {
  const pathname = usePathname();
  const currentLocale = pathname.split('/')[1] || 'en';

  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const targetLocale = currentLocale === 'en' ? 'es' : 'en';
  const targetPath = redirectedPathName(targetLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
            {currentLocale === 'es' ? <ChileFlag /> : <UKFlag />}
            <span className="uppercase">{currentLocale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={targetPath} className="flex items-center gap-2">
            {targetLocale === 'es' ? <ChileFlag /> : <UKFlag />}
            <span className="uppercase">{targetLocale}</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
