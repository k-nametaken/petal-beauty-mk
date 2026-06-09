import { sanityFetch } from '@/lib/sanity';
import { SERVICES_QUERY } from '@/lib/queries';

export const dynamic = 'force-dynamic';

interface Service { _id: string; name: string; price: string; description?: string; category?: string }

export default async function ServicesPage() {
  const services = await sanityFetch<Service[]>(SERVICES_QUERY);

  const grouped = (services || []).reduce<Record<string, Service[]>>((acc, s) => {
    const cat = s.category || 'Treatments';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <>
      <section style={{ background: 'var(--cream)', padding: '64px 20px 48px' }}>
        <div className="section-inner">
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, marginBottom: '12px' }}>Services &amp; Prices</h1>
          <p style={{ color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '15px', fontStyle: 'italic' }}>
            Professional beauty treatments tailored just for you.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--pink-dark)', marginBottom: '16px', fontFamily: 'sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>
                {category}
              </h2>
              <div className="card">
                {items.map((s, i) => (
                  <div key={s._id} style={{
                    padding: '20px 24px',
                    borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <span style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 500 }}>{s.name}</span>
                        {s.description && (
                          <p style={{ color: 'var(--grey)', fontSize: '13px', marginTop: '4px', fontFamily: 'sans-serif', lineHeight: '1.5' }}>
                            {s.description}
                          </p>
                        )}
                      </div>
                      <span style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 600, color: 'var(--pink-dark)', marginLeft: '16px', whiteSpace: 'nowrap' }}>
                        {s.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {(!services || services.length === 0) && (
            <p style={{ color: 'var(--grey)', fontFamily: 'sans-serif' }}>Services coming soon.</p>
          )}
        </div>
      </section>

      <section className="page-section--cream" style={{ textAlign: 'center' }}>
        <div className="section-inner">
          <h2 className="section-heading">Ready to Book?</h2>
          <a href="/contact" style={{
            background: 'var(--pink-dark)',
            color: '#fff',
            padding: '14px 40px',
            borderRadius: '3px',
            fontFamily: 'sans-serif',
            fontSize: '13px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            display: 'inline-block',
          }}>
            Get In Touch
          </a>
        </div>
      </section>
    </>
  );
}
