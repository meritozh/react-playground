import { useState, useEffect } from 'react';

export interface StockData {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}

export const useFakeStockData = (interval: number, enabled: boolean) => {
  const [data, setData] = useState<StockData[]>([]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    const timer = setInterval(() => {
      setData((prevData) => {
        const lastData = prevData[prevData.length - 1];
        const newDate = lastData
          ? new Date(lastData.date.getTime() + 24 * 60 * 60 * 1000)
          : new Date();
        const newOpen = lastData ? lastData.close : 50;
        const newClose = newOpen + (Math.random() - 0.5) * 5;
        const newHigh = Math.max(newOpen, newClose) + Math.random();
        const newLow = Math.min(newOpen, newClose) - Math.random();

        return [
          ...prevData,
          {
            date: newDate,
            open: newOpen,
            high: newHigh,
            low: newLow,
            close: newClose,
          },
        ];
      });
    }, interval);

    return () => clearInterval(timer);
  }, [interval, enabled]);

  return data;
};