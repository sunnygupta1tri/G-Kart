import React from 'react';

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center" role="status" aria-label="Loading">
      <div
        className="animate-spin rounded-full border-[8px] border-t-transparent"
        style={{
          width: '96px',
          height: '96px',
          borderImage: 'linear-gradient(45deg, #3b82f6, #8b5cf6) 1',
          borderStyle: 'solid',
        }}
      />
    </div>
  );
}
