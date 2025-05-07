'use client';

import React, { useState, useEffect } from 'react';

const ScreenDebugger: React.FC = () => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    devicePixelRatio: 0,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // 只在开发环境显示
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '4px 8px',
        fontSize: '12px',
        zIndex: 9999,
        textAlign: 'center',
      }}
    >
      {dimensions.width} x {dimensions.height} (DPR: {dimensions.devicePixelRatio})
    </div>
  );
};

export default ScreenDebugger; 