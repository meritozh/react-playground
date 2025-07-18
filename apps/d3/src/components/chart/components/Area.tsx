import React from 'react';
import * as d3 from 'd3';

export interface AreaProps<T> {
  data: T[];
  x: (d: T) => number;
  y0: (d: T) => number;
  y1: (d: T) => number;
  color: string;
}

export function Area<T>({ data, x, y0, y1, color }: AreaProps<T>) {
  const area = d3.area<T>().x(x).y0(y0).y1(y1);
  return <path d={area(data) || ''} fill={color} />;
}