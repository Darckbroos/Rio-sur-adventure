
import { MetadataRoute } from 'next';
import { servicesData } from '@/lib/servicesData';

const baseUrl = 'https://riosuradventure.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['es', 'en'];

  // Rutas estáticas principales
  const staticRoutes = [
    '',
    '/about-us',
    '/contact-us',
    '/promotions',
    '/services',
  ];

  const staticUrls = locales.flatMap(lang => 
    staticRoutes.map(route => ({
      url: `${baseUrl}/${lang}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.8,
    }))
  );

  // Rutas dinámicas de servicios
  const serviceUrls = locales.flatMap(lang =>
    servicesData.map(service => ({
      url: `${baseUrl}/${lang}/services/${lang === 'es' ? service.slug_es : service.slug_en}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }))
  );

  return [...staticUrls, ...serviceUrls];
}
