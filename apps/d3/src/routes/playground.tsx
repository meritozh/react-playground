import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { CandlestickChart } from '../components/chart/charts/CandlestickChart'
import { useFakeStockData } from '../components/chart/hooks/useFakeStockData'

export const Route = createFileRoute('/playground')({
  component: Playground,
})

function Playground() {
  const [isGenerating, setIsGenerating] = useState(false);
  const data = useFakeStockData(100, isGenerating);

  return (
    <div className="p-2">
      <h3>Playground</h3>
      <button onClick={() => setIsGenerating((prev) => !prev)}>
        {isGenerating ? 'Stop Generating' : 'Start Generating'}
      </button>
      <CandlestickChart data={data} width={800} height={600} />
    </div>
  );
}