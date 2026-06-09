import { sanityFetch } from '@/lib/sanity';
import { SITE_CONTENT_QUERY } from '@/lib/queries';
import type { SiteContent } from '@/lib/types';

export const dynamic = 'force-dynamic';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
const DAY_LABELS: Record<string, string> = {
  monday: 'Monday', tuesday: 'Tuesday', wednesday: 'Wednesday',
  thursday: 'Thursday', friday: 'Friday', saturday: 'Saturday', sunday: 'Sunday',
};

export default async function ContactPage() {
  const site = await sanityFetch<SiteContent>(SITE_CONTENT_QUERY);
  const contact = site?.contactDetails;
  const hours = site?.openingHours || {};
  const social = site?.socialLinks;

  return (
    <>
      <section style={{ background: 'var(--cream)', padding: '64px 20px 48px' }}>
        <div className="section-inner">
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, marginBottom: '12px' }}>Contact Us</h1>
          <p style={{ color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '15px', fontStyle: 'italic' }}>We'd love to hear from you.</p>
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
                      <a href={`tel:${contact.phone.replace(/\s/g, '')}`} style={{ fontFamily: 'sans-serif', fontSize: '15px', color: 'var(--charcoal)' }}>{contact.phone}</a>
                    </div>
                  </div>
                )}
                {contact?.email && (
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ color: 'var(--pink-dark)', fontSize: '20px', lineHeight: 1 }}>✉️</span>
                    <div>
                      <div style={{ fontFamily: 'sans-serif', fontSize: '12px', color: 'var(--grey)', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '4px' }}>Email</div>
                      <a href={`mailto:${contact.email}`} style={{ fontFamily: 'sans-serif', fontSize: '15px', color: 'var(--charcoal)' }}>{contact.email}</a>
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
                {social && (social.instagram || social.facebook) && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    {social.instagram && (
                      <a href={social.instagram} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--light-grey)', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '4px', fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--grey)' }}>Instagram</a>
                    )}
                    {social.facebook && (
                      <a href={social.facebook} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--light-grey)', border: '1px solid var(--border)', padding: '8px 16px', borderRadius: '4px', fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--grey)' }}>Facebook</a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Opening Hours */}
            <div>
              <h2 className="section-heading">Opening Hours</h2>
              <div className="card--cream">
                {DAYS.map((day, i) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 20px', borderBottom: i < DAYS.length - 1 ? '1px solid var(--border)' : 'none' }}>
                    <span style={{ fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 500 }}>{DAY_LABELS[day]}</span>
                    <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: hours[day] === 'Closed' ? 'var(--grey)' : 'var(--charcoal)' }}>
                      {hours[day] || '—'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
