// components/Spinner.tsx
import React from 'react';

const Spinner: React.FC<{ size?: number; color?: string }> = ({
  size = 40,
  color = '#4f46e5', // default indigo
}) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `${size / 8}px solid #e5e7eb`, // light gray
        borderTop: `${size / 8}px solid ${color}`,
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
      }}
    />
  );
};

export default Spinner;
