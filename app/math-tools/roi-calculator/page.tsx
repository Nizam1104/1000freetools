"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ROICalculator() {
  const [cost, setCost] = useState("");
  const [returnAmount, setReturnAmount] = useState("");
  const [result, setResult] = useState<{
    roi: number;
    netProfit: number;
    isProfit: boolean;
  } | null>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    const costBasis = parseFloat(cost);
    const returnValue = parseFloat(returnAmount);

    if (isNaN(costBasis) || isNaN(returnValue)) {
      setError("Please enter valid numbers for both fields");
      setResult(null);
      return;
    }

    if (costBasis <= 0) {
      setError("Cost must be greater than 0");
      setResult(null);
      return;
    }

    const netProfit = returnValue - costBasis;
    const roi = (netProfit / costBasis) * 100;

    setResult({
      roi: Math.round(roi * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
      isProfit: netProfit >= 0,
    });
    setError("");
  };

  const reset = () => {
    setCost("");
    setReturnAmount("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setCost("10000");
    setReturnAmount("12500");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">ROI Calculator – Calculate Return on Investment Online</h1>
        <p className="text-muted-foreground">
          Calculate your Return on Investment (ROI) quickly with our free online ROI calculator. Enter cost and return values to get the ROI percentage and net profit instantly.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Cost of Investment</Label>
            <Input
              type="number"
              placeholder="e.g., 10000"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
            />
          </div>
          <div>
            <Label>Return from Investment</Label>
            <Input
              type="number"
              placeholder="e.g., 12500"
              value={returnAmount}
              onChange={(e) => setReturnAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate ROI</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className={`p-6 rounded-lg text-center ${result.isProfit ? 'bg-primary text-primary-foreground' : 'bg-destructive text-destructive-foreground'}`}>
                <p className="text-sm opacity-80 mb-2">ROI</p>
                <p className="text-4xl font-bold">{result.roi > 0 ? "+" : ""}{result.roi}%</p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Net Profit/Loss</p>
                <p className={`text-3xl font-bold ${result.isProfit ? 'text-green-600' : 'text-destructive'}`}>
                  {result.netProfit > 0 ? "+" : ""}${Math.abs(result.netProfit).toLocaleString()}
                </p>
              </div>
              <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Return Multiple</p>
                <p className="text-3xl font-bold">{(parseFloat(returnAmount) / parseFloat(cost)).toFixed(2)}x</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Formula & Calculation</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                ROI = ((Return - Cost) / Cost) × 100<br />
                ROI = ((${returnAmount} - ${cost}) / ${cost}) × 100<br />
                ROI = (${result.netProfit} / ${cost}) × 100 = {result.roi}%
              </code>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Investment Summary</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Initial Investment:</span>
                  <span className="font-semibold ml-2">${parseFloat(cost).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Final Value:</span>
                  <span className="font-semibold ml-2">${parseFloat(returnAmount).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Gain/Loss:</span>
                  <span className={`font-semibold ml-2 ${result.isProfit ? 'text-green-600' : 'text-destructive'}`}>
                    {result.netProfit > 0 ? "+" : ""}${result.netProfit.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Performance:</span>
                  <span className={`font-semibold ml-2 ${result.isProfit ? 'text-green-600' : 'text-destructive'}`}>
                    {result.isProfit ? 'Profit' : 'Loss'} of {Math.abs(result.roi)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
