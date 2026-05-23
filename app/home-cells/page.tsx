import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import HomeCellsList from '@/components/HomeCellsList'
import { fetchHomeCells } from '@/lib/api'

export const metadata: Metadata = {
  title: 'LFC-JAHI Home Cells | Fellowship Directory & Locations',
  description: 'Find a home cell fellowship near you in Jahi, Abuja. Join our vibrant home cell community for midweek Bible study, prayer, and Christian fellowship at Living Faith Church.',
  alternates: { canonical: 'https://lfcjahi.com/home-cells' },
  openGraph: {
    url: 'https://lfcjahi.com/home-cells',
    title: 'LFC-JAHI Home Cells | Fellowship Directory & Locations',
    description: 'Find a home cell fellowship near you in Jahi, Abuja.',
  },
}

const latestMessageAction = (
  <Link href="/messages" className="gen-button">
    <div className="gen-button-block">
      <span className="gen-button-line-left"></span>
      <span className="gen-button-text">Latest Message</span>
    </div>
  </Link>
)

export default async function HomeCellsPage() {
  const cells = await fetchHomeCells()

  return (
    <>
      <div id="gen-loading">
        <div id="gen-loading-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-1.png" alt="loading" />
        </div>
      </div>

      <Navbar activeItem="home-cells" headerAction={latestMessageAction} />

      <section className="lfc-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="gen-tag-line"><span>WINNERS HOME CELL FELLOWSHIP</span></div>
              <div className="gen-movie-info">
                <h1 className="text-white" style={{ fontSize: '52px', fontWeight: 800 }}>
                  Home Cell Fellowship
                </h1>
              </div>
              <p className="text-white mt-3 d-none d-md-block" style={{ fontSize: '22px' }}>
                Find your home cell group and connect with your faith community across Abuja. All district fellowships
                available below.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gen-section-padding-2">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-md-12">
              <HomeCellsList cells={cells} />
            </div>
          </div>
        </div>
      </section>

      <section className="lfc-single-card-section gen-section-padding-3">
        <div className="container">
          <div className="lfc-single-card">
            <h4 className="text-white mb-3" style={{ fontSize: '28px' }}>
              ✨ Join a Home Cell Near You
            </h4>
            <p className="mb-0" style={{ fontSize: '20px', lineHeight: '1.8' }}>
              Our home cells provide intimate fellowship and community support across all districts in Abuja. Each cell
              is led by a dedicated minister who cares for your spiritual growth and development. Visit a home cell in
              your area and become part of our growing faith community today!
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </>
  )
}
