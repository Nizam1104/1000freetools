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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What Is Sorting?</h2>
        <p className="text-muted-foreground">
          Sorting means arranging items in a specific order. For numbers, the two most common orders are ascending (smallest to largest) and descending (largest to smallest).
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <h3 className="font-semibold mb-2">Ascending Order</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Numbers go from smallest to largest, like climbing up stairs.
            </p>
            <p className="text-sm font-mono">3, 7, 12, 25, 48, 100</p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Descending Order</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Numbers go from largest to smallest, like going down stairs.
            </p>
            <p className="text-sm font-mono">100, 48, 25, 12, 7, 3</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">How Sorting Works</h2>
        <p className="text-muted-foreground">
          Computers use sorting algorithms to arrange numbers. Here are some common approaches:
        </p>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Bubble Sort</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Compare adjacent pairs and swap if they're in the wrong order. Repeat until no swaps are needed.
            </p>
            <p className="text-xs font-mono">
              [5, 2, 8] → [2, 5, 8] → [2, 5, 8] ✓<br />
              Simple but slow for large lists
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Quick Sort</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Pick a "pivot" number, split the list into smaller and larger than the pivot, then sort each part.
            </p>
            <p className="text-xs font-mono">
              [5, 2, 8, 1] → pivot 5 → [2, 1] + [5] + [8]<br />
              Fast and commonly used in practice
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Merge Sort</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Split the list in half repeatedly, sort each half, then merge them back together.
            </p>
            <p className="text-xs font-mono">
              [5, 2, 8, 1] → [5, 2] + [8, 1] → [2, 5] + [1, 8] → [1, 2, 5, 8]<br />
              Consistent performance, good for large datasets
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Sorting Examples</h2>
        <div className="space-y-3">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Test Scores</h3>
            <p className="text-sm text-muted-foreground mb-2">Original: 78, 92, 85, 71, 88, 95, 82</p>
            <p className="text-sm font-mono">
              Ascending: 71, 78, 82, 85, 88, 92, 95<br />
              Descending: 95, 92, 88, 85, 82, 78, 71
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Prices</h3>
            <p className="text-sm text-muted-foreground mb-2">Original: $49.99, $12.50, $89.00, $25.75, $150.00</p>
            <p className="text-sm font-mono">
              Ascending: $12.50, $25.75, $49.99, $89.00, $150.00<br />
              Descending: $150.00, $89.00, $49.99, $25.75, $12.50
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Negative Numbers</h3>
            <p className="text-sm text-muted-foreground mb-2">Original: -5, 3, -12, 0, 8, -1</p>
            <p className="text-sm font-mono">
              Ascending: -12, -5, -1, 0, 3, 8<br />
              Descending: 8, 3, 0, -1, -5, -12
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Decimals</h3>
            <p className="text-sm text-muted-foreground mb-2">Original: 3.14, 2.71, 1.41, 0.577, 1.732</p>
            <p className="text-sm font-mono">
              Ascending: 0.577, 1.41, 1.732, 2.71, 3.14<br />
              Descending: 3.14, 2.71, 1.732, 1.41, 0.577
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Why Sorting Matters</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Finding Data Faster</h3>
            <p className="text-sm text-muted-foreground">
              Sorted data is easier to search. Binary search can find an item in a sorted list of 1 million elements in just 20 comparisons – compared to potentially 1 million for unsorted data.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Spotting Patterns</h3>
            <p className="text-sm text-muted-foreground">
              Sorting reveals trends and outliers. The smallest and largest values become obvious. Clusters and gaps in data become visible.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Everyday Uses</h3>
            <p className="text-sm text-muted-foreground">
              Phone contacts alphabetically, products by price, songs by duration, emails by date – sorting is everywhere in daily life.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Data Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Sorting is the first step in finding medians, percentiles, and quartiles. Many statistical calculations require sorted data.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">What's the difference between ascending and descending?</h3>
          <p className="text-sm text-muted-foreground">
            Ascending means smallest to largest (1, 2, 3, 4, 5). Descending means largest to smallest (5, 4, 3, 2, 1). Think "A" for "Ascending" and "up" – both start with vowels and go up.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can I sort negative numbers?</h3>
          <p className="text-sm text-muted-foreground">
            Yes. Negative numbers are smaller than positive numbers. In ascending order, -10 comes before -5, which comes before 0, which comes before 5.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What separators can I use?</h3>
          <p className="text-sm text-muted-foreground">
            You can use spaces, commas, or a mix of both. For example, "1 2 3" or "1, 2, 3" or "1, 2 3" all work the same way.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Does this handle decimals?</h3>
          <p className="text-sm text-muted-foreground">
            Yes. Decimal numbers sort correctly: 1.5 comes between 1 and 2. The sorter handles any valid decimal number.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the maximum number of values?</h3>
          <p className="text-sm text-muted-foreground">
            There's no strict limit, but very large lists might slow down your browser. For typical use (up to a few thousand numbers), sorting is nearly instant.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/mean-median-mode-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Mean Median Mode Calculator</p>
            <p className="text-xs text-muted-foreground">Find statistical measures</p>
          </a>
          <a href="/math-tools/five-number-summary-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Five Number Summary</p>
            <p className="text-xs text-muted-foreground">Min, Q1, Median, Q3, Max</p>
          </a>
          <a href="/math-tools/average-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Average Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate mean average</p>
          </a>
        </div>
      </section>
    </div>
  );
}
