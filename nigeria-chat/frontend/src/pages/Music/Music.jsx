import React, { useState } from 'react';

export const Music = () => {
  const [playingId, setPlayingId] = useState(null);

  const tracks = [
    {
      id: 't1',
      title: 'City Boys (Afrobeats Anthem)',
      artist: 'Burna Boy',
      album: 'I Told Them...',
      duration: '2:33',
      cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150',
      genre: 'Afrobeats'
    },
    {
      id: 't2',
      title: 'Unavailable',
      artist: 'Davido ft. Musa Keys',
      album: 'Timeless',
      duration: '2:49',
      cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=150',
      genre: 'Amapiano Naija'
    },
    {
      id: 't3',
      title: 'Calm Down',
      artist: 'Rema',
      album: 'Rave & Climax',
      duration: '3:39',
      cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=150',
      genre: 'Afro-Rave'
    },
    {
      id: 't4',
      title: 'Reasoning Naija',
      artist: 'Asake',
      album: 'Work of Art',
      duration: '2:55',
      cover: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150',
      genre: 'Street Pop / Fuji'
    }
  ];

  return (
    <div className="main-layout">
      <main className="content-area">
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Naija Music & Sounds 🎵</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Stream the latest Afrobeats, Street Pop, Highlife & Gospel hits
          </p>
        </div>

        {/* Music Hero Banner */}
        <div className="card" style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #008751 0%, #004d2e 100%)',
          color: '#fff',
          borderRadius: 'var(--radius-md)'
        }}>
          <span className="badge" style={{ background: '#ffb703', color: '#000', marginBottom: '8px' }}>
            Featured Playlist 🇳🇬
          </span>
          <h3 style={{ fontSize: '22px', fontWeight: 800 }}>Top 50 Nigeria Today</h3>
          <p style={{ fontSize: '13px', opacity: 0.9, marginTop: '4px' }}>
            The hottest tracks burning up Lagos, Abuja, London, and New York airwaves right now.
          </p>
          <button
            onClick={() => setPlayingId(tracks[0].id)}
            className="btn btn-secondary"
            style={{ marginTop: '16px', background: '#fff', color: '#008751' }}
          >
            ▶ Play All Tracks
          </button>
        </div>

        {/* Track List */}
        <div className="card" style={{ padding: '8px 16px' }}>
          {tracks.map((track) => {
            const isPlaying = playingId === track.id;
            return (
              <div
                key={track.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={track.cover}
                    alt={track.title}
                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14px', color: isPlaying ? 'var(--primary)' : 'inherit' }}>
                      {track.title}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {track.artist} • <span style={{ color: 'var(--primary)' }}>{track.genre}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{track.duration}</span>
                  <button
                    onClick={() => setPlayingId(isPlaying ? null : track.id)}
                    className="btn btn-outline"
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    {isPlaying ? '⏸ Pause' : '▶ Play'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Music;
