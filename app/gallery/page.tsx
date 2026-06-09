import { sanityFetch } from '@/lib/sanity';
import { SITE_CONTENT_QUERY } from '@/lib/queries';
import type { SiteContent } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  const site = await sanityFetch<SiteContent>(SITE_CONTENT_QUERY);
  const photos = site?.galleryPhotos || [];
  const videos = site?.galleryVideos || [];
  const hasContent = photos.length > 0 || videos.length > 0;

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
          {!hasContent && (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '15px' }}>
              Gallery coming soon.
            </div>
          )}

          {photos.length > 0 && (
            <div style={{ marginBottom: videos.length > 0 ? '48px' : 0 }}>
              {videos.length > 0 && (
                <h2 style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--pink-dark)', marginBottom: '20px', fontFamily: 'sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Photos
                </h2>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                {photos.map((photo, i) => (
                  <div key={i} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', background: 'var(--light-grey)', aspectRatio: '1', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    {photo.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photo.imageUrl} alt={photo.caption || ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '13px' }}>{photo.caption || 'Photo'}</span>
                    )}
                    {photo.caption && photo.imageUrl && (
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.45)', padding: '8px 12px' }}>
                        <span style={{ color: '#fff', fontFamily: 'sans-serif', fontSize: '12px' }}>{photo.caption}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {videos.length > 0 && (
            <div>
              {photos.length > 0 && (
                <h2 style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--pink-dark)', marginBottom: '20px', fontFamily: 'sans-serif', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Videos
                </h2>
              )}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {videos.map((video, i) => (
                  <div key={i} style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', background: '#000' }}>
                    {video.videoUrl ? (
                      <video
                        src={video.videoUrl}
                        controls
                        playsInline
                        style={{ width: '100%', display: 'block', maxHeight: '320px' }}
                      />
                    ) : (
                      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--grey)', fontFamily: 'sans-serif', fontSize: '13px' }}>
                        {video.caption || 'Video'}
                      </div>
                    )}
                    {video.caption && video.videoUrl && (
                      <div style={{ padding: '10px 14px', background: 'var(--light-grey)' }}>
                        <span style={{ fontFamily: 'sans-serif', fontSize: '13px', color: 'var(--grey)' }}>{video.caption}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
