import type { Metadata } from 'next';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { sanityFetch } from '@/lib/sanity';
import { SITE_SETTINGS_QUERY } from '@/lib/queries';

export const dynamic = 'force-dynamic';

interface SiteSettings {
  businessName: string;
  tagline: string;
  announcement: { active: boolean; message: string };
  seo?: { title?: string; description?: string };
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY);
  return {
    title: settings?.seo?.title || settings?.businessName || 'Petal Beauty MK',
    description: settings?.seo?.description || settings?.tagline || 'Professional beauty treatments in Milton Keynes',
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY);
  const businessName = settings?.businessName || 'Petal Beauty MK';
  const announcement = settings?.announcement;

  return (
    <html lang="en">
      <body>
        {announcement?.active && announcement.message && (
          <div style={{
            background: 'var(--pink-dark)',
            color: '#fff',
            textAlign: 'center',
            padding: '12px 20px',
            fontSize: '14px',
            fontFamily: 'sans-serif',
            letterSpacing: '0.3px',
          }}>
            {announcement.message}
          </div>
        )}
        <Nav businessName={businessName} />
        <main>{children}</main>
        <Footer businessName={businessName} />
      </body>
    </html>
  );
}
