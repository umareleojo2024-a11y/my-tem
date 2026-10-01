import React, { useState, useEffect } from 'react';
import { getNotifications, markAsRead, markAllAsRead } from '../../services/notifications';
import NotificationItem from '../../components/Notification/NotificationItem';
import Spinner from '../../components/Loading/Spinner';

export const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const { data } = await getNotifications();
        if (mounted) {
          setNotifications(data || []);
          setLoading(false);
        }
      } catch (e) {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  const handleMarkRead = async (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
    await markAsRead(id);
  };

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
    await markAllAsRead();
  };

  return (
    <div className="main-layout">
      <main className="content-area">
        <div className="card" style={{ overflow: 'hidden' }}>
          <div style={{
            padding: '16px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: 800 }}>
              Notifications 🔔
            </h2>
            <button
              onClick={handleMarkAllRead}
              className="btn btn-outline"
              style={{ fontSize: '12px', padding: '4px 10px' }}
            >
              Mark all as read
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <Spinner />
            </div>
          ) : notifications.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No notifications at the moment.
            </div>
          ) : (
            notifications.map((item) => (
              <NotificationItem
                key={item.id}
                notification={item}
                onMarkRead={handleMarkRead}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
