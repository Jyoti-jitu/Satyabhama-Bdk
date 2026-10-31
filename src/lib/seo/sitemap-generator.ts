import { SITE_URL } from '@/lib/clinic-config';
import { dataStore } from '@/lib/data/store';

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function formatW3CDate(dateInput?: string | Date): string {
  if (!dateInput) return '2026-10-31T01:30:00+05:30';
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(d.getTime())) return '2026-10-31T01:30:00+05:30';
  return d.toISOString();
}

/**
 * Static Public Pages with stable editorial lastmod dates.
 * These dates reflect actual content modification and do NOT arbitrarily change on builds.
 */
export const STATIC_PAGES_CONFIG = [
  {
    path: '',
    changefreq: 'daily',
    priority: '1.0',
    lastmod: '2026-10-31T01:30:00+05:30',
  },
  {
    path: '/about',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: '2026-10-30T18:00:00+05:30',
  },
  {
    path: '/doctors',
    changefreq: 'daily',
    priority: '0.9',
    lastmod: '2026-10-31T01:30:00+05:30',
  },
  {
    path: '/specialties',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: '2026-10-30T18:00:00+05:30',
  },
  {
    path: '/services',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: '2026-10-30T18:00:00+05:30',
  },
  {
    path: '/schedule',
    changefreq: 'daily',
    priority: '0.9',
    lastmod: '2026-10-31T01:30:00+05:30',
  },
  {
    path: '/patient-guidelines',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: '2026-10-31T01:30:00+05:30',
  },
  {
    path: '/contact',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: '2026-10-30T18:00:00+05:30',
  },
  {
    path: '/faq',
    changefreq: 'weekly',
    priority: '0.8',
    lastmod: '2026-10-30T18:00:00+05:30',
  },
  {
    path: '/health-articles',
    changefreq: 'daily',
    priority: '0.8',
    lastmod: '2026-10-31T01:30:00+05:30',
  },
  {
    path: '/privacy-policy',
    changefreq: 'monthly',
    priority: '0.5',
    lastmod: '2026-10-25T12:00:00+05:30',
  },
  {
    path: '/terms',
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: '2026-10-30T18:00:00+05:30',
  },
];

/**
 * 1. Generate Main Sitemap Index XML (/sitemap.xml)
 */
