import React, { useState } from 'react';
import { formatRelativeTime, getAvatarUrl } from '../../utils/formatters';
import CommentSection from '../Comment/CommentSection';

export const PostCard = ({ post, onLikeToggle }) => {
  const [showComments, setShowComments] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count || 0);
  const [isLiked, setIsLiked] = useState(post.is_liked || false);

  const handleLike = () => {
    const nextState = !isLiked;
    setIsLiked(nextState);
    setLikesCount(prev => prev + (nextState ? 1 : -1));
    if (onLikeToggle) onLikeToggle(post.id, isLiked);
  };

  return (
    <article className="card" style={{ padding: '16px' }}>
      {/* Post Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <img
            src={getAvatarUrl(post.author)}
            alt={post.author?.full_name || 'Author'}
            className="avatar"
            style={{ width: '42px', height: '42px' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>
                {post.author?.full_name || 'Anonymous User'}
              </span>
              {post.author?.is_verified && (
                <span title="Verified Naija User" style={{ color: 'var(--primary)', fontSize: '14px' }}>
                  ✓
                </span>
              )}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '6px' }}>
              <span>@{post.author?.username || 'user'}</span>
              <span>•</span>
              <span>{formatRelativeTime(post.created_at)}</span>
              {post.location && (
                <>
                  <span>•</span>
                  <span>📍 {post.location}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p style={{
        fontSize: '15px',
        color: 'var(--text-primary)',
        whiteSpace: 'pre-wrap',
        marginBottom: '12px',
        lineHeight: 1.5
      }}>
        {post.content}
      </p>

      {/* Media Attachments */}
      {post.media && post.media.length > 0 && (
        <div style={{ marginBottom: '12px', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
          {post.media.map((item, idx) => (
            <div key={idx}>
              {item.media_type === 'video' ? (
                <video src={item.media_url} controls style={{ width: '100%', maxHeight: '420px', borderRadius: 'var(--radius-md)' }} />
              ) : (
                <img
                  src={item.media_url}
                  alt="Post Attachment"
                  style={{ width: '100%', maxHeight: '460px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Action Stats & Buttons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: '10px',
        marginTop: '8px',
        fontSize: '13px',
        color: 'var(--text-secondary)'
      }}>
        <button
          onClick={handleLike}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: isLiked ? '#e63946' : 'inherit',
            fontWeight: isLiked ? 700 : 500
          }}
        >
          <span>{isLiked ? '❤️' : '🤍'}</span>
          <span>{likesCount} Likes</span>
        </button>

        <button
          onClick={() => setShowComments(!showComments)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'inherit'
          }}
        >
          <span>💬</span>
          <span>{post.comments_count || 0} Comments</span>
        </button>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: 'Nigeria Chat Post', text: post.content, url: window.location.href });
            } else {
              navigator.clipboard?.writeText(window.location.href);
              alert('Post link copied to clipboard!');
            }
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'inherit'
          }}
        >
          <span>↗️</span>
          <span>Share</span>
        </button>
      </div>

      {/* Comment Section Dropdown */}
      {showComments && (
        <CommentSection postId={post.id} />
      )}
    </article>
  );
};

export default PostCard;
