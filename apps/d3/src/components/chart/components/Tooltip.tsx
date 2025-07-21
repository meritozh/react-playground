import React from 'react';

export interface TooltipProps {
  x: number;
  y: number;
  content: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ x, y, content }) => {
  return (
    <foreignObject x={x} y={y} width="100" height="50">
      <div style={{ 
        backgroundColor: 'white', 
        border: '1px solid black', 
        padding: '5px',
        borderRadius: '3px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
      }}>
        {content}
      </div>
    </foreignObject>
  );
};