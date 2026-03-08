"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NumberSorter() {
  const [input, setInput] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [result, setResult] = useState<{
    original: number[];
    sorted: number[];
    count: number;
    min: number;
    max: number;
  } | null>(null);
  const [error, setError] = useState("");

  const sortNumbers = (input: string, order: "asc" | "desc") => {
    const numbers = input
      .split(/[\s,]+/)
      .filter((s) => s.trim() !== "")
      .map((s) => parseFloat(s.trim()))
      .filter((n) => !isNaN(n));

    const sorted = [...numbers].sort((a, b) => (order === "asc" ? a - b : b - a));

    return {
      original: numbers,
      sorted,
      count: numbers.length,
      min: Math.min(...numbers),
      max: Math.max(...numbers),
    };
  };

  const calculate = () => {
    if (!input.trim()) {
      setError("Please enter some numbers");
      setResult(null);
      return;
    }

    const numbers = input.split(/[\s,]+/).filter((s) => s.trim() !== "");
    const invalidNumbers = numbers.filter((s) => isNaN(parseFloat(s.trim())));

    if (invalidNumbers.length > 0) {
      setError(`Invalid numbers: ${invalidNumbers.join(", ")}`);
      setResult(null);
      return;
    }

    setError("");
    setResult(sortNumbers(input, order));
  };

  const reset = () => {
    setInput("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Number Sorter – Sort Numbers Ascending or Descending</h1>
        <p className="text-muted-foreground">
          Sort any list of numbers instantly with our free online number sorter. Arrange numbers from smallest to largest or largest to smallest with a single click.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Enter numbers (separated by spaces or commas)</Label>
          <Input
            type="text"
            placeholder="e.g., 5, 2, 8, 1, 9 or 5 2 8 1 9"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="flex gap-4 items-center">
          <div className="flex-1">
            <Label>Sort Order</Label>
            <Select value={order} onValueChange={(v) => setOrder(v as "asc" | "desc")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending (Smallest to Largest)</SelectItem>
                <SelectItem value="desc">Descending (Largest to Smallest)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button onClick={calculate} className="h-10">Sort Numbers</Button>
            <Button variant="outline" onClick={reset} className="h-10">Reset</Button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">Sorted Result ({order === "asc" ? "Ascending" : "Descending"})</p>
              <p className="text-2xl font-mono font-bold break-all">
                {result.sorted.join(", ")}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Count</p>
                <p className="text-2xl font-bold">{result.count}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Minimum</p>
                <p className="text-2xl font-bold">{result.min}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Maximum</p>
                <p className="text-2xl font-bold">{result.max}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Range</p>
                <p className="text-2xl font-bold">{result.max - result.min}</p>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-semibold mb-3">Visual Comparison</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-16">Original:</span>
                  <div className="flex-1 flex gap-1 flex-wrap">
                    {result.original.map((n, i) => (
                      <span key={i} className="px-2 py-1 bg-background border rounded text-sm font-mono">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground w-16">Sorted:</span>
                  <div className="flex-1 flex gap-1 flex-wrap">
                    {result.sorted.map((n, i) => (
                      <span key={i} className="px-2 py-1 bg-primary text-primary-foreground rounded text-sm font-mono">
                        {n}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