export function generateSitemapIndexXml(): string {
  const subSitemaps = [
    {
      loc: `${SITE_URL}/sitemap-pages.xml`,
      lastmod: '2026-10-31T01:30:00+05:30',
    },
    {
      loc: `${SITE_URL}/sitemap-doctors.xml`,
      lastmod: '2026-10-31T01:30:00+05:30',
    },
    {
      loc: `${SITE_URL}/sitemap-specialties.xml`,
      lastmod: '2026-10-30T18:00:00+05:30',
    },
    {
      loc: `${SITE_URL}/sitemap-articles.xml`,
      lastmod: '2026-10-31T01:30:00+05:30',
    },
    {
      loc: `${SITE_URL}/sitemap-images.xml`,
      lastmod: '2026-10-31T01:30:00+05:30',
    },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${subSitemaps
  .map(
    (sm) => `  <sitemap>
    <loc>${escapeXml(sm.loc)}</loc>
    <lastmod>${formatW3CDate(sm.lastmod)}</lastmod>
  </sitemap>`
  )
  .join('\n')}
</sitemapindex>`;
}

/**
 * 2. Generate Pages Sitemap XML (/sitemap-pages.xml)
 */
export function generatePagesSitemapXml(): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${STATIC_PAGES_CONFIG.map(
  (page) => `  <url>
    <loc>${escapeXml(`${SITE_URL}${page.path}`)}</loc>
    <lastmod>${formatW3CDate(page.lastmod)}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
).join('\n')}
</urlset>`;
}

/**
 * 3. Generate Doctors Sitemap XML (/sitemap-doctors.xml)
 * All published doctors with stable updated_at dates.
 */
export function generateDoctorsSitemapXml(): string {
  const doctors = dataStore.getDoctors(false);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${doctors
  .map(
    (doc) => `  <url>
    <loc>${escapeXml(`${SITE_URL}/doctors/${doc.slug}`)}</loc>
    <lastmod>${formatW3CDate(doc.updated_at)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

/**
 * 4. Generate Specialties Sitemap XML (/sitemap-specialties.xml)
 * All 12 published clinical specialties.
 */
export function generateSpecialtiesSitemapXml(): string {
  const specialties = dataStore.getSpecialties();
  const stableSpecialtiesDate = '2026-10-30T18:00:00+05:30';

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${specialties
  .map(
    (spec) => `  <url>
    <loc>${escapeXml(`${SITE_URL}/specialties/${spec.slug}`)}</loc>
    <lastmod>${formatW3CDate(stableSpecialtiesDate)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

/**
 * 5. Generate Health Articles Sitemap XML (/sitemap-articles.xml)
 * All 10 published clinical health articles.
 */
export function generateArticlesSitemapXml(): string {
  const articles = dataStore.getArticles(false);

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${articles
  .map(
    (art) => `  <url>
    <loc>${escapeXml(`${SITE_URL}/health-articles/${art.slug}`)}</loc>
    <lastmod>${formatW3CDate(art.updated_at)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

/**
 * 6. Generate Google Image Sitemap XML (/sitemap-images.xml)
 * Compliant with xmlns:image="http://www.google.com/schemas/sitemap-image/1.1".
 */
export function generateImagesSitemapXml(): string {
  const imageEntries = [
    {
      pageUrl: `${SITE_URL}/`,
      images: [
        {
          loc: `${SITE_URL}/images/logo.png`,
          title: 'Satyabhama Health Care Official Logo & Medical Emblem',
          caption: 'Official clinic emblem featuring medical caduceus for Satyabhama Health Care in Bhadrak, Odisha.',
          geo: 'Bhadrak, Odisha, India',
        },
        {
          loc: `${SITE_URL}/images/clinic/satyabhama-storefront-facade.jpg`,
          title: 'Satyabhama Health Care Clinic Entrance & Medicine Store',
          caption: 'Main storefront entrance, medicine dispensing counter, and consultation chambers on Stadium Road, Bhadrak.',
          geo: 'Bhadrak, Odisha, India',
        },
        {
          loc: `${SITE_URL}/images/clinic/satyabhama-official-doctor-board.jpg`,
          title: 'Satyabhama Health Care Verified Doctor Roster Board',
          caption: 'Official bilingual consultation board displaying specialist doctors, qualifications, and clinic contact lines in Bhadrak.',
          geo: 'Bhadrak, Odisha, India',
        },
        {
          loc: `${SITE_URL}/images/clinic/satyabhama-roadside-signboard.jpg`,
          title: 'Satyabhama Health Care Stadium Road Landmark Signboard',
          caption: 'Roadside directional signboard guiding patients from Bonth Chhak and Nehru Stadium to Satyabhama Health Care.',
          geo: 'Bhadrak, Odisha, India',
        },
      ],
    },
    {
      pageUrl: `${SITE_URL}/about`,
      images: [
        {
          loc: `${SITE_URL}/images/logo.png`,
          title: 'Satyabhama Health Care Official Healthcare Emblem',
          caption: 'Symbol of ethical patient-centric outpatient medical consultations in Bhadrak, Odisha.',
          geo: 'Bhadrak, Odisha, India',
        },
        {
          loc: `${SITE_URL}/images/clinic/satyabhama-storefront-facade.jpg`,
          title: 'Satyabhama Health Care Facility Exterior',
          caption: 'Physical outpatient clinic infrastructure and integrated medical dispensary at Nehru Stadium Road, Bhadrak.',
          geo: 'Bhadrak, Odisha, India',
        },
      ],
    },
    {
      pageUrl: `${SITE_URL}/contact`,
      images: [
        {
          loc: `${SITE_URL}/images/clinic/satyabhama-roadside-signboard.jpg`,
          title: 'Directions Signboard to Satyabhama Health Care',
          caption: 'Landmark signage near Bonth Chhak and Nehru Stadium, Bhadrak 756100.',
          geo: 'Bhadrak, Odisha, India',
        },
        {
          loc: `${SITE_URL}/images/clinic/satyabhama-official-doctor-board.jpg`,
          title: 'Reception Signboard & Contact Numbers',
          caption: 'Official contact numbers +91 70086 10481 and +91 76818 62111 at Satyabhama Health Care, Bhadrak.',
          geo: 'Bhadrak, Odisha, India',
        },
      ],
    },
    {
      pageUrl: `${SITE_URL}/doctors/dr-priya-ranjan-barik`,
      images: [
        {
          loc: `${SITE_URL}/images/doctors/Priyaranjan.png`,
          title: 'Dr. Priya Ranjan Barik - Consultant Physician & Specialist',
          caption: 'Consultant physician and pulmonologist associated with FM MCH Balasore and SJMCH Puri, consulting at Satyabhama Health Care, Bhadrak.',
          geo: 'Bhadrak, Odisha, India',
        },
      ],
    },
    {
      pageUrl: `${SITE_URL}/doctors/dr-sanjay-pany`,
      images: [
        {
          loc: `${SITE_URL}/images/doctors/Sanjay-PANY.png`,
          title: 'Dr. Sanjay Pany - Psychiatrist & Assistant Professor SCB Medical College',
          caption: 'Consultant Psychiatrist and Assistant Professor at SCB Medical College, Cuttack, consulting at Satyabhama Health Care.',
          geo: 'Bhadrak, Odisha, India',
        },
      ],
    },
    {
      pageUrl: `${SITE_URL}/doctors/dr-dillip-kumar-chand`,
      images: [
        {
          loc: `${SITE_URL}/images/doctors/dr-dilip-kumar-chand.jpg`,
          title: 'Dr. Dillip Kumar Chand - Orthopedic & Trauma Surgeon',
          caption: 'Orthopedic and Trauma Surgeon (MS Ortho, SCB MCH Cuttack) consulting at Satyabhama Health Care, Bhadrak.',
          geo: 'Bhadrak, Odisha, India',
        },
      ],
    },
    {
      pageUrl: `${SITE_URL}/doctors/dr-subharansu-sekhar-lenka`,
      images: [
        {
          loc: `${SITE_URL}/images/doctors/dr-subhranshu-sekhar-lenka.jpg`,
          title: 'Dr. Subharansu Sekhar Lenka - Consultant General & Laparoscopic Surgeon',
          caption: 'Consultant General Surgeon (MS Surgery, SCB MCH Cuttack) consulting at Satyabhama Health Care, Bhadrak.',
          geo: 'Bhadrak, Odisha, India',
        },
      ],
    },
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${imageEntries
  .map(
    (entry) => `  <url>
    <loc>${escapeXml(entry.pageUrl)}</loc>
${entry.images
  .map(
    (img) => `    <image:image>
      <image:loc>${escapeXml(img.loc)}</image:loc>
      <image:title>${escapeXml(img.title)}</image:title>
      <image:caption>${escapeXml(img.caption)}</image:caption>
      <image:geo_location>${escapeXml(img.geo)}</image:geo_location>
    </image:image>`
  )
  .join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>`;
}

