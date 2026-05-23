'use client'

import Link from 'next/link'
import { useState } from 'react'
import DarkModeToggle from './DarkModeToggle'

interface NavbarProps {
  activeItem?: 'home' | 'messages' | 'districts' | 'home-cells' | 'login' | 'single-message'
  headerAction?: React.ReactNode
}

export default function Navbar({ activeItem, headerAction }: NavbarProps) {
  const [navOpen, setNavOpen] = useState(false)

  return (
    <header id="gen-header" className="gen-header-style-1 gen-has-sticky">
      <div className="gen-bottom-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" href="/">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="img-fluid logo" src="/images/logo-1.png" alt="LFC-JAHI MEDIA logo" />
                </Link>
                <div className={`collapse navbar-collapse${navOpen ? ' show' : ''}`} id="navbarSupportedContent">
                  <div id="gen-menu-contain" className="gen-menu-contain">
                    <ul id="gen-main-menu" className="navbar-nav ml-auto">
                      <li className={`menu-item${activeItem === 'home' ? ' active' : ''}`}>
                        <Link href="/">Home</Link>
                      </li>
                      <li className={`menu-item${activeItem === 'messages' ? ' active' : ''}`}>
                        <Link href="/#message-library">Messages</Link>
                      </li>
                      <li className={`menu-item${activeItem === 'districts' ? ' active' : ''}`}>
                        <Link href="/districts">Districts</Link>
                      </li>
                      <li className={`menu-item${activeItem === 'home-cells' ? ' active' : ''}`}>
                        <Link href="/home-cells">Home Cells</Link>
                      </li>
                      <li className="menu-item">
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLScrp8-yWV6-2sdUqhCDW-gb8A71Qx-LMkO1PsOZ9Dk3TgnR2w/viewform"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Winning-Care
                        </a>
                      </li>
                      <li className="menu-item">
                        <a
                          href="https://docs.google.com/forms/d/e/1FAIpQLSc4xRfQF7PUOmDug_fk3lOZIaG7EFXZcp1viZLC9wHixdjrRw/viewform"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Follow-Up
                        </a>
                      </li>
                      {activeItem !== 'single-message' && (
                        <li className="menu-item">
                          <Link href="/#about-ministry">About</Link>
                        </li>
                      )}
                      <li className={`menu-item lfc-menu-login${activeItem === 'login' ? ' active' : ''}`}>
                        <Link href="/login">Login</Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="gen-header-info-box">
                  <div className="gen-btn-container">
                    <DarkModeToggle />
                  </div>
                  <div className="gen-btn-container">{headerAction}</div>
                </div>
                <button
                  className="navbar-toggler"
                  type="button"
                  aria-controls="navbarSupportedContent"
                  aria-expanded={navOpen}
                  aria-label="Toggle navigation"
                  onClick={() => setNavOpen((prev) => !prev)}
                >
                  <i className="fas fa-bars"></i>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
