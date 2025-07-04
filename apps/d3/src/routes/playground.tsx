import { createFileRoute } from '@tanstack/react-router'
import * as d3 from 'd3'
import { useEffect, useRef } from 'react'

export const Route = createFileRoute('/playground')({
  component: Playground,
})

function Playground() {
  const ref = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (ref.current) {
      const svg = d3.select(ref.current)
      const width = 500
      const height = 500

      svg.attr('width', width).attr('height', height)

      const data = [10, 20, 30, 40, 50]

      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * 70)
        .attr('y', (d) => height - 10 * d)
        .attr('width', 65)
        .attr('height', (d) => d * 10)
        .attr('fill', 'teal')
    }
  }, [])

  return (
    <div className="p-2">
      <h3>Playground</h3>
      <svg ref={ref}></svg>
    </div>
  )
}