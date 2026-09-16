import React, { useState } from 'react';
import { FiMessageSquare, FiSend } from 'react-icons/fi';
import './CommentSection.css';

function CommentSection({ comments = [], onAddComment }) {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddComment(author || 'Anonymous', text);
      setText('');
      setAuthor('');
    }
  };

  return (
    <div className="comment-section">
      <h3 className="comments-title"><FiMessageSquare /> Comments</h3>

      <form className="comment-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="comment-input"
        />
        <textarea
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="comment-textarea"
          rows="3"
        />
        <button type="submit" className="comment-submit">
          <FiSend /> Post
        </button>
      </form>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment, idx) => (
            <div key={idx} className="comment-item">
              <div className="comment-header">
                <strong className="comment-author">{comment.author}</strong>
                <span className="comment-time">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="comment-text">{comment.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CommentSection;
