import React, { useState, useEffect } from 'react';
import { getPostComments, addComment } from '../../services/posts';
import { formatRelativeTime, getAvatarUrl } from '../../utils/formatters';
import useAuth from '../../hooks/useAuth';

export const CommentSection = ({ postId }) => {
  const { user, profile } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data } = await getPostComments(postId);
      if (mounted) {
        setComments(data || []);
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      setSubmitting(true);
      const { data, error } = await addComment(postId, text.trim());
      if (data) {
        setComments(prev => [...prev, data]);
        setText('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: '16px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
      {/* Input box */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <img
          src={getAvatarUrl(profile || user)}
          alt="Avatar"
          className="avatar"
          style={{ width: '32px', height: '32px' }}
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a comment in Pidgin or English..."
          style={{
            flex: 1,
            padding: '8px 14px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-light)',
            background: 'var(--bg-main)',
            color: 'var(--text-primary)',
            fontSize: '13px'
          }}
        />
        <button
          type="submit"
          disabled={submitting || !text.trim()}
          className="btn btn-primary"
          style={{ padding: '6px 14px', fontSize: '12px', opacity: text.trim() ? 1 : 0.6 }}
        >
          Send
        </button>
      </form>

      {/* Comment List */}
      {loading ? (
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Loading comments...</div>
      ) : comments.length === 0 ? (
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '8px 0' }}>
          No comments yet. Be the first to reply!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {comments.map((c) => (
            <div key={c.id} style={{ display: 'flex', gap: '8px' }}>
              <img
                src={getAvatarUrl(c.author)}
                alt="Commenter"
                className="avatar"
                style={{ width: '28px', height: '28px' }}
              />
              <div style={{
                background: 'var(--bg-main)',
                padding: '8px 12px',
                borderRadius: 'var(--radius-md)',
                flex: 1
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '13px' }}>
                    {c.author?.full_name || c.author?.username || 'User'}
                  </span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {formatRelativeTime(c.created_at)}
                  </span>
                </div>
                <p style={{ fontSize: '13px', marginTop: '2px', color: 'var(--text-primary)' }}>
                  {c.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
