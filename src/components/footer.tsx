import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './logo';

type Props = {
  dict: {
    rights: string;
  };
};

export function Footer({ dict }: Props) {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-6 md:mb-0">
            <Logo />
          </div>
          <div className="flex space-x-6">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-6 w-6" />
            </Link>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Rio Sur Adventure. {dict.rights}</p>
        </div>
      </div>
    </footer>
  );
}
