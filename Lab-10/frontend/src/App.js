import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import VideoPlayer from './components/VideoPlayer';
import CommentSection from './components/CommentSection';
import Sidebar from './components/Sidebar';

function App() {
  const [videos, setVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

  // Fetch all videos
  const fetchVideos = async (query = '') => {
    setLoading(true);
    try {
      const url = query
        ? `${baseURL}/videos?title=${encodeURIComponent(query)}`
        : `${baseURL}/videos`;
      const res = await axios.get(url);
      setVideos(res.data);
      if (res.data.length === 0) {
        setCurrentVideo(null);
        return;
      }

      const firstVideo = res.data[0];
      const currentId = currentVideo?._id;
      const currentInResults = currentId && res.data.some((v) => v._id === currentId);

      if (!currentId || !currentInResults || query.length >= 2) {
        loadVideo(firstVideo._id);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load single video
  const loadVideo = async (videoId) => {
    try {
      const res = await axios.get(`${baseURL}/videos/${videoId}`);
      setCurrentVideo(res.data);
      fetchHistory();
    } catch (error) {
      console.error('Error loading video:', error);
    }
  };

  // Add to watch history
  const addToHistory = async (videoId) => {
    try {
      await axios.post(`${baseURL}/videos/watch-history`, { videoId });
      fetchHistory();
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  };

  // Fetch watch history
  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${baseURL}/videos/watch-history`);
      setHistory(res.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  // Clear watch history
  const clearHistory = async () => {
    try {
      await axios.delete(`${baseURL}/videos/watch-history`);
      setHistory([]);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  // Handle like
  const handleLike = async () => {
    if (!currentVideo) return;
    try {
      const res = await axios.put(`${baseURL}/videos/${currentVideo._id}/like`, {
        like: true,
      });
      setCurrentVideo({ ...currentVideo, likes: res.data.likes });
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  // Handle comment
  const handleComment = async (author, text) => {
    if (!currentVideo) return;
    try {
      const res = await axios.put(`${baseURL}/videos/${currentVideo._id}/comments`, {
        author,
        text,
      });
      setCurrentVideo({ ...currentVideo, comments: res.data });
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length >= 2 || query.length === 0) {
      fetchVideos(query);
    }
  };

  // Initial load
  useEffect(() => {
    fetchVideos();
    fetchHistory();
  }, []);

  return (
    <div className="app">
      <Header onSearch={handleSearch} />
      <div className="main-container">
        <div className="main-content">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : videos.length === 0 ? (
            <div className="empty-state">
              <h2>No videos found</h2>
              <p>Try another search term or clear the search box to see all videos again.</p>
            </div>
          ) : currentVideo ? (
            <>
              <VideoPlayer
                video={currentVideo}
                source={currentVideo.localFile ? `${baseURL}/videos/stream/${currentVideo._id}` : currentVideo.videoUrl}
                onVideoEnded={() => addToHistory(currentVideo._id)}
              />
              <div className="video-info">
                <h2>{currentVideo.title}</h2>
                <div className="video-stats">
                  <span className="stat">{currentVideo.views || 0} Views</span>
                  <button className="like-btn" onClick={handleLike}>
                    ❤ {currentVideo.likes || 0} Likes
                  </button>
                </div>
                <p className="description">{currentVideo.description}</p>
              </div>
              <CommentSection
                comments={currentVideo.comments || []}
                onAddComment={handleComment}
              />
            </>
          ) : (
            <div className="loading">Loading...</div>
          )}
        </div>

        <Sidebar
          videos={videos}
          history={history}
          onSelectVideo={loadVideo}
          onClearHistory={clearHistory}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
