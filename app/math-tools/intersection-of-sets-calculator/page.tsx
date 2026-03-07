"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function IntersectionOfSetsCalculator() {
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

  const calculateIntersection = () => {
    try {
      const a = parseSet(setA);
      const b = parseSet(setB);
      const c = parseSet(setC);

      if (a.length === 0 || b.length === 0) {
        setError("Please enter elements in at least Set A and Set B");
        setResult(null);
        return;
      }

      let intersection = a.filter(item => b.includes(item));
      
      if (c.length > 0) {
        intersection = intersection.filter(item => c.includes(item));
      }

      intersection = [...new Set(intersection)];
      intersection.sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") return a - b;
        return String(a).localeCompare(String(b));
      });

      setResult(intersection);
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
    setAInput("1, 2, 3, 4, 5");
    setBInput("3, 4, 5, 6, 7");
    setCInput("");
    setResult(null);
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Intersection of Sets Calculator – Find A ∩ B Online</h1>
        <p className="text-muted-foreground">
          Find the intersection of any two or more sets with our free online intersection calculator. Identifies all common elements shared between sets with clear notation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>Set A (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 1, 2, 3, 4, 5"
              value={setA}
              onChange={(e) => setAInput(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Set B (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 3, 4, 5, 6, 7"
              value={setB}
              onChange={(e) => setBInput(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Set C (optional)</Label>
            <Textarea
              placeholder="e.g., 4, 5, 8, 9"
              value={setC}
              onChange={(e) => setCInput(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateIntersection}>Calculate Intersection</Button>
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
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                {setC.trim() ? "A ∩ B ∩ C" : "A ∩ B"}
              </p>
              {result.length > 0 ? (
                <p className="text-lg font-mono">
                  {"{"}{result.map(formatElement).join(", ")}{"}"}
                </p>
              ) : (
                <p className="text-lg font-mono">∅ (empty set)</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                {result.length > 0 
                  ? `Common elements: ${result.length}`
                  : "No common elements (disjoint sets)"}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
              <p className="text-sm text-muted-foreground">
                The intersection contains only elements that appear in <strong>all</strong> of the input sets. 
                If there are no common elements, the intersection is the empty set (∅).
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
