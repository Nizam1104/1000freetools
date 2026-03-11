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

  const examples = [
    { name: "Random Order", input: "5, 2, 8, 1, 9, 3, 7, 4, 6" },
    { name: "Already Sorted", input: "1, 2, 3, 4, 5, 6, 7" },
    { name: "Reverse Sorted", input: "10, 9, 8, 7, 6, 5, 4" },
    { name: "With Negatives", input: "-5, 3, -1, 0, 7, -10, 2" },
    { name: "Decimals", input: "3.14, 2.71, 1.41, 3.0, 2.5" },
    { name: "Duplicates", input: "5, 2, 5, 1, 2, 5, 3, 1" },
    { name: "Large Numbers", input: "1000, 50, 500, 25, 750, 100" }
  ];

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

  const loadExample = (index: number) => {
    setInput(examples[index].input);
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

          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">Examples:</span>
            {examples.map((ex, idx) => (
              <Button key={idx} variant="outline" size="sm" onClick={() => loadExample(idx)}>{ex.name}</Button>
            ))}
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Number Sorting</h2>
        <p className="text-muted-foreground">
          Sorting arranges numbers in a specific order – either ascending (smallest to largest) or descending (largest to smallest). It's one of the most fundamental operations in computing and mathematics, essential for organizing data, finding extremes, and preparing for other operations like searching.
        </p>
        <p className="text-muted-foreground">
          Sorting seems simple but has deep mathematical implications. Different sorting algorithms have different efficiencies, and the choice of algorithm matters greatly for large datasets. This tool handles the sorting instantly regardless of the method.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Sort Orders Explained</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Ascending Order</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Numbers arranged from smallest to largest. Also called "increasing order."
            </p>
            <code className="text-xs font-mono block">Example: 1, 3, 5, 7, 9</code>
            <p className="text-xs text-muted-foreground mt-2">Used for: rankings, dates (oldest first), prices (low to high)</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Descending Order</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Numbers arranged from largest to smallest. Also called "decreasing order."
            </p>
            <code className="text-xs font-mono block">Example: 9, 7, 5, 3, 1</code>
            <p className="text-xs text-muted-foreground mt-2">Used for: rankings (1st place first), dates (newest first), prices (high to low)</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Sorting with Special Cases</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Negative Numbers</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Negative numbers are always less than positive numbers. Among negatives, larger absolute value means smaller number.
            </p>
            <div className="font-mono text-sm space-y-2">
              <div>Unsorted: -5, 3, -1, 0, 7, -10, 2</div>
              <div>Ascending: -10, -5, -1, 0, 2, 3, 7</div>
              <div>Descending: 7, 3, 2, 0, -1, -5, -10</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Decimal Numbers</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Compare digit by digit from left to right. More digits before the decimal point means larger. Same whole part? Compare decimal places.
            </p>
            <div className="font-mono text-sm space-y-2">
              <div>Unsorted: 3.14, 2.71, 1.41, 3.0, 2.5</div>
              <div>Ascending: 1.41, 2.5, 2.71, 3.0, 3.14</div>
              <div className="text-muted-foreground">Note: 3.0 = 3, but 3.14 {'>'} 3.0</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Duplicate Values</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Duplicates stay in the sorted output. They appear next to each other in the sorted list.
            </p>
            <div className="font-mono text-sm space-y-2">
              <div>Unsorted: 5, 2, 5, 1, 2, 5, 3, 1</div>
              <div>Ascending: 1, 1, 2, 2, 3, 5, 5, 5</div>
              <div>Descending: 5, 5, 5, 3, 2, 2, 1, 1</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm">
            Sorting is so important in computer science that entire courses are devoted to sorting algorithms. The fastest general-purpose comparison sorts run in O(n log n) time. For integers, radix sort can achieve O(n) linear time. The study of sorting led to fundamental insights about algorithm efficiency and computational complexity.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I sort numbers manually?</h4>
            <p className="text-sm text-muted-foreground">
              For small lists, find the smallest number, write it down, cross it out, and repeat. For larger lists, use methods like bubble sort (swap adjacent out-of-order pairs) or insertion sort (build sorted portion one element at a time).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the fastest way to sort?</h4>
            <p className="text-sm text-muted-foreground">
              For computers, merge sort and quicksort are typically fastest for general data. For humans with small lists, just scan for the minimum repeatedly. For very large datasets, specialized algorithms and parallel processing help.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I sort text and numbers together?</h4>
            <p className="text-sm text-muted-foreground">
              This tool sorts numbers only. When sorting mixed data, numbers typically come before letters in ASCII order. For proper alphanumeric sorting, you'd need to specify how to handle the mixed types.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What about sorting fractions?</h4>
            <p className="text-sm text-muted-foreground">
              Convert fractions to decimals first, then sort. For example: 1/2 = 0.5, 3/4 = 0.75, 1/3 ≈ 0.333. Sorted: 1/3, 1/2, 3/4. Or find a common denominator and compare numerators.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is sorting important?</h4>
            <p className="text-sm text-muted-foreground">
              Sorted data enables binary search (much faster than linear search), makes duplicates easy to find, helps identify outliers, and is required for many statistical calculations. Most databases keep data sorted for efficiency.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is a stable sort?</h4>
            <p className="text-sm text-muted-foreground">
              A stable sort preserves the original order of equal elements. If you sort by last name, then by first name, a stable sort keeps people with the same first name in last-name order. This matters for multi-level sorting.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
