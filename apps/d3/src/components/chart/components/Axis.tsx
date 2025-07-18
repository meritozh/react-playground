import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export type AxisScale = d3.ScaleLinear<number, number> | d3.ScaleTime<number, number>;

export interface AxisProps {
  scale: AxisScale;
  orientation: 'bottom' | 'left';
  transform?: string;
}

export const Axis: React.FC<AxisProps> = ({ scale, orientation, transform }) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      const axisGenerator = orientation === 'bottom' ? d3.axisBottom : d3.axisLeft;
      const axis = axisGenerator(scale as d3.AxisScale<d3.AxisDomain>);
      d3.select(ref.current).call(axis);
    }
  }, [scale, orientation]);

  return <g ref={ref} transform={transform} />;
};