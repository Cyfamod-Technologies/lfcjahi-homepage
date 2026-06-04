import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '60vh',
        display: 'grid',
        placeItems: 'center',
        padding: '80px 24px',
        textAlign: 'center',
      }}
    >
      <div>
        <p style={{ marginBottom: 12, color: '#e50914', fontWeight: 700 }}>404</p>
        <h1 style={{ marginBottom: 16 }}>Page not found</h1>
        <p style={{ maxWidth: 560, margin: '0 auto 24px', color: '#666' }}>
          The page you requested is not available on LFC-JAHI MEDIA.
        </p>
        <Link href="/" className="gen-button">
          <span className="text">Return Home</span>
        </Link>
      </div>
    </main>
  )
}
