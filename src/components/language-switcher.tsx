'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Globe } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
  dict: {
    current: string;
    switch: string;
  };
};

export function LanguageSwitcher({ dict }: Props) {
  const pathname = usePathname();

  const getTargetLocale = () => {
    return pathname.startsWith('/en') ? 'es' : 'en';
  };

  const redirectedPathName = (locale: string) => {
    if (!pathname) return '/';
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const targetLocale = getTargetLocale();
  const targetPath = redirectedPathName(targetLocale);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={targetPath}>{dict.switch}</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
