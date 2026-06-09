import { sanityFetch } from '@/lib/sanity';
import { SITE_SETTINGS_QUERY, SERVICES_QUERY, REVIEWS_QUERY } from '@/lib/queries';

export const dynamic = 'force-dynamic';

interface SiteSettings {
  businessName: string;
  tagline: string;
  about: { ownerName: string; bio: string };
  contact: { phone: string; email: string; address: string };
}
interface Service { _id: string; name: string; price: string; description?: string; category?: string }
interface Review { _id: string; text: string; author: string; rating: number }

export default async function HomePage() {
  const [settings, services, reviews] = await Promise.all([
    sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY),
    sanityFetch<Service[]>(SERVICES_QUERY),
    sanityFetch<Review[]>(REVIEWS_QUERY),
  ]);

  const featured = services?.slice(0, 4) || [];

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--cream)', padding: '100px 20px 80px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '16px', letterSpacing: '-0.5px' }}>
          {settings?.businessName || 'Petal Beauty MK'}
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--grey)', fontStyle: 'italic', marginBottom: '40px' }}>
          {settings?.tagline}
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/services" style={{
            background: 'var(--pink-dark)',
            color: '#fff',
            padding: '14px 36px',
            borderRadius: '3px',
            fontFamily: 'sans-serif',
            fontSize: '13px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            View Services
          </a>
          <a href="/contact" style={{
            border: '1px solid var(--pink-dark)',
            color: 'var(--pink-dark)',
            padding: '14px 36px',
            borderRadius: '3px',
            fontFamily: 'sans-serif',
            fontSize: '13px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            Get In Touch
          </a>
        </div>
      </section>

      {/* Featured Services */}
      {featured.length > 0 && (
        <section className="page-section--alt">
          <div className="section-inner">
            <h2 className="section-heading">Popular Treatments</h2>
            <div className="card">
              {featured.map((s, i) => (
                <div key={s._id} className="row" style={i === featured.length - 1 ? { borderBottom: 'none' } : {}}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '15px' }}>{s.name}</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 600, color: 'var(--pink-dark)' }}>{s.price}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <a href="/services" style={{ fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--pink-dark)', letterSpacing: '0.5px', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                View all services →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* About snippet */}
      {settings?.about?.bio && (
        <section className="page-section">
          <div className="section-inner">
            <h2 className="section-heading">About Us</h2>
            <p style={{ lineHeight: '1.9', color: 'var(--grey)', fontSize: '1.05rem', maxWidth: '600px' }}>
              {settings.about.bio}
            </p>
            <a href="/about" style={{ display: 'inline-block', marginTop: '20px', fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--pink-dark)', letterSpacing: '0.5px', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Learn more →
            </a>
          </div>
        </section>
      )}

      {/* Reviews */}
      {reviews && reviews.length > 0 && (
        <section className="page-section--cream">
          <div className="section-inner">
            <h2 className="section-heading">What Our Clients Say</h2>
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {reviews.map(r => (
                <div key={r._id} style={{
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '24px',
                }}>
                  <div style={{ color: 'var(--pink)', fontSize: '18px', marginBottom: '12px', letterSpacing: '2px' }}>
                    {'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}
                  </div>
                  <p style={{ fontStyle: 'italic', lineHeight: '1.7', color: 'var(--charcoal)', marginBottom: '16px', fontSize: '0.95rem' }}>
                    "{r.text}"
                  </p>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--grey)', fontWeight: 600 }}>
                    — {r.author}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="page-section">
        <div className="section-inner" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 400, marginBottom: '16px' }}>Ready to Book?</h2>
          <p style={{ color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '15px', marginBottom: '32px' }}>
            Get in touch to book your appointment today.
          </p>
          <a href="/contact" style={{
            background: 'var(--pink-dark)',
            color: '#fff',
            padding: '14px 40px',
            borderRadius: '3px',
            fontFamily: 'sans-serif',
            fontSize: '13px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
