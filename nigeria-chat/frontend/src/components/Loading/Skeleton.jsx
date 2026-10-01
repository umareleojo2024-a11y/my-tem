import React from 'react';

export const Skeleton = ({ width = '100%', height = '16px', borderRadius = '4px', style = {} }) => {
  return (
    <div style={{
      width,
      height,
      borderRadius,
      backgroundColor: 'var(--border-subtle)',
      backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%)',
      backgroundSize: '200% 100%',
      animation: 'nc-shimmer 1.5s infinite',
      ...style
    }}>
      <style>{`
        @keyframes nc-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
};

export default Skeleton;
