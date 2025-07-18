import React from 'react';

export interface TooltipProps {
  x: number;
  y: number;
  content: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ x, y, content }) => {
  return (
    <div style={{ position: 'absolute', top: y, left: x, pointerEvents: 'none' }}>
      {content}
    </div>
  );
};