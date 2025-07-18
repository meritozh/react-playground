import React from 'react';

export interface CandlestickGlyphProps {
  x: number;
  y: number;
  width: number;
  height: number;
  high: number;
  low: number;
  open: number;
  close: number;
  color: string;
}

export const CandlestickGlyph: React.FC<CandlestickGlyphProps> = ({ x, y, width, height, high, low, open, close, color }) => {
  const isBullish = close > open;
  const bodyHeight = Math.abs(open - close);
  const bodyY = isBullish ? close : open;

  return (
    <g>
      <line x1={x} y1={high} x2={x} y2={low} stroke={color} />
      <rect
        x={x - width / 2}
        y={bodyY}
        width={width}
        height={bodyHeight}
        fill={isBullish ? 'green' : 'red'}
      />
    </g>
  );
};