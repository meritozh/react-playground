import React from 'react';

export interface GlyphProps {
  top?: number;
  left?: number;
  children: React.ReactNode;
}

export const Glyph: React.FC<GlyphProps> = ({ top = 0, left = 0, children }) => {
  return <g transform={`translate(${left}, ${top})`}>{children}</g>;
};