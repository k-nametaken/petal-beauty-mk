import { sanityFetch } from '@/lib/sanity';
import { SITE_CONTENT_QUERY } from '@/lib/queries';
import type { SiteContent } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const site = await sanityFetch<SiteContent>(SITE_CONTENT_QUERY);
  const hero = site?.heroSection;
  const services = (site?.services || []).filter(s => s.visible !== false).slice(0, 4);
  const reviews = (site?.reviews || []).filter(r => r.visible !== false);
  const about = site?.aboutPage;

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--cream)', padding: '100px 20px 80px', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 400, color: 'var(--charcoal)', marginBottom: '16px', letterSpacing: '-0.5px' }}>
          {hero?.headline || 'Petal Beauty MK'}
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--grey)', fontStyle: 'italic', marginBottom: '40px' }}>
          {hero?.subheading}
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/services" style={{ background: 'var(--pink-dark)', color: '#fff', padding: '14px 36px', borderRadius: '3px', fontFamily: 'sans-serif', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            View Services
          </a>
          <a href="/contact" style={{ border: '1px solid var(--pink-dark)', color: 'var(--pink-dark)', padding: '14px 36px', borderRadius: '3px', fontFamily: 'sans-serif', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Get In Touch
          </a>
        </div>
      </section>

      {/* Featured Services */}
      {services.length > 0 && (
        <section className="page-section--alt">
          <div className="section-inner">
            <h2 className="section-heading">Popular Treatments</h2>
            <div className="card">
              {services.map((s, i) => (
                <div key={i} className="row" style={i === services.length - 1 ? { borderBottom: 'none' } : {}}>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '15px' }}>{s.name}</span>
                  <span style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 600, color: 'var(--pink-dark)' }}>{s.price}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <a href="/services" style={{ fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--pink-dark)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                View all services →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* About snippet */}
      {about?.mainText && (
        <section className="page-section">
          <div className="section-inner">
            <h2 className="section-heading">About Us</h2>
            <p style={{ lineHeight: '1.9', color: 'var(--grey)', fontSize: '1.05rem', maxWidth: '600px' }}>
              {about.mainText}
            </p>
            <a href="/about" style={{ display: 'inline-block', marginTop: '20px', fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--pink-dark)', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
              Learn more →
            </a>
          </div>
        </section>
      )}

      {/* Reviews */}
      {reviews.length > 0 && (
        <section className="page-section--cream">
          <div className="section-inner">
            <h2 className="section-heading">What Our Clients Say</h2>
            <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {reviews.map((r, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', padding: '24px' }}>
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
          <a href="/contact" style={{ background: 'var(--pink-dark)', color: '#fff', padding: '14px 40px', borderRadius: '3px', fontFamily: 'sans-serif', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
}
