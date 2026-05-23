import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import MessageLibrary from '@/components/MessageLibrary'
import { fetchMessages } from '@/lib/api'
import { sortByDate } from '@/lib/utils'
import { buildPageMetadata } from '@/lib/seo'

export const metadata: Metadata = buildPageMetadata({
  path: '/',
  title: 'Powerful Audio Messages & Sermons',
  description:
    'Access and download powerful audio messages and sermons from Living Faith Church Jahi. Grow spiritually with life-transforming teachings from anointed ministers.',
  keywords: [
    'Living Faith Church sermons',
    'Winners Chapel audio messages',
    'church sermon downloads',
    'Christian messages Abuja',
  ],
})

export default async function HomePage() {
  const messages = await fetchMessages()
  const latestMessage = sortByDate(messages)[0] || null
  const latestHref = latestMessage ? `/messages/${encodeURIComponent(latestMessage.id)}` : '/messages'

  const latestLink = (
    <Link href={latestHref} className="gen-button">
      <div className="gen-button-block">
        <span className="gen-button-line-left"></span>
        <span className="gen-button-text">Latest Message</span>
      </div>
    </Link>
  )

  return (
    <>
      <div id="gen-loading">
        <div id="gen-loading-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-1.png" alt="loading" />
        </div>
      </div>

      <Navbar activeItem="home" headerAction={latestLink} />

      <section className="lfc-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-10">
              <div className="gen-tag-line"><span>LFC-JAHI MEDIA</span></div>
              <div className="gen-movie-info">
                <h1 className="text-white">Listen, Grow, And Download Powerful Audio Messages</h1>
              </div>
              <p className="text-white mt-3 d-none d-md-block">
                Explore sermon messages by title, pastor, date, year, and month. Click any message card to open a full
                page with description, streaming audio, and direct download.
              </p>
              <div className="gen-movie-action mt-4">
                <div className="gen-btn-container mr-3 d-inline-block">
                  <a href="#message-library" className="gen-button">
                    <i className="fa fa-play"></i>
                    <span className="text">Browse Library</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense>
        <MessageLibrary messages={messages} />
      </Suspense>

      <section id="about-ministry" className="gen-section-padding-3 pt-0">
        <div className="container">
          <div className="lfc-single-card">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h4 className="text-white mb-2">About LFC-JAHI MEDIA</h4>
                <p className="mb-0">
                  LFC-JAHI MEDIA exists to archive and distribute faith-building messages in audio format so members and
                  partners can listen anytime and stay connected to God&apos;s Word.
                </p>
              </div>
              <div className="col-lg-4 text-lg-right mt-3 mt-lg-0">
                <Link href={latestHref} className="gen-button">
                  <span className="text">Start Listening</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lfc-featured-section">
        <div className="container">
          <div className="lfc-featured-card">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="lfc-featured-content">
                  <h3 className="text-white mb-2">SHILOH MESSAGES 2025</h3>
                  <p className="mb-3">
                    Access the complete collection of Shiloh messages from 2025. Join our community in experiencing
                    powerful spiritual messages and teachings throughout the year.
                  </p>
                  <a
                    href="https://onedrive.live.com/?cid=22681b3a68971b9c&id=22681B3A68971B9C!s06810415c01b47918d86182575ddd4d1&resid=22681B3A68971B9C!s06810415c01b47918d86182575ddd4d1&ithint=folder&e=XNAjfz&migratedtospo=true&redeem=aHR0cHM6Ly8xZHJ2Lm1zL2YvYy8yMjY4MWIzYTY4OTcxYjljL0lnQVZCSUVHRzhDUlI0MkdHQ1YxM2RUUkFVTHhzSWlGQmNYR1BNbHJrRDZZMERNP2U9WE5BamZ6"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gen-button"
                  >
                    <span className="text">View Shiloh Messages</span>
                  </a>
                </div>
              </div>
              <div className="col-lg-4 text-lg-center mt-4 mt-lg-0">
                <div className="lfc-featured-icon">
                  <i className="fas fa-book-open"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lfc-featured-section">
        <div className="container">
          <div className="lfc-featured-card">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="lfc-featured-content">
                  <h3 className="text-white mb-2">INTERCESSORY PRAYER</h3>
                  <p className="mb-3">
                    Join our prayer warriors in interceding for the church, nation, and world. Access prayer requests,
                    guidelines, and resources to participate in this vital ministry.
                  </p>
                  <a
                    href="https://drive.google.com/drive/folders/16MH29uEic35UrjG3LNidE2DZQshzyf07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gen-button"
                  >
                    <span className="text">View Prayer Resources</span>
                  </a>
                </div>
              </div>
              <div className="col-lg-4 text-lg-center mt-4 mt-lg-0">
                <div className="lfc-featured-icon">
                  <i className="fas fa-praying-hands"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BackToTop />
    </>
  )
}
