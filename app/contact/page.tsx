import { sanityFetch } from '@/lib/sanity';
import { SITE_SETTINGS_QUERY } from '@/lib/queries';

export const dynamic = 'force-dynamic';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

interface SiteSettings {
  businessName: string;
  contact: { phone: string; email: string; address: string };
  openingHours: Array<{ day: string; open: string; close: string; closed: boolean }>;
  socialLinks?: { instagram?: string; facebook?: string; tiktok?: string };
}

export default async function ContactPage() {
  const settings = await sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY);
  const { contact, openingHours, socialLinks } = settings || {};

  const hoursMap: Record<string, { open: string; close: string; closed: boolean }> = {};
  (openingHours || []).forEach(h => { hoursMap[h.day] = h; });

  return (
    <>
      <section style={{ background: 'var(--cream)', padding: '64px 20px 48px' }}>
        <div className="section-inner">
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, marginBottom: '12px' }}>Contact Us</h1>
          <p style={{ color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '15px', fontStyle: 'italic' }}>
            We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>

            {/* Contact details */}
            <div>
              <h2 className="section-heading">Get In Touch</h2>
              <div style={{ display: 'grid', gap: '20px' }}>
                {contact?.phone && (
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--pink-dark)', fontSize: '20px', lineHeight: 1 }}>📞</span>
                    <div>
                      <div style={{ fontFamily: 'sans-serif', fontSize: '12px', color: 'var(--grey)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Phone</div>
                      <a href={`tel:${contact.phone.replace(/\s/g, '')}`} style={{ fontFamily: 'sans-serif', fontSize: '15px', color: 'var(--charcoal)' }}>
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                )}
                {contact?.email && (
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--pink-dark)', fontSize: '20px', lineHeight: 1 }}>✉️</span>
                    <div>
                      <div style={{ fontFamily: 'sans-serif', fontSize: '12px', color: 'var(--grey)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Email</div>
                      <a href={`mailto:${contact.email}`} style={{ fontFamily: 'sans-serif', fontSize: '15px', color: 'var(--charcoal)' }}>
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}
                {contact?.address && (
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--pink-dark)', fontSize: '20px', lineHeight: 1 }}>📍</span>
                    <div>
                      <div style={{ fontFamily: 'sans-serif', fontSize: '12px', color: 'var(--grey)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Address</div>
                      <span style={{ fontFamily: 'sans-serif', fontSize: '15px', color: 'var(--charcoal)' }}>{contact.address}</span>
                    </div>
                  </div>
                )}
                {socialLinks && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    {socialLinks.instagram && (
                      <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" style={{
                        background: 'var(--light-grey)', border: '1px solid var(--border)',
                        padding: '8px 16px', borderRadius: '4px',
                        fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--grey)',
                      }}>Instagram</a>
                    )}
                    {socialLinks.facebook && (
                      <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" style={{
                        background: 'var(--light-grey)', border: '1px solid var(--border)',
                        padding: '8px 16px', borderRadius: '4px',
                        fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--grey)',
                      }}>Facebook</a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h2 className="section-heading">Opening Hours</h2>
              <div className="card--cream">
                {DAYS.map((day, i) => {
                  const h = hoursMap[day];
                  return (
                    <div key={day} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '14px 20px',
                      borderBottom: i < DAYS.length - 1 ? '1px solid var(--border)' : 'none',
                    }}>
                      <span style={{ fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 500 }}>{day}</span>
                      <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'var(--grey)' }}>
                        {!h ? '—' : h.closed ? 'Closed' : `${h.open} – ${h.close}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
