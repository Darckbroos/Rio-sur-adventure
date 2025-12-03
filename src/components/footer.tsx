
import { Instagram } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './logo';

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-1.06-.63-1.9-1.52-2.44-2.65-1.22-2.61-1.08-5.89.31-8.43.91-1.69 2.53-2.89 4.3-3.29.41-.09.83-.14 1.25-.16.02 1.55.02 3.1-.01 4.65-.29.02-.58.05-.86.08-.85.08-1.7.28-2.48.75-.9.58-1.58 1.48-1.9 2.55-.49 1.66-.28 3.6.69 5.06.87 1.31 2.39 2.12 4.02 2.12 1.52 0 2.92-.71 3.75-1.9.68-1.01 1-2.24 1.02-3.48.01-3.66.01-7.32.01-10.98z" />
  </svg>
);

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
            <Link href="https://www.instagram.com/riosuradventure?utm_source=qr&igsh=MWloMzQwYnEwYWVoNg%3D%3D" aria-label="Instagram de Rio Sur Adventure" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-6 w-6" />
            </Link>
            <Link href="https://www.tiktok.com/@rio.sur.adventure" aria-label="TikTok de Rio Sur Adventure" className="text-muted-foreground hover:text-primary">
              <TikTokIcon className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
