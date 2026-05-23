import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import DistrictsTable from '@/components/DistrictsTable'
import { fetchDistricts } from '@/lib/api'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  path: '/districts',
  title: 'Districts & Winners Satellite Fellowship Locations',
  description:
    'Find Winners Satellite Fellowship districts and outreach locations in Jahi, Abuja. Join a fellowship near you and connect with the Living Faith Church community.',
  keywords: [
    'LFC Jahi districts',
    'Winners Satellite Fellowship Abuja',
    'church outreach locations Jahi',
    'district fellowship directory',
  ],
})

const latestMessageAction = (
  <Link href="/messages" className="gen-button">
    <div className="gen-button-block">
      <span className="gen-button-line-left"></span>
      <span className="gen-button-text">Latest Message</span>
    </div>
  </Link>
)

export default async function DistrictsPage() {
  const districts = await fetchDistricts()

  return (
    <>
      <div id="gen-loading">
        <div id="gen-loading-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-1.png" alt="loading" />
        </div>
      </div>

      <Navbar activeItem="districts" headerAction={latestMessageAction} />

      <section className="lfc-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="gen-tag-line"><span>LFC-JAHI DISTRICT OUTREACH</span></div>
              <div className="gen-movie-info">
                <h1 className="text-white">Winners Satellite Fellowship Districts</h1>
              </div>
              <p className="text-white mt-3 d-none d-md-block">
                Explore our district outreach centers across Abuja. Find your nearest district pastor, minister,
                location, and contact information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="gen-section-padding-2">
        <div className="container">
          <div className="row align-items-center mb-4">
            <div className="col-md-12">
              <h4 className="gen-heading-title mb-3">District Directory</h4>
              <DistrictsTable districts={districts} />
            </div>
          </div>
        </div>
      </section>

      <section className="lfc-single-card-section gen-section-padding-3">
        <div className="container">
          <div className="lfc-single-card">
            <h4 className="text-white mb-3">Connect With Your District</h4>
            <p className="mb-0">
              Find your nearest district by location above. Contact your District Pastor or Minister for more
              information about outreach schedules, activities, and how you can get involved in serving your community
              through our Winners Satellite Fellowship.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </>
  )
}
