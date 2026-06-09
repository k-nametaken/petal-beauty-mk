import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { sanityFetch } from '@/lib/sanity';
import { SITE_CONTENT_QUERY } from '@/lib/queries';
import type { SiteContent } from '@/lib/types';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const site = await sanityFetch<SiteContent>(SITE_CONTENT_QUERY);
  return {
    title: site?.seo?.metaTitle || site?.heroSection?.headline || 'Petal Beauty MK',
    description: site?.seo?.metaDescription || site?.heroSection?.subheading || 'Professional beauty treatments in Milton Keynes',
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await sanityFetch<SiteContent>(SITE_CONTENT_QUERY);
  const businessName = site?.heroSection?.headline || 'Petal Beauty MK';
  const announcement = site?.announcement;

  return (
    <html lang="en">
      <body>
        {announcement?.visible && announcement.text && (
          <div style={{
            background: 'var(--pink-dark)',
            color: '#fff',
            textAlign: 'center',
            padding: '12px 20px',
            fontSize: '14px',
            fontFamily: 'sans-serif',
            letterSpacing: '0.3px',
          }}>
            {announcement.text}
          </div>
        )}
        <Nav businessName={businessName} />
        <main>{children}</main>
        <Footer businessName={businessName} />
      </body>
    </html>
  );
}
