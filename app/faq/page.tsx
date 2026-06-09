import { sanityFetch } from '@/lib/sanity';
import { SITE_CONTENT_QUERY } from '@/lib/queries';
import type { SiteContent } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function FAQPage() {
  const site = await sanityFetch<SiteContent>(SITE_CONTENT_QUERY);
  const faqs = (site?.faqs || []).filter(f => f.visible !== false);

  return (
    <>
      <section style={{ background: 'var(--cream)', padding: '64px 20px 48px' }}>
        <div className="section-inner">
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, marginBottom: '12px' }}>Frequently Asked Questions</h1>
          <p style={{ color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '15px', fontStyle: 'italic' }}>
            Everything you need to know before your visit.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          {faqs.length > 0 ? (
            <div style={{ display: 'grid', gap: '2px' }}>
              {faqs.map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--border)', padding: '28px 0' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 400, marginBottom: '12px', color: 'var(--charcoal)' }}>{faq.question}</h3>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'var(--grey)', lineHeight: '1.7' }}>{faq.answer}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--grey)', fontFamily: 'sans-serif' }}>FAQs coming soon.</p>
          )}

          <div style={{ marginTop: '48px', padding: '28px', background: 'var(--cream)', borderRadius: '8px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 400, marginBottom: '8px' }}>Still have questions?</h3>
            <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'var(--grey)', marginBottom: '16px' }}>We're happy to help.</p>
            <a href="/contact" style={{ background: 'var(--pink-dark)', color: '#fff', padding: '12px 28px', borderRadius: '3px', fontFamily: 'sans-serif', fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', display: 'inline-block' }}>
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
