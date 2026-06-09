export default function Footer({ businessName }: { businessName: string }) {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      padding: '32px 20px',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      fontSize: '13px',
      color: 'var(--grey)',
      background: 'var(--cream)',
    }}>
      <p>© {new Date().getFullYear()} {businessName}. All rights reserved.</p>
      <div style={{ marginTop: '12px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <a href="/services" style={{ color: 'var(--grey)' }}>Services</a>
        <a href="/about" style={{ color: 'var(--grey)' }}>About</a>
        <a href="/contact" style={{ color: 'var(--grey)' }}>Contact</a>
      </div>
    </footer>
  );
}
