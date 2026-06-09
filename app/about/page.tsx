import { sanityFetch } from '@/lib/sanity';
import { SITE_SETTINGS_QUERY, TEAM_QUERY, CERTIFICATIONS_QUERY, AWARDS_QUERY } from '@/lib/queries';

export const dynamic = 'force-dynamic';

interface SiteSettings {
  about: { ownerName?: string; bio: string };
}
interface TeamMember { _id: string; name: string; role?: string; bio?: string }
interface Certification { _id: string; name: string; issuer?: string; year?: number; type?: string }
interface Award { _id: string; name: string; year?: number; description?: string }

export default async function AboutPage() {
  const [settings, team, certs, awards] = await Promise.all([
    sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY),
    sanityFetch<TeamMember[]>(TEAM_QUERY),
    sanityFetch<Certification[]>(CERTIFICATIONS_QUERY),
    sanityFetch<Award[]>(AWARDS_QUERY),
  ]);

  const qualifications = certs?.filter(c => c.type === 'qualification') || [];
  const certifications = certs?.filter(c => c.type !== 'qualification') || [];

  return (
    <>
      <section style={{ background: 'var(--cream)', padding: '64px 20px 48px' }}>
        <div className="section-inner">
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, marginBottom: '12px' }}>About Us</h1>
          {settings?.about?.bio && (
            <p style={{ color: 'var(--grey)', lineHeight: '1.9', fontSize: '1.05rem', maxWidth: '600px', marginTop: '16px' }}>
              {settings.about.bio}
            </p>
          )}
        </div>
      </section>

      {/* Team */}
      {team && team.length > 0 && (
        <section className="page-section">
          <div className="section-inner">
            <h2 className="section-heading">Our Team</h2>
            <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
              {team.map(member => (
                <div key={member._id} style={{
                  background: 'var(--cream)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '28px',
                }}>
                  <div style={{
                    width: '64px', height: '64px',
                    borderRadius: '50%',
                    background: 'var(--pink)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem',
                    marginBottom: '16px',
                    color: '#fff',
                  }}>
                    {member.name.charAt(0)}
                  </div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 400, marginBottom: '4px' }}>{member.name}</h3>
                  {member.role && <p style={{ fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--pink-dark)', marginBottom: '12px', letterSpacing: '0.3px' }}>{member.role}</p>}
                  {member.bio && <p style={{ fontFamily: 'sans-serif', fontSize: '14px', color: 'var(--grey)', lineHeight: '1.6' }}>{member.bio}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="page-section--alt">
          <div className="section-inner">
            <h2 className="section-heading">Certifications</h2>
            <div className="card">
              {certifications.map((cert, i) => (
                <div key={cert._id} className="row" style={i === certifications.length - 1 ? { borderBottom: 'none' } : {}}>
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

      {/* Qualifications */}
      {qualifications.length > 0 && (
        <section className="page-section">
          <div className="section-inner">
            <h2 className="section-heading">Qualifications</h2>
            <div className="card">
              {qualifications.map((q, i) => (
                <div key={q._id} className="row" style={i === qualifications.length - 1 ? { borderBottom: 'none' } : {}}>
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

      {/* Awards */}
      {awards && awards.length > 0 && (
        <section className="page-section--cream">
          <div className="section-inner">
            <h2 className="section-heading">Awards &amp; Recognition</h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              {awards.map(award => (
                <div key={award._id} style={{
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                  padding: '20px 24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}>
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
