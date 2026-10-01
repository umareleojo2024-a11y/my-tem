import React, { useState } from 'react';

export const Pages = () => {
  const [pages, setPages] = useState([
    {
      id: 'p1',
      name: 'Super Eagles Official 🦅',
      category: 'Sports Organization',
      followers: 1250000,
      avatar: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150',
      following: true
    },
    {
      id: 'p2',
      name: 'Channels Television 📺',
      category: 'News & Media',
      followers: 980000,
      avatar: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=150',
      following: false
    },
    {
      id: 'p3',
      name: 'Eleojocafe Innovations 💡',
      category: 'Technology & AI',
      followers: 45000,
      avatar: '/logo/nigeria_chat_logo.svg',
      following: true
    },
    {
      id: 'p4',
      name: 'Naija Comedy Lounge 😂',
      category: 'Entertainment',
      followers: 670000,
      avatar: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=150',
      following: false
    }
  ]);

  const toggleFollow = (id) => {
    setPages(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          following: !p.following,
          followers: p.following ? p.followers - 1 : p.followers + 1
        };
      }
      return p;
    }));
  };

  return (
    <div className="main-layout">
      <main className="content-area">
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Verified Pages 📄</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Follow your favorite Nigerian brands, personalities, and media channels
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {pages.map((page) => (
            <div key={page.id} className="card" style={{ padding: '16px', textAlign: 'center' }}>
              <img
                src={page.avatar}
                alt={page.name}
                style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 10px auto' }}
              />
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{page.name}</h3>
              <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                {page.category}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, marginTop: '4px' }}>
                {page.followers.toLocaleString()} Followers
              </div>

              <button
                onClick={() => toggleFollow(page.id)}
                className={page.following ? 'btn btn-outline' : 'btn btn-primary'}
                style={{ width: '100%', marginTop: '12px', fontSize: '13px', padding: '8px' }}
              >
                {page.following ? 'Following ✓' : 'Follow Page'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Pages;
