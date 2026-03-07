"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CartesianProductCalculator() {
  const [setA, setAInput] = useState("");
  const [setB, setBInput] = useState("");
  const [result, setResult] = useState<[number | string, number | string][] | null>(null);
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

  const calculateCartesianProduct = () => {
    try {
      const a = parseSet(setA);
      const b = parseSet(setB);

      if (a.length === 0 || b.length === 0) {
        setError("Please enter both sets A and B");
        setResult(null);
        return;
      }

      const product: [number | string, number | string][] = [];
      for (const elemA of a) {
        for (const elemB of b) {
          product.push([elemA, elemB]);
        }
      }

      setResult(product);
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
    setAInput("1, 2, 3");
    setBInput("x, y");
    setResult(null);
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Cartesian Product Calculator – Find A × B Online</h1>
        <p className="text-muted-foreground">
          Calculate the Cartesian product of any two sets with our free online calculator. Generate all ordered pairs (a, b) where a ∈ A and b ∈ B with clear notation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>Set A (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 1, 2, 3"
              value={setA}
              onChange={(e) => setAInput(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Set B (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., x, y"
              value={setB}
              onChange={(e) => setBInput(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateCartesianProduct}>Calculate A × B</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && result.length > 0 && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                A × B (Cartesian Product)
              </p>
              <div className="font-mono text-sm space-y-1 max-h-64 overflow-y-auto">
                {"{"}
                {result.map((pair, index) => (
                  <div key={index} className="ml-4">
                    ({formatElement(pair[0])}, {formatElement(pair[1])}){index < result.length - 1 ? "," : ""}
                  </div>
                ))}
                {"}"}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Total ordered pairs: {result.length} (|A| × |B| = {setA.split(/[,\s]+/).filter(s => s.trim()).length} × {setB.split(/[,\s]+/).filter(s => s.trim()).length})
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
              <p className="text-sm text-muted-foreground">
                The Cartesian product A × B contains all possible <strong>ordered pairs</strong> where the first element comes from A and the second from B.
                Order matters: (a, b) ≠ (b, a) unless a = b.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
