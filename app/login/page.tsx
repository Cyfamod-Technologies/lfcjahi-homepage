import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

export const metadata: Metadata = {
  title: 'Login Portal',
  description: 'Select your LFC-JAHI access role to continue to the login portal.',
  robots: { index: false, follow: false },
}

const PORTALS = [
  { label: 'Homecell-Leader', href: 'https://homecell.lfcjahi.com' },
  { label: 'Pastor', href: 'https://homecell.lfcjahi.com' },
  { label: 'Homecell-Office', href: 'https://homecell.lfcjahi.com' },
  { label: 'Follow-Up', href: 'https://homecell.lfcjahi.com' },
  { label: 'District-Admin', href: 'https://homecell.lfcjahi.com' },
  { label: 'Zone-Admin', href: 'https://homecell.lfcjahi.com' },
  { label: 'Counseling-Admin', href: 'https://homecell.lfcjahi.com' },
  { label: 'Media-Admin', href: 'https://admin.lfcjahi.com' },
  { label: 'Church-Office', href: 'https://homecell.lfcjahi.com' },
]

const backHomeAction = (
  <Link href="/" className="gen-button">
    <div className="gen-button-block">
      <span className="gen-button-line-left"></span>
      <span className="gen-button-text">Back Home</span>
    </div>
  </Link>
)

export default function LoginPage() {
  return (
    <>
      <div id="gen-loading">
        <div id="gen-loading-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-1.png" alt="loading" />
        </div>
      </div>

      <Navbar activeItem="login" headerAction={backHomeAction} />

      <section className="lfc-login-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="gen-tag-line"><span>SECURE ACCESS PORTAL</span></div>
              <div className="gen-movie-info">
                <h1 className="text-white">Choose Your Login Role</h1>
              </div>
              <p className="text-white mt-3 mb-0 d-none d-md-block">
                Select the appropriate access point below for your responsibility unit within LFC-JAHI.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gen-section-padding-2 lfc-login-wrap">
        <div className="container">
          <div className="lfc-login-panel">
            <h4 className="text-white">Available Portals</h4>
            <p className="mb-0">Pick one of the roles below to continue with the correct login flow.</p>
            <div className="lfc-login-grid">
              {PORTALS.map((portal) => (
                <a key={portal.label} className="lfc-role-button" href={portal.href}>
                  {portal.label}
                </a>
              ))}
            </div>
            <p className="lfc-login-note">
              Need help with access? Please contact the church office.
            </p>
          </div>
        </div>
      </section>

      <Footer minimal />
      <BackToTop />
    </>
  )
}
