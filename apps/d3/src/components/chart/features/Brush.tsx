import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface BrushProps {
  width: number;
  height: number;
  onBrush: (selection: [number, number] | null) => void;
}

export const Brush: React.FC<BrushProps> = ({ width, height, onBrush }) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const brush = d3.brushX().extent([[0, 0], [width, height]]).on('end', (event) => {
        onBrush(event.selection as [number, number] | null);
      });
      const g = d3.select(ref.current);
      g.call(brush);

      // Style the brush overlay to make it visible
      g.select('.overlay')
        .style('fill', 'rgba(0, 0, 0, 0.1)');

      // Style the brush selection
      g.select('.selection')
        .style('fill', 'rgba(0, 0, 255, 0.3)');
    }
  }, [width, height, onBrush]);

  return <g ref={ref} />;
};