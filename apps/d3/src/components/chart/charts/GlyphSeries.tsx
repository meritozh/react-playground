import React from 'react';
import { Glyph } from '../components/Glyph';

export interface GlyphSeriesProps<T> {
  data: T[];
  renderGlyph: (d: T, i: number) => React.ReactNode;
}

export function GlyphSeries<T>({ data, renderGlyph }: GlyphSeriesProps<T>) {
  return <>{data.map(renderGlyph)}</>;
}