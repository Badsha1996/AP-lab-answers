import React, { useState } from 'react';
import { FiPlay, FiClock, FiTrash2 } from 'react-icons/fi';
import './Sidebar.css';

const placeholderThumbnail = 'https://picsum.photos/id/1060/640/360';

function Sidebar({ videos = [], history = [], onSelectVideo, onClearHistory, loading }) {
  const [activeTab, setActiveTab] = useState('videos');

  const getVideoTitle = (videoId) => {
    const video = videos.find((v) => v._id === videoId);
    return video ? video.title : videoId;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-tabs">
        <button
          className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
          onClick={() => setActiveTab('videos')}
        >
          <FiPlay /> Videos
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FiClock /> History
        </button>
      </div>

      {activeTab === 'videos' && (
        <div className="videos-container">
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : videos.length === 0 ? (
            <p className="empty-text">No videos found</p>
          ) : (
            videos.map((video) => (
              <div
                key={video._id}
                className="video-tile"
                onClick={() => onSelectVideo(video._id)}
              >
                <div className="video-thumbnail">
                  <img
                    src={video.thumbnail || placeholderThumbnail}
                    alt={video.title}
                    onError={(e) => { e.target.onerror = null; e.target.src = placeholderThumbnail }}
                  />
                  <div className="video-overlay-badge">
                    <span className="views-badge">👁 {video.views}</span>
                  </div>
                </div>
                <div className="video-tile-info">
                  <h4 className="video-tile-title">{video.title}</h4>
                  <p className="video-tile-desc">{video.description.substring(0, 50)}...</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="history-container">
          <div className="history-header">
            <span className="history-count">{history.length} items</span>
            {history.length > 0 && (
              <button className="clear-btn" onClick={onClearHistory}>
                <FiTrash2 /> Clear
              </button>
            )}
          </div>
          {history.length === 0 ? (
            <p className="empty-text">No history yet</p>
          ) : (
            <div className="history-list">
              {history.map((item, idx) => (
                <div
                  key={idx}
                  className="history-item"
                  onClick={() => onSelectVideo(item.videoId)}
                >
                  <div className="history-info">
                    <p className="history-title">{getVideoTitle(item.videoId)}</p>
                    <span className="history-time">
                      {new Date(item.watchedAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <FiPlay className="history-icon" />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
