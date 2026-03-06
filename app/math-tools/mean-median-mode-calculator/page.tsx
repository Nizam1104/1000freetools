"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function MeanMedianModeCalculator() {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const numbers = input.split(/[\n,\s]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (numbers.length === 0) return;

    const sorted = [...numbers].sort((a, b) => a - b);
    const n = sorted.length;
    
    // Mean
    const mean = sorted.reduce((a, b) => a + b, 0) / n;
    
    // Median
    let median: number;
    if (n % 2 === 0) {
      median = (sorted[n/2 - 1] + sorted[n/2]) / 2;
    } else {
      median = sorted[Math.floor(n/2)];
    }
    
    // Mode
    const freq: Record<number, number> = {};
    sorted.forEach(num => { freq[num] = (freq[num] || 0) + 1; });
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.keys(freq).filter(k => freq[parseInt(k)] === maxFreq).map(Number);
    
    // Range
    const range = sorted[n-1] - sorted[0];
    
    // Quartiles
    const q1Index = Math.floor((n + 1) / 4) - 1;
    const q3Index = Math.floor(3 * (n + 1) / 4) - 1;
    const q1 = sorted[Math.max(0, q1Index)];
    const q3 = sorted[Math.min(n-1, q3Index)];
    const iqr = q3 - q1;

    setResult({
      count: n,
      mean, median, modes: modes.length === n ? [] : modes, range,
      min: sorted[0], max: sorted[n-1], sum: sorted.reduce((a,b)=>a+b,0),
      q1, q3, iqr, sorted
    });
  };

  const reset = () => { setInput(""); setResult(null); };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Mean, Median, Mode Calculator – Statistics Calculator Online</h1>
        <p className="text-muted-foreground">
          Calculate mean, median, and mode of any dataset with our free online statistics calculator. Enter your numbers and get comprehensive central tendency measures instantly.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>Statistics Calculator</CardTitle><CardDescription>Enter numbers separated by commas, spaces, or new lines</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Dataset</Label>
              <Textarea rows={4} placeholder="e.g., 12, 15, 18, 20, 22, 25, 30" value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <div className="flex gap-2"><Button onClick={calculate}>Calculate</Button><Button variant="outline" onClick={reset}>Reset</Button></div>

            {result && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Count</p><p className="text-2xl font-bold">{result.count}</p></div>
                  <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Mean</p><p className="text-2xl font-bold">{result.mean.toFixed(4)}</p></div>
                  <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Median</p><p className="text-2xl font-bold">{result.median.toFixed(4)}</p></div>
                  <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Mode</p><p className="text-2xl font-bold">{result.modes.length > 0 ? result.modes.join(", ") : "No mode"}</p></div>
                </div>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 border rounded-lg text-center"><p className="text-sm text-muted-foreground">Min</p><p className="text-xl font-bold">{result.min}</p></div>
                  <div className="p-4 border rounded-lg text-center"><p className="text-sm text-muted-foreground">Q1</p><p className="text-xl font-bold">{result.q1}</p></div>
                  <div className="p-4 border rounded-lg text-center"><p className="text-sm text-muted-foreground">Q3</p><p className="text-xl font-bold">{result.q3}</p></div>
                  <div className="p-4 border rounded-lg text-center"><p className="text-sm text-muted-foreground">Max</p><p className="text-xl font-bold">{result.max}</p></div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Range</p><p className="text-xl font-mono">{result.range}</p></div>
                  <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">Sum</p><p className="text-xl font-mono">{result.sum}</p></div>
                  <div className="p-4 border rounded-lg"><p className="text-sm text-muted-foreground">IQR</p><p className="text-xl font-mono">{result.iqr}</p></div>
                </div>
                <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-2">Sorted Data</h4><p className="font-mono text-sm">{result.sorted.join(", ")}</p></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Understanding Central Tendency</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Mean is the average – add everything up and divide by how many. It's sensitive to outliers. Median is the middle value when sorted. Mode is the most frequent value.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-2">Mean</h4><p className="text-xs text-muted-foreground">Best for symmetric distributions without outliers</p></div>
            <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-2">Median</h4><p className="text-xs text-muted-foreground">Best for skewed distributions or with outliers</p></div>
            <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-2">Mode</h4><p className="text-xs text-muted-foreground">Best for categorical data or finding common values</p></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Related Math Tools</CardTitle></CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/math-tools/standard-deviation-variance-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Standard Deviation</p><p className="text-xs text-muted-foreground">Calculate spread</p></a>
            <a href="/math-tools/probability-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Probability Calculator</p><p className="text-xs text-muted-foreground">Calculate probability</p></a>
            <a href="/math-tools/average-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Average Calculator</p><p className="text-xs text-muted-foreground">Simple average</p></a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
