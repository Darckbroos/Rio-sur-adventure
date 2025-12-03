
import type {Metadata} from 'next';
import { PT_Sans, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from 'react';

const ptSans = PT_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pt-sans',
  weight: ['400', '700'],
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair-display',
});

// SEO Metadata Global
export const metadata: Metadata = {
  metadataBase: new URL('https://riosuradventure.com'),
  title: {
    default: 'Rio Sur Adventure | Turismo Aventura en Panguipulli, Chile',
    template: '%s | Rio Sur Adventure',
  },
  description: 'Descubre la aventura en Panguipulli, sur de Chile. Ofrecemos tours de rafting, trekking, canopy y más. ¡Vive una experiencia inolvidable con Rio Sur Adventure!',
  keywords: ['turismo aventura', 'Panguipulli', 'sur de Chile', 'rafting', 'trekking', 'canopy', 'kayak', 'termas', 'Huilo Huilo', 'Rio Sur Adventure'],
  alternates: {
    canonical: '/',
    languages: {
      'es': '/es',
      'en': '/en',
    },
  },
  openGraph: {
    title: 'Rio Sur Adventure | Turismo Aventura en Panguipulli, Chile',
    description: 'Descubre la aventura en Panguipulli, sur de Chile. Ofrecemos tours de rafting, trekking, canopy y más.',
    url: 'https://riosuradventure.com',
    siteName: 'Rio Sur Adventure',
    locale: 'es_CL',
    alternateLocale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/inicio/inicio.jpg',
        width: 1200,
        height: 630,
        alt: 'Paisaje de aventura en el sur de Chile con Rio Sur Adventure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rio Sur Adventure | Turismo Aventura en Panguipulli, Chile',
    description: 'La mejor experiencia de turismo aventura en Panguipulli y el sur de Chile. Rafting, trekking y más.',
    images: ['/inicio/inicio.jpg'],
  },
  icons: {
    icon: '/images/logo.png?v=1',
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Rio Sur Adventure",
  "url": "https://riosuradventure.com",
  "logo": "https://riosuradventure.com/images/logo.png",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ernesto Wilhem 648",
    "addressLocality": "Panguipulli",
    "addressRegion": "Los Ríos",
    "postalCode": "5210000",
    "addressCountry": "CL"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+56932484165",
    "contactType": "Customer Service",
    "areaServed": "CL",
    "availableLanguage": ["es", "en"]
  },
  "sameAs": [
    "https://www.instagram.com/riosuradventure",
    "https://www.tiktok.com/@rio.sur.adventure"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${ptSans.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
