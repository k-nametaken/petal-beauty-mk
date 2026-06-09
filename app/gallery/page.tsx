import { sanityFetch } from '@/lib/sanity';
import { GALLERY_QUERY } from '@/lib/queries';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

interface GalleryPhoto { _id: string; title?: string; alt?: string; imageUrl?: string }

export default async function GalleryPage() {
  const photos = await sanityFetch<GalleryPhoto[]>(GALLERY_QUERY);

  return (
    <>
      <section style={{ background: 'var(--cream)', padding: '64px 20px 48px' }}>
        <div className="section-inner">
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 400, marginBottom: '12px' }}>Gallery</h1>
          <p style={{ color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '15px', fontStyle: 'italic' }}>
            A look at our work.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="section-inner">
          {photos && photos.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: '16px',
            }}>
              {photos.map(photo => (
                <div key={photo._id} style={{
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  background: 'var(--light-grey)',
                  aspectRatio: '1',
                  position: 'relative',
                }}>
                  {photo.imageUrl ? (
                    <Image
                      src={photo.imageUrl}
                      alt={photo.alt || photo.title || ''}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 600px) 100vw, 220px"
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '13px',
                    }}>
                      {photo.title || 'Photo'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '64px 0',
              color: 'var(--grey)',
              fontFamily: 'sans-serif',
              fontSize: '15px',
            }}>
              Gallery photos coming soon.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
