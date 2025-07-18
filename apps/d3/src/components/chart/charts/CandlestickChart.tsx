import React, { useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Axis } from '../components/Axis';
import { Zoom } from '../features/Zoom';
import { Brush } from '../features/Brush';
import { Crosshair } from '../features/Crosshair';
import { Tooltip } from '../components/Tooltip';
import { GlyphSeries } from './GlyphSeries';
import { CandlestickGlyph } from './CandlestickGlyph';
import { Glyph } from '../components/Glyph';
import type { StockData } from '../hooks/useFakeStockData';

export interface CandlestickChartProps {
  data: StockData[];
  width: number;
  height: number;
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({ data, width, height }) => {
  const [transform, setTransform] = useState<d3.ZoomTransform>(d3.zoomIdentity);
  const [brushSelection, setBrushSelection] = useState<[number, number] | null>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const xScale = useMemo(() => {
    const domain = brushSelection ? [brushSelection[0], brushSelection[1]] : [0, data.length];
    return d3.scaleLinear().domain(domain).range([0, xMax]);
  }, [data.length, xMax, brushSelection]);

  const yDomain = useMemo(() => [
    d3.min(data, (d) => d.low),
    d3.max(data, (d) => d.high),
  ] as [number, number], [data]);

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain(yDomain).range([yMax, 0]);
  }, [yDomain, yMax]);

  const transformedXScale = transform.rescaleX(xScale);

  const handleZoom = (newTransform: d3.ZoomTransform) => {
    setTransform(newTransform);
  };

  const handleBrush = (selection: [number, number] | null) => {
    setBrushSelection(selection);
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const [x, y] = d3.pointer(event);
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  const tooltipData = useMemo(() => {
    if (!mousePosition) return null;
    const x = transformedXScale.invert(mousePosition.x - margin.left);
    const index = Math.round(x);
    return data[index];
  }, [mousePosition, transformedXScale, data, margin.left]);

  return (
    <svg
      width={width}
      height={height}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <Axis scale={transformedXScale} orientation="bottom" transform={`translate(0, ${yMax})`} />
        <Axis scale={yScale} orientation="left" />
        <Zoom width={xMax} height={yMax} onZoom={handleZoom} />
        <GlyphSeries
          data={data}
          renderGlyph={(d: StockData, i: number) => (
            <Glyph key={i}>
              <CandlestickGlyph
                x={transformedXScale(i)}
                y={yScale(d.high)}
                width={5}
                height={yScale(d.low) - yScale(d.high)}
                open={yScale(d.open)}
                close={yScale(d.close)}
                high={yScale(d.high)}
                low={yScale(d.low)}
                color="black"
              />
            </Glyph>
          )}
        />
        {mousePosition && <Crosshair x={mousePosition.x - margin.left} y={mousePosition.y - margin.top} width={xMax} height={yMax} />}
        {tooltipData && mousePosition && (
          <Tooltip x={mousePosition.x} y={mousePosition.y} content={<div>{tooltipData.close}</div>} />
        )}
        <Brush width={xMax} height={50} onBrush={handleBrush} />
      </g>
    </svg>
  );
};