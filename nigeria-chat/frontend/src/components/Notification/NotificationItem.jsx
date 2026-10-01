import React from 'react';
import { formatRelativeTime, getAvatarUrl } from '../../utils/formatters';

export const NotificationItem = ({ notification, onMarkRead }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'like': return '❤️';
      case 'comment': return '💬';
      case 'follow': return '👤';
      case 'message': return '✉️';
      default: return '🔔';
    }
  };

  return (
    <div
      onClick={() => onMarkRead(notification.id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderBottom: '1px solid var(--border-subtle)',
        background: notification.is_read ? 'var(--bg-surface)' : 'var(--primary-light)',
        cursor: 'pointer',
        transition: 'background 0.2s ease'
      }}
    >
      <div style={{ position: 'relative' }}>
        <img
          src={getAvatarUrl(notification.sender)}
          alt="Sender"
          className="avatar"
          style={{ width: '42px', height: '42px' }}
        />
        <span style={{
          position: 'absolute',
          bottom: '-2px',
          right: '-2px',
          fontSize: '12px',
          background: 'var(--bg-surface)',
          borderRadius: '50%',
          padding: '2px'
        }}>
          {getIcon(notification.type)}
        </span>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
          {notification.message}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
          {formatRelativeTime(notification.created_at)}
        </div>
      </div>

      {!notification.is_read && (
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: 'var(--primary)'
        }} />
      )}
    </div>
  );
};

export default NotificationItem;
