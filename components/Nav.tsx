const links = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav({ businessName }: { businessName: string }) {
  return (
    <nav style={{
      borderBottom: '1px solid var(--border)',
      padding: '0 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '64px',
      background: '#fff',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <a href="/" style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem', color: 'var(--charcoal)', letterSpacing: '0.3px' }}>
        {businessName}
      </a>
      <div className="nav-links" style={{ display: 'flex', gap: '24px', fontFamily: 'sans-serif', fontSize: '13px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
        {links.map(({ href, label }) => (
          <a key={href} href={href} style={{ color: 'var(--grey)' }}>{label}</a>
        ))}
      </div>
    </nav>
  );
}
