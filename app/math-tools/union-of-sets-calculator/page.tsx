"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function UnionOfSetsCalculator() {
  const [setA, setAInput] = useState("");
  const [setB, setBInput] = useState("");
  const [setC, setCInput] = useState("");
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

  const calculateUnion = () => {
    try {
      const a = parseSet(setA);
      const b = parseSet(setB);
      const c = parseSet(setC);

      if (a.length === 0 && b.length === 0 && c.length === 0) {
        setError("Please enter at least one element in any set");
        setResult(null);
        return;
      }

      const union = [...new Set([...a, ...b, ...c])];
      union.sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") return a - b;
        return String(a).localeCompare(String(b));
      });

      setResult(union);
      setError("");
    } catch (e) {
      setError("Error parsing sets. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setAInput("");
    setBInput("");
    setCInput("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setAInput("1, 2, 3, 4");
    setBInput("3, 4, 5, 6");
    setCInput("");
    setResult(null);
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Union of Sets Calculator – Find A ∪ B Online</h1>
        <p className="text-muted-foreground">
          Calculate the union of any two or more sets with our free online union calculator. Returns all unique elements combined from each set with clear set notation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>Set A (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 1, 2, 3, 4 or apple, banana, cherry"
              value={setA}
              onChange={(e) => setAInput(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Set B (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 3, 4, 5, 6"
              value={setB}
              onChange={(e) => setBInput(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Set C (optional)</Label>
            <Textarea
              placeholder="e.g., 5, 6, 7, 8"
              value={setC}
              onChange={(e) => setCInput(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateUnion}>Calculate Union</Button>
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
                {setC.trim() ? "A ∪ B ∪ C" : "A ∪ B"}
              </p>
              <p className="text-lg font-mono">
                {"{"}{result.map(formatElement).join(", ")}{"}"}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Total elements: {result.length}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
              <p className="text-sm text-muted-foreground">
                The union contains all unique elements that appear in <strong>any</strong> of the input sets. 
                Duplicate elements appear only once in the result.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
      </section>
    </div>
  );
}
