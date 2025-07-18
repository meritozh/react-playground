import React from 'react';
import * as d3 from 'd3';

export interface ShapeProps {
  shape: 'circle' | 'square';
  size: number;
  color: string;
}

export const Shape: React.FC<ShapeProps> = ({ shape, size, color }) => {
  const pathGenerator = d3.symbol().type(d3.symbols[shape === 'circle' ? 0 : 1]).size(size);
  const path = pathGenerator();
  return <path d={path || ''} fill={color} />;
};