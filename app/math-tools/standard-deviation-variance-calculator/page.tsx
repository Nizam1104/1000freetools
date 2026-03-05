"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function StandardDeviationVarianceCalculator() {
  const [input, setInput] = useState<string>("");
  const [isPopulation, setIsPopulation] = useState<boolean>(true);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const numbers = input.split(/[\n,\s]+/).map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (numbers.length < 2) return;

    const n = numbers.length;
    const mean = numbers.reduce((a, b) => a + b, 0) / n;
    const squaredDiffs = numbers.map(x => Math.pow(x - mean, 2));
    const sumSquaredDiffs = squaredDiffs.reduce((a, b) => a + b, 0);
    
    const variance = isPopulation ? sumSquaredDiffs / n : sumSquaredDiffs / (n - 1);
    const stdDev = Math.sqrt(variance);
    const cv = (stdDev / Math.abs(mean)) * 100;

    setResult({
      count: n, mean, variance, stdDev, cv, sumSquaredDiffs,
      steps: [
        `Count (n) = ${n}`,
        `Mean (μ) = ${mean.toFixed(4)}`,
        ``,
        `Sum of squared differences from mean:`,
        `  Σ(x - μ)² = ${sumSquaredDiffs.toFixed(4)}`,
        ``,
        `${isPopulation ? "Population" : "Sample"} ${isPopulation ? "" : "(n-1 = " + (n-1) + ")" }:`,
        `  Variance (σ²) = ${sumSquaredDiffs.toFixed(4)} / ${isPopulation ? n : n-1}`,
        `  Variance = ${variance.toFixed(4)}`,
        ``,
        `Standard Deviation:`,
        `  σ = √${variance.toFixed(4)}`,
        `  σ = ${stdDev.toFixed(4)}`,
        ``,
        `Coefficient of Variation:`,
        `  CV = (σ/|μ|) × 100 = ${cv.toFixed(2)}%`
      ]
    });
  };

  const reset = () => { setInput(""); setResult(null); };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Standard Deviation Calculator – Variance & SD Online</h1>
        <p className="text-muted-foreground">
          Calculate standard deviation and variance for any dataset with our free online calculator. Supports both population and sample standard deviation with step-by-step workings.
        </p>
      </div>

      <Card>
        <CardHeader><CardTitle>Standard Deviation & Variance Calculator</CardTitle><CardDescription>Enter numbers separated by commas, spaces, or new lines</CardDescription></CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Dataset</Label>
              <Textarea rows={4} placeholder="e.g., 10, 12, 15, 18, 20, 22, 25" value={input} onChange={(e) => setInput(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isPopulation} onCheckedChange={setIsPopulation} id="pop-switch" />
              <Label htmlFor="pop-switch">{isPopulation ? "Population Standard Deviation (σ)" : "Sample Standard Deviation (s)"}</Label>
            </div>
            <div className="flex gap-2"><Button onClick={calculate}>Calculate</Button><Button variant="outline" onClick={reset}>Reset</Button></div>

            {result && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Count</p><p className="text-2xl font-bold">{result.count}</p></div>
                  <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Mean</p><p className="text-2xl font-bold">{result.mean.toFixed(4)}</p></div>
                  <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Variance</p><p className="text-2xl font-bold">{result.variance.toFixed(4)}</p></div>
                  <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Std Dev</p><p className="text-2xl font-bold">{result.stdDev.toFixed(4)}</p></div>
                </div>
                <div className="p-4 border rounded-lg text-center"><p className="text-sm text-muted-foreground">Coefficient of Variation</p><p className="text-2xl font-bold">{result.cv.toFixed(2)}%</p></div>
                <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4><div className="space-y-2 text-sm font-mono">{result.steps.map((s:string,i:number)=><div key={i}>{s}</div>)}</div></div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Population vs Sample Standard Deviation</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Population standard deviation (σ) is used when you have data for the entire population. Sample standard deviation (s) is used when you have a sample and want to estimate the population standard deviation.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-2">Population</h4><p className="font-mono text-sm">σ² = Σ(x - μ)² / N</p><p className="text-xs text-muted-foreground mt-2">Divide by N (total count)</p></div>
            <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-2">Sample</h4><p className="font-mono text-sm">s² = Σ(x - x̄)² / (n - 1)</p><p className="text-xs text-muted-foreground mt-2">Divide by n-1 (Bessel's correction)</p></div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Related Math Tools</CardTitle></CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/math-tools/mean-median-mode-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Mean Median Mode</p><p className="text-xs text-muted-foreground">Central tendency</p></a>
            <a href="/math-tools/probability-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Probability Calculator</p><p className="text-xs text-muted-foreground">Calculate probability</p></a>
            <a href="/math-tools/average-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors"><p className="font-semibold text-sm">Average Calculator</p><p className="text-xs text-muted-foreground">Simple average</p></a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
