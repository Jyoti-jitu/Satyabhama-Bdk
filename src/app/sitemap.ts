import { MetadataRoute } from 'next';
import { dataStore } from '@/lib/data/store';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://satyabhamahealthcare.com';
  const doctors = dataStore.getDoctors(false);
  const specialties = dataStore.getSpecialties();
  const articles = dataStore.getArticles(false);

  const staticPages = [
    '',
    '/about',
    '/doctors',
    '/specialties',
    '/services',
    '/schedule',
    '/health-articles',
    '/contact',
    '/faq',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const doctorPages = doctors.map((doc) => ({
    url: `${baseUrl}/doctors/${doc.slug}`,
    lastModified: new Date(doc.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const specialtyPages = specialties.map((spec) => ({
    url: `${baseUrl}/specialties/${spec.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const articlePages = articles.map((art) => ({
    url: `${baseUrl}/health-articles/${art.slug}`,
    lastModified: new Date(art.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...doctorPages, ...specialtyPages, ...articlePages];
}
