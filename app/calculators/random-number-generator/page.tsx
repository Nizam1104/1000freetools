"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState<string>("1");
  const [max, setMax] = useState<string>("100");
  const [count, setCount] = useState<string>("1");
  const [allowDuplicates, setAllowDuplicates] = useState<boolean>(true);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const minVal = parseInt(min);
    const maxVal = parseInt(max);
    const countVal = parseInt(count);
    
    if (!isNaN(minVal) && !isNaN(maxVal) && !isNaN(countVal) && minVal <= maxVal) {
      const nums: number[] = [];
      
      if (allowDuplicates) {
        for (let i = 0; i < countVal; i++) {
          nums.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
        }
      } else {
        const range = maxVal - minVal + 1;
        const actualCount = Math.min(countVal, range);
        const available = new Set<number>();
        for (let i = minVal; i <= maxVal; i++) available.add(i);
        
        for (let i = 0; i < actualCount && available.size > 0; i++) {
          const arr = Array.from(available);
          const idx = Math.floor(Math.random() * arr.length);
          nums.push(arr[idx]);
          available.delete(arr[idx]);
        }
      }
      
      setResults(nums);
    }
  };

  const reset = () => {
    setMin("1");
    setMax("100");
    setCount("1");
    setAllowDuplicates(true);
    setResults([]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Random Number Generator</CardTitle>
          <CardDescription>Generate random numbers within a range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Min</label>
                <Input
                  type="number"
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Max</label>
                <Input
                  type="number"
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Count</label>
                <Input
                  type="number"
                  min="1"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="duplicates"
                checked={allowDuplicates}
                onChange={(e) => setAllowDuplicates(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="duplicates" className="text-sm">Allow duplicates</label>
            </div>
            <div className="flex gap-2">
              <Button onClick={generate}>Generate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {results.length > 0 && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm text-muted-foreground mb-2">Random Numbers</p>
                <p className="text-xl font-semibold">{results.join(", ")}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
