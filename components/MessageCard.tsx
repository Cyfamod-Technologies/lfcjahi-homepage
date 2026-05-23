import Link from 'next/link'
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={message.image} alt={message.title} />
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
              <div className="lfc-card-speaker">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="lfc-card-speaker-image" src={pastorImage} alt={message.pastor} />
                <p className="lfc-card-note">{message.pastor}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
