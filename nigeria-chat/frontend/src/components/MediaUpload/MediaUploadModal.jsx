import React, { useState } from 'react';

export const MediaUploadModal = ({ isOpen, onClose, onUploadComplete, bucket = 'post-images' }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      // Return media object
      onUploadComplete({
        url: preview,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : file.type.startsWith('video/') ? 'video' : 'audio'
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '16px'
    }}>
      <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '20px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '14px' }}>
          Upload Media 📸
        </h3>

        <input
          type="file"
          accept="image/*,video/*,audio/*"
          onChange={handleFile}
          style={{ marginBottom: '14px' }}
        />

        {preview && (
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <img
              src={preview}
              alt="Preview"
              style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: 'var(--radius-sm)' }}
            />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button onClick={onClose} className="btn btn-outline" style={{ fontSize: '13px' }}>
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="btn btn-primary"
            style={{ fontSize: '13px' }}
          >
            {uploading ? 'Uploading...' : 'Confirm Upload'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaUploadModal;
