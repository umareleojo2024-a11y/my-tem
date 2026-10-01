import React from 'react';

export const Spinner = ({ size = '24px', color = 'var(--primary)' }) => {
  return (
    <div style={{
      width: size,
      height: size,
      border: `3px solid rgba(0, 135, 81, 0.2)`,
      borderTop: `3px solid ${color}`,
      borderRadius: '50%',
      animation: 'nc-spin 0.8s linear infinite',
      display: 'inline-block'
    }}>
      <style>{`
        @keyframes nc-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
