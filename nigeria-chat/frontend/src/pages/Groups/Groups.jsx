import React, { useState } from 'react';

export const Groups = () => {
  const [groups, setGroups] = useState([
    {
      id: 'g1',
      name: 'Lagos Tech & Startup Ecosystem 🚀',
      category: 'Technology',
      description: 'The largest gathering of software engineers, founders, and investors in Yaba & Lagos.',
      members_count: 14200,
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
      joined: true
    },
    {
      id: 'g2',
      name: 'Naija Foodies & Jollof Masters 🍲',
      category: 'Food & Lifestyle',
      description: 'Celebrating authentic Nigerian cuisine, street food recipes, and the eternal Jollof debate!',
      members_count: 28900,
      avatar: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=150',
      joined: false
    },
    {
      id: 'g3',
      name: 'Abuja Real Estate & Living 🏢',
      category: 'Business',
      description: 'Housing, land acquisition, luxury apartments, and architectural developments in FCT Abuja.',
      members_count: 8750,
      avatar: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=150',
      joined: false
    },
    {
      id: 'g4',
      name: 'Afrobeats Creators & Sounds 🎵',
      category: 'Music & Culture',
      description: 'Producers, songwriters, artists, and music lovers connecting from Lagos to London.',
      members_count: 19400,
      avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150',
      joined: true
    }
  ]);

  const toggleJoin = (id) => {
    setGroups(prev => prev.map(g => {
      if (g.id === id) {
        return {
          ...g,
          joined: !g.joined,
          members_count: g.joined ? g.members_count - 1 : g.members_count + 1
        };
      }
      return g;
    }));
  };

  return (
    <div className="main-layout">
      <main className="content-area">
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Nigerian Groups & Communities 👥</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Join grassroots communities built for Nigerians everywhere
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {groups.map((group) => (
            <div key={group.id} className="card" style={{ padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
              <img
                src={group.avatar}
                alt={group.name}
                style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 700 }}>{group.name}</h3>
                </div>
                <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: 600, marginTop: '2px' }}>
                  {group.category} • {group.members_count.toLocaleString()} Members
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
                  {group.description}
                </p>
              </div>

              <button
                onClick={() => toggleJoin(group.id)}
                className={group.joined ? 'btn btn-outline' : 'btn btn-primary'}
                style={{ fontSize: '13px', padding: '8px 16px', whiteSpace: 'nowrap' }}
              >
                {group.joined ? 'Joined ✓' : 'Join Group'}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Groups;
