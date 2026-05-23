import Link from 'next/link'

interface FooterProps {
  minimal?: boolean
}

export default function Footer({ minimal = false }: FooterProps) {
  return (
    <footer id="gen-footer">
      <div className="gen-footer-style-1">
        {!minimal && (
          <div className="gen-footer-top">
            <div className="container">
              <div className="row">
                <div className="col-xl-4 col-md-6">
                  <div className="widget">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/logo-1.png" className="gen-footer-logo" alt="LFC-JAHI MEDIA logo" loading="lazy" decoding="async" />
                    <p>Audio sermons for spiritual growth, anytime and anywhere.</p>
                    <div className="gen-social-links mt-3">
                      <a href="https://web.facebook.com/lfcjahiabuja" target="_blank" rel="noopener noreferrer" title="Follow on Facebook">
                        <i className="fab fa-facebook"></i>
                      </a>
                      <a href="https://www.instagram.com/lfcjahiabuja/" target="_blank" rel="noopener noreferrer" title="Follow on Instagram">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <a href="https://www.youtube.com/c/LivingFaithChurchJahiAbuja" target="_blank" rel="noopener noreferrer" title="Subscribe on YouTube">
                        <i className="fab fa-youtube"></i>
                      </a>
                      <a href="https://x.com/lfcjahiabuja?lang=en" target="_blank" rel="noopener noreferrer" title="Follow on X (Twitter)">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a href="https://x.com/lfcjahiabuja" target="_blank" rel="noopener noreferrer" title="Follow on TikTok">
                        <i className="fab fa-tiktok"></i>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="widget">
                    <h4 className="footer-title">Quick Links</h4>
                    <ul className="menu">
                      <li className="menu-item"><Link href="/">Home</Link></li>
                      <li className="menu-item"><Link href="/#message-library">Message Library</Link></li>
                      <li className="menu-item"><Link href="/districts">Districts</Link></li>
                      <li className="menu-item"><Link href="/home-cells">Home Cells</Link></li>
                    </ul>
                  </div>
                </div>
                <div className="col-xl-4 col-md-6">
                  <div className="widget">
                    <h4 className="footer-title">Need Prayer?</h4>
                    <p>Reach the media team for message requests and prayer support.</p>
                    <a href="#" className="gen-button gen-button-flat" target="_blank" rel="noopener noreferrer">
                      <span className="text">Contact on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="gen-copyright-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-12 align-self-center">
                <span className="gen-copyright">Copyright 2026 LFC-JAHI MEDIA. All rights reserved.</span>
                {!minimal && (
                  <div className="lfc-footer-credit">Built in service by Cyfamod Technologies</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
