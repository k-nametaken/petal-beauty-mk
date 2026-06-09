import { sanityFetch } from '@/lib/sanity';
import { SITE_CONTENT_QUERY } from '@/lib/queries';
import type { SiteContent } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const site = await sanityFetch<SiteContent>(SITE_CONTENT_QUERY);
  const photos = site?.galleryPhotos || [];

  return (
    <>
      <section style={{ background: 'var(--cream)', padding: '64px 20px 48px' }}>
        <div className="section-inner">
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, marginBottom: '12px' }}>Gallery</h1>
          <p style={{ color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '15px', fontStyle: 'italic' }}>A look at our work.</p>
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          {photos.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
              {photos.map((photo, i) => (
                <div key={i} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--light-grey)', aspectRatio: '1', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {photo.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo.imageUrl} alt={photo.caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '13px' }}>{photo.caption || 'Photo'}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '15px' }}>
              Gallery photos coming soon.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
