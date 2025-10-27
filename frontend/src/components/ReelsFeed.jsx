import React from 'react'
import { useNavigate } from 'react-router-dom'
import useVideoAutoplay from '../hooks/useVideoAutoplay'
import '../styles/reels.css'

// ReelsFeed expects a prop `videos` which is an array of { id, src, owner }
// owner can be { id, username }
const ReelsFeed = ({ videos = [] }) => {
  const navigate = useNavigate()
  const containerRef = React.useRef(null)

  useVideoAutoplay(containerRef)

  return (
    <div className="reels-container" ref={containerRef}>
      {videos.map(video => (
        <section className="reel-item" key={video._id} data-id={video._id}>
          <video
            className="reel-video"
            src={video.video}
            playsInline
            muted
            loop
            controls={false}
            preload="metadata"
          />
          {console.log("source-", video.video)}
          <div className="reel-overlay">
            <div className="reel-info">
              <h3 className="owner-name">{video.owner?.username || 'Unknown'}</h3>
            </div>

            <div className="reel-actions">
              <button
                className="explore-btn"
                onClick={() => navigate(`/user/${video.owner?.id || video.owner?.username}`)}
              >
                Explore More
              </button>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}

export default ReelsFeed
