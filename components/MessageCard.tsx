import Link from 'next/link'
import Image from 'next/image'
import type { Message } from '@/lib/types'
import { formatDate } from '@/lib/utils'

interface MessageCardProps {
  message: Message
}

export default function MessageCard({ message }: MessageCardProps) {
  const detailUrl = `/messages/${encodeURIComponent(message.id)}`
  const pastorImage = message.speakerImage || message.image

  return (
    <div className="col-xl-3 col-lg-4 col-md-6 mb-4">
      <Link className="lfc-card-link" href={detailUrl}>
        <div className="gen-carousel-movies-style-1 movie-grid style-1">
          <div className="gen-movie-contain">
            <div className="gen-movie-img">
              <Image
                src={message.image}
                alt={message.title}
                width={400}
                height={300}
                style={{ width: '100%', height: '300px', objectFit: 'cover' }}
                sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
                quality={60}
                loading="lazy"
              />
              <div className="gen-movie-action">
                <span className="gen-button" aria-label={`Play ${message.title}`}>
                  <i className="fa fa-play"></i>
                </span>
              </div>
            </div>
            <div className="gen-info-contain">
              <div className="gen-movie-info">
                <h3>{message.title}</h3>
              </div>
              <div className="gen-movie-meta-holder">
                <ul>
                  <li><span>{formatDate(message.date)}</span></li>
                  <li>{message.duration}</li>
                </ul>
              </div>
              <div className="lfc-card-downloads">
                <i className="fa fa-arrow-down lfc-card-download-icon"></i>
                <span>{message.downloadCount.toLocaleString()} download{message.downloadCount !== 1 ? 's' : ''}</span>
              </div>
              <div className="lfc-card-speaker">
                <Image
                  className="lfc-card-speaker-image"
                  src="/images/favicon.png"
                  alt="LFC Jahi"
                  width={34}
                  height={34}
                  quality={45}
                  loading="lazy"
                />
                <p className="lfc-card-note">{message.pastor}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
