'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Message } from '@/lib/types'
import { formatDate, buildDownloadBaseName, getFileExtension } from '@/lib/utils'
import MessageCard from './MessageCard'

interface SingleMessageClientProps {
  message: Message
  related: Message[]
}

export default function SingleMessageClient({ message, related }: SingleMessageClientProps) {
  const [copyLabel, setCopyLabel] = useState('Copy Message Link')
  const formattedDate = formatDate(message.date, 'long')

  useEffect(() => {
    const el = document.getElementById('audioPlayer') as HTMLAudioElement | null
    if (el) el.src = message.audioUrl
  }, [message.audioUrl])

  function handleDownload(e: React.MouseEvent) {
    e.preventDefault()
    const url = message.downloadUrl || message.audioUrl
    const ext = getFileExtension(url)
    const filename = message.downloadFilename || `${buildDownloadBaseName(message.title, message.pastor, message.date)}.${ext}`
    if (!url) return

    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blobUrl = window.URL.createObjectURL(xhr.response)
        const link = document.createElement('a')
        link.href = blobUrl
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(blobUrl)
      } else {
        alert('Download failed. Please try again.')
      }
    }
    xhr.onerror = () => alert('Download failed. Please try again.')
    xhr.send()
  }

  function handleCopyLink(e: React.MouseEvent) {
    e.preventDefault()
    const url = message.shareUrl || window.location.href
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        setCopyLabel('Link Copied')
        setTimeout(() => setCopyLabel('Copy Message Link'), 2000)
      })
    }
  }

  const browseByPastorHref = `/?pastor=${encodeURIComponent(message.pastor)}`

  return (
    <>
      <section className="lfc-single-hero">
        <div className="container">
          <div className="row">
            <div className="col-lg-9">
              <div className="gen-tag-line"><span>MESSAGE DETAILS</span></div>
              <h1 id="messageTitle" className="text-white">{message.title}</h1>
              <div className="gen-movie-meta-holder">
                <ul className="gen-meta-after-title">
                  <li><i className="far fa-calendar-alt"></i> <span id="messageDate">{formattedDate}</span></li>
                  <li><i className="far fa-clock"></i> <span id="messageDuration">{message.series}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gen-section-padding-2 lfc-single-wrap">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mb-4">
              <div className="lfc-single-card">
                <Image
                  id="messageImage"
                  className="lfc-single-image"
                  src={message.image}
                  alt={message.title}
                  width={1280}
                  height={720}
                  sizes="(max-width: 992px) 100vw, 66vw"
                  quality={65}
                  priority
                />
                <audio id="audioPlayer" className="lfc-audio" controls preload="none">
                  Your browser does not support the audio element.
                </audio>
                <div className="gen-movie-action mb-4">
                  {/* <div className="gen-btn-container mr-3 d-inline-block">
                    <button className="gen-button" type="button" onClick={handleDownload}>
                      <i className="fa fa-download"></i>
                      <span className="text">Download Message</span>
                    </button>
                  </div> */}
                  <div className="gen-btn-container d-inline-block">
                    <button className="gen-button gen-button-flat" type="button" onClick={handleCopyLink}>
                      <span className="text">{copyLabel}</span>
                    </button>
                  </div>
                </div>
                <h4 className="text-white">Description</h4>
                <p id="messageDescription" className="lfc-description mb-0">
                  {message.description || 'No description available.'}
                </p>
              </div>
            </div>

            <div className="col-lg-4 mb-4">
              <div className="lfc-single-card">
                <div className="lfc-speaker-summary">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <Image
                    id="messageSpeakerImage"
                  className="lfc-speaker-summary-image"
                  src={message.speakerImage || message.image}
                  alt={message.pastor}
                  width={72}
                  height={72}
                  quality={50}
                  loading="lazy"
                />
                  <div className="lfc-speaker-summary-copy">
                    <span className="lfc-pastor-chip" id="messagePastorChip">{message.pastor}</span>
                  </div>
                </div>
                <h5 className="text-white mb-3">Message Information</h5>
                <ul className="lfc-meta-list">
                  <li><strong>Pastor:</strong><span id="metaPastor">{message.pastor}</span></li>
                  <li><strong>Title:</strong><span id="metaTitle">{message.title}</span></li>
                  <li><strong>Date:</strong><span id="metaDate">{formattedDate}</span></li>
                  <li><strong>Downloads:</strong><span id="metaDownloads"><i className="fa fa-arrow-down" style={{ marginRight: 5, color: 'var(--lfc-accent, #e8a020)' }}></i>{message.downloadCount.toLocaleString()}</span></li>
                  <li><strong>Key Scripture:</strong><span id="messageScripture">{message.scripture || '—'}</span></li>
                </ul>
                <div className="gen-btn-container mt-4">
                  <Link id="browseByPastor" href={browseByPastorHref} className="gen-button gen-button-flat">
                    <span className="text">More From This Pastor</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="gen-section-padding-3 pt-0">
          <div className="container">
            <div className="row mb-3">
              <div className="col-lg-12">
                <h4 className="gen-heading-title">More Messages</h4>
              </div>
            </div>
            <div id="relatedMessages" className="row">
              {related.map((msg) => (
                <MessageCard key={msg.id} message={msg} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
