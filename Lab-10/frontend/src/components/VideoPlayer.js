import React from 'react';
import './VideoPlayer.css';

function VideoPlayer({ video, source, onVideoEnded }) {
  return (
    <div className="video-player-container">
      <div className="video-wrapper">
        <video
          key={video._id}
          controls
          autoPlay
          muted
          onEnded={() => onVideoEnded()}
          className="video-player"
        >
          <source src={source || video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>
    </div>
  );
}

export default VideoPlayer;
