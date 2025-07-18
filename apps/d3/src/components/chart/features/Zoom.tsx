import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export interface ZoomProps {
  width: number;
  height: number;
  onZoom: (transform: d3.ZoomTransform) => void;
}

export const Zoom: React.FC<ZoomProps> = ({ width, height, onZoom }) => {
  const ref = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (ref.current) {
      const zoom = d3.zoom<SVGRectElement, unknown>().on('zoom', (event) => {
        onZoom(event.transform);
      });
      d3.select(ref.current).call(zoom);
    }
  }, [onZoom]);

  return <rect ref={ref} width={width} height={height} style={{ fill: 'none', pointerEvents: 'all' }} />;
};