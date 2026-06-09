import { sanityFetch } from '@/lib/sanity';
import { SITE_CONTENT_QUERY } from '@/lib/queries';
import type { SiteContent } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const site = await sanityFetch<SiteContent>(SITE_CONTENT_QUERY);
  const about = site?.aboutPage;
  const team = site?.teamMembers || [];
  const certs = site?.certifications || [];
  const quals = site?.qualifications || [];
  const awards = site?.awards || [];

  return (
    <>
      <section style={{ background: 'var(--cream)', padding: '64px 20px 48px' }}>
        <div className="section-inner">
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, marginBottom: '12px' }}>About Us</h1>
          {about?.mainText && (
            <p style={{ color: 'var(--grey)', lineHeight: '1.9', fontSize: '1.05rem', maxWidth: '600px', marginTop: '16px' }}>
              {about.mainText}
            </p>
          )}
        </div>
      </section>

      {team.length > 0 && (
        <section className="page-section">
          <div className="section-inner">
            <h2 className="section-heading">Our Team</h2>
            <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {team.map((member, i) => (
                <div key={i} style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: '8px', padding: '28px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--pink)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: '16px', color: '#fff' }}>
                    {member.name.charAt(0)}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 400, marginBottom: '4px' }}>{member.name}</h3>
                  {member.role && <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--pink-dark)', marginBottom: '12px' }}>{member.role}</p>}
                  {member.bio && <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'var(--grey)', lineHeight: '1.6' }}>{member.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {certs.length > 0 && (
        <section className="page-section--alt">
          <div className="section-inner">
            <h2 className="section-heading">Certifications</h2>
            <div className="card">
              {certs.map((cert, i) => (
                <div key={i} className="row" style={i === certs.length - 1 ? { borderBottom: 'none' } : {}}>
                  <div>
                    <div style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 500 }}>{cert.name}</div>
                    {cert.issuer && <div style={{ fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--grey)', marginTop: '2px' }}>{cert.issuer}</div>}
                  </div>
                  {cert.year && <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'var(--pink-dark)', fontWeight: 600 }}>{cert.year}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {quals.length > 0 && (
        <section className="page-section">
          <div className="section-inner">
            <h2 className="section-heading">Qualifications</h2>
            <div className="card">
              {quals.map((q, i) => (
                <div key={i} className="row" style={i === quals.length - 1 ? { borderBottom: 'none' } : {}}>
                  <div>
                    <div style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 500 }}>{q.name}</div>
                    {q.issuer && <div style={{ fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--grey)', marginTop: '2px' }}>{q.issuer}</div>}
                  </div>
                  {q.year && <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'var(--pink-dark)', fontWeight: 600 }}>{q.year}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {awards.length > 0 && (
        <section className="page-section--cream">
          <div className="section-inner">
            <h2 className="section-heading">Awards &amp; Recognition</h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {awards.map((award, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontFamily: 'sans-serif', fontSize: '15px', fontWeight: 500 }}>{award.name}</div>
                    {award.description && <div style={{ fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--grey)', marginTop: '4px' }}>{award.description}</div>}
                  </div>
                  {award.year && <span style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'var(--pink-dark)', fontWeight: 600 }}>{award.year}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
