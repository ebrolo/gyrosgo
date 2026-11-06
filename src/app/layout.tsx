import type { Metadata } from 'next';
import { Oswald, Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { businessInfo, siteData } from '@/data/siteData';

const oswald = Oswald({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gyrosgo.hu'),
  title: siteData.hu.meta.title,
  description: siteData.hu.meta.description,
  keywords: [
    'Gyros & Go Nyírbátor',
    'Smash Burger Nyírbátor',
    'Gyros Nyírbátor',
    'Hamburger Nyírbátor',
    'Szentvér út 19',
    'Smash Box',
    'Frissensültek Nyírbátor',
  ],
  openGraph: {
    title: siteData.hu.meta.title,
    description: siteData.hu.meta.description,
    type: 'website',
    locale: 'hu_HU',
    images: ['/images/menu/smash-box-1.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const restaurantJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    additionalType: 'https://schema.org/Restaurant',
    name: businessInfo.name,
    description: siteData.hu.meta.description,
    url: 'https://gyrosgo.hu',
    image: [
      '/images/menu/dupla-smash-burger.jpg',
      '/images/menu/smash-box-1.jpg',
      '/images/brand/interior.jpg',
    ],
    telephone: businessInfo.phoneRaw,
    priceRange: '$$',
    servesCuisine: ['Smash Burger', 'Gyros', 'Kebab', 'Street Food', 'Hungarian Fresh Grills'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessInfo.streetAddress,
      addressLocality: businessInfo.city,
      postalCode: businessInfo.postalCode,
      addressCountry: businessInfo.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: businessInfo.geo.lat,
      longitude: businessInfo.geo.lng,
    },
    openingHours: 'Mo-Sa 11:00-21:00',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '11:00',
        closes: '21:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.2',
      reviewCount: '32',
    },
    sameAs: [businessInfo.facebookUrl, businessInfo.instagramUrl, businessInfo.tiktokUrl],
  };

  return (
    <html
      lang="hu"
      className={`${oswald.variable} ${jakarta.variable} ${jetbrains.variable} dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body className="bg-[var(--color-bg)] text-white antialiased selection:bg-[#FF6B00] selection:text-black overflow-x-clip">
        {children}
      </body>
    </html>
  );
}
