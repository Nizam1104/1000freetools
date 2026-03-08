"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DifferenceOfSetsCalculator() {
  const [setA, setAInput] = useState("");
  const [setB, setBInput] = useState("");
  const [result, setResult] = useState<(number | string)[] | null>(null);
  const [error, setError] = useState("");

  const parseSet = (input: string): (number | string)[] => {
    if (!input.trim()) return [];
    return input
      .split(/[,\s]+/)
      .filter(item => item.trim() !== "")
      .map(item => {
        const num = parseFloat(item.trim());
        return isNaN(num) ? item.trim() : num;
      });
  };

  const calculateDifference = () => {
    try {
      const a = parseSet(setA);
      const b = parseSet(setB);

      if (a.length === 0) {
        setError("Please enter at least set A");
        setResult(null);
        return;
      }

      const difference = a.filter(element => {
        return !b.some(bEl => {
          if (typeof element === "number" && typeof bEl === "number") {
            return element === bEl;
          }
          return String(element) === String(bEl);
        });
      });

      difference.sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") return a - b;
        return String(a).localeCompare(String(b));
      });

      setResult(difference);
      setError("");
    } catch (e) {
      setError("Error parsing sets. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setAInput("");
    setBInput("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setAInput("1, 2, 3, 4, 5, 6");
    setBInput("2, 4, 6, 8");
    setResult(null);
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Set Difference Calculator – Find A - B Online</h1>
        <p className="text-muted-foreground">
          Calculate the difference between any two sets with our free online set difference calculator. Find all elements in A that are not in B with clear set notation and step-by-step results.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>Set A (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 1, 2, 3, 4, 5, 6"
              value={setA}
              onChange={(e) => setAInput(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Set B (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 2, 4, 6, 8"
              value={setB}
              onChange={(e) => setBInput(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateDifference}>Calculate A - B</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && result.length >= 0 && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                A - B (Set Difference)
              </p>
              <p className="text-lg font-mono">
                {"{"}{result.map(formatElement).join(", ")}{"}"}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Total elements in difference: {result.length}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
              <p className="text-sm text-muted-foreground">
                The set difference A - B contains all elements that are in <strong>A but not in B</strong>.
                Elements that appear in both sets are excluded from the result.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
