import React from 'react';

export const Videos = () => {
  const videos = [
    {
      id: 'v1',
      title: 'Lagos Traffic Surviving 101 😂',
      creator: 'Broda Shaggi Fan Club',
      views: '420K views',
      duration: '0:58',
      thumbnail: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600'
    },
    {
      id: 'v2',
      title: 'How to make authentic Nigerian Smokey Party Jollof Rice 🇳🇬🍲',
      creator: 'Chef Tolu Lagos',
      views: '890K views',
      duration: '4:15',
      thumbnail: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600'
    },
    {
      id: 'v3',
      title: 'Inside the Tech Hubs of Yaba, Lagos: Silicon Lagoon',
      creator: 'Techpoint Africa',
      views: '150K views',
      duration: '8:40',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600'
    }
  ];

  return (
    <div className="main-layout">
      <main className="content-area">
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Naija Videos & Skits 🎬</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Watch the best comedy skits, culture documentaries, and trending moments
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {videos.map((vid) => (
            <div key={vid.id} className="card" style={{ overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '220px', background: '#000' }}>
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }}
                />
                <button
                  onClick={() => alert(`Playing: ${vid.title}`)}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(0, 135, 81, 0.9)',
                    border: '2px solid #fff',
                    color: '#fff',
                    fontSize: '24px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  ▶
                </button>
                <span style={{
                  position: 'absolute',
                  bottom: '10px',
                  right: '10px',
                  background: 'rgba(0,0,0,0.7)',
                  color: '#fff',
                  fontSize: '11px',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {vid.duration}
                </span>
              </div>

              <div style={{ padding: '14px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {vid.title}
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  {vid.creator} • {vid.views}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Videos;
