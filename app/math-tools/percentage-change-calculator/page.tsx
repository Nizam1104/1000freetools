"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PercentageChangeCalculator() {
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [result, setResult] = useState<{
    percentageChange: number;
    absoluteChange: number;
    direction: "increase" | "decrease" | "no change";
    explanation: string;
  } | null>(null);
  const [error, setError] = useState("");

  const calculatePercentageChange = (from: number, to: number) => {
    const absoluteChange = to - from;
    const percentageChange = from !== 0 ? ((to - from) / Math.abs(from)) * 100 : 0;
    
    let direction: "increase" | "decrease" | "no change";
    let explanation: string;
    
    if (percentageChange > 0) {
      direction = "increase";
      explanation = `${from} increased by ${percentageChange.toFixed(2)}% to reach ${to}`;
    } else if (percentageChange < 0) {
      direction = "decrease";
      explanation = `${from} decreased by ${Math.abs(percentageChange).toFixed(2)}% to reach ${to}`;
    } else {
      direction = "no change";
      explanation = `${from} stayed the same – no change`;
    }

    return { percentageChange, absoluteChange, direction, explanation };
  };

  const calculate = () => {
    const from = parseFloat(fromValue.trim());
    const to = parseFloat(toValue.trim());

    if (isNaN(from) || isNaN(to)) {
      setError("Please enter valid numbers for both values");
      setResult(null);
      return;
    }

    setError("");
    setResult(calculatePercentageChange(from, to));
  };

  const reset = () => {
    setFromValue("");
    setToValue("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Percentage Change Calculator – Increase & Decrease</h1>
        <p className="text-muted-foreground">
          Calculate percentage increase or decrease between two numbers with our free online percentage change calculator. Perfect for tracking growth, price changes, and performance metrics.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Original Value (From)</Label>
            <Input
              type="text"
              placeholder="e.g., 100"
              value={fromValue}
              onChange={(e) => setFromValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
          <div>
            <Label>New Value (To)</Label>
            <Input
              type="text"
              placeholder="e.g., 150"
              value={toValue}
              onChange={(e) => setToValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && calculate()}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate Change</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className={`p-6 rounded-lg text-center ${
              result.direction === "increase" ? "bg-green-500/10 border border-green-500/30" :
              result.direction === "decrease" ? "bg-red-500/10 border border-red-500/30" :
              "bg-muted"
            }`}>
              <p className={`text-5xl font-bold mb-2 ${
                result.direction === "increase" ? "text-green-600" :
                result.direction === "decrease" ? "text-red-600" :
                ""
              }`}>
                {result.direction === "increase" ? "+" : ""}{result.percentageChange.toFixed(2)}%
              </p>
              <p className="text-sm text-muted-foreground">{result.explanation}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Absolute Change</p>
                <p className="text-2xl font-bold">{result.absoluteChange > 0 ? "+" : ""}{result.absoluteChange}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Original Value</p>
                <p className="text-2xl font-bold">{fromValue}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">New Value</p>
                <p className="text-2xl font-bold">{toValue}</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Visual Representation</p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">From:</span>
                  <div className="flex-1 h-8 bg-background border rounded overflow-hidden">
                    <div 
                      className="h-full bg-muted-foreground/30 transition-all duration-300"
                      style={{ width: `${Math.min(100, (parseFloat(fromValue) / Math.max(parseFloat(fromValue), parseFloat(toValue))) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono w-20 text-right">{fromValue}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-16">To:</span>
                  <div className="flex-1 h-8 bg-background border rounded overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        result.direction === "increase" ? "bg-green-500/50" :
                        result.direction === "decrease" ? "bg-red-500/50" :
                        "bg-muted-foreground/30"
                      }`}
                      style={{ width: `${Math.min(100, (parseFloat(toValue) / Math.max(parseFloat(fromValue), parseFloat(toValue))) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-mono w-20 text-right">{toValue}</span>
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
