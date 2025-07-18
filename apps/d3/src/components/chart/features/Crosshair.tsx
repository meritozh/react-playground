import React from 'react';

export interface CrosshairProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Crosshair: React.FC<CrosshairProps> = ({ x, y, width, height }) => {
  return (
    <g>
      <line x1={x} y1={0} x2={x} y2={height} stroke="gray" strokeDasharray="4" />
      <line x1={0} y1={y} x2={width} y2={y} stroke="gray" strokeDasharray="4" />
    </g>
  );
};