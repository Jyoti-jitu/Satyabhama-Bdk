import { generateSitemapIndexXml } from '@/lib/seo/sitemap-generator';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export async function GET() {
  const xml = generateSitemapIndexXml();

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

