"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SubsetChecker() {
  const [setA, setAInput] = useState("");
  const [setB, setBInput] = useState("");
  const [result, setResult] = useState<{
    isSubset: boolean;
    isProperSubset: boolean;
    isSuperset: boolean;
    isEqual: boolean;
  } | null>(null);
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

  const areEqual = (a: number | string, b: number | string): boolean => {
    if (typeof a === "number" && typeof b === "number") {
      return a === b;
    }
    return String(a) === String(b);
  };

  const checkSubset = () => {
    try {
      const a = parseSet(setA);
      const b = parseSet(setB);

      if (a.length === 0 && b.length === 0) {
        setError("Please enter at least one set");
        setResult(null);
        return;
      }

      // Check if A is subset of B (all elements of A are in B)
      const isSubset = a.every(elemA => 
        b.some(elemB => areEqual(elemA, elemB))
      );

      // Check if A is proper subset of B (subset but not equal)
      const isEqual = a.length === b.length && isSubset;
      const isProperSubset = isSubset && !isEqual;

      // Check if A is superset of B (all elements of B are in A)
      const isSuperset = b.every(elemB => 
        a.some(elemA => areEqual(elemA, elemB))
      );

      setResult({
        isSubset,
        isProperSubset,
        isSuperset,
        isEqual,
      });
      setError("");
    } catch (e) {
      setError("Error checking subsets. Please check your input.");
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
    setBInput("1, 2, 3, 4, 5");
    setResult(null);
  };

  const formatSet = (elements: (number | string)[]): string => {
    if (elements.length === 0) return "∅";
    return "{" + elements.map(el => typeof el === "number" ? el.toString() : `"${el}"`).join(", ") + "}";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Subset Checker – Is A a Subset of B?</h1>
        <p className="text-muted-foreground">
          Check if one set is a subset, proper subset, or equal to another with our free online subset checker. Instantly verify subset relationships with clear explanations.
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
              placeholder="e.g., 1, 2, 3, 4, 5"
              value={setB}
              onChange={(e) => setBInput(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={checkSubset}>Check Subset</Button>
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
              <div className="space-y-3">
                <div className={`p-4 rounded-lg ${result.isSubset ? 'bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-red-500/20 text-red-700 dark:text-red-400'}`}>
                  <p className="font-semibold text-lg">
                    {result.isSubset ? "✓ A is a subset of B" : "✗ A is NOT a subset of B"}
                  </p>
                  <p className="text-sm opacity-80">A ⊆ B</p>
                </div>

                {result.isSubset && (
                  <div className={`p-4 rounded-lg ${result.isProperSubset ? 'bg-blue-500/20 text-blue-700 dark:text-blue-400' : 'bg-gray-500/20 text-gray-700 dark:text-gray-400'}`}>
                    <p className="font-semibold">
                      {result.isProperSubset ? "✓ A is a PROPER subset of B" : "○ A is NOT a proper subset (A = B)"}
                    </p>
                    <p className="text-sm opacity-80">A ⊂ B</p>
                  </div>
                )}

                <div className={`p-4 rounded-lg ${result.isSuperset ? 'bg-purple-500/20 text-purple-700 dark:text-purple-400' : 'bg-gray-500/20 text-gray-700 dark:text-gray-400'}`}>
                  <p className="font-semibold">
                    {result.isSuperset ? "✓ A is a superset of B" : "○ A is NOT a superset of B"}
                  </p>
                  <p className="text-sm opacity-80">A ⊇ B</p>
                </div>

                <div className={`p-4 rounded-lg ${result.isEqual ? 'bg-green-500/20 text-green-700 dark:text-green-400' : 'bg-gray-500/20 text-gray-700 dark:text-gray-400'}`}>
                  <p className="font-semibold">
                    {result.isEqual ? "✓ A equals B" : "○ A does NOT equal B"}
                  </p>
                  <p className="text-sm opacity-80">A = B</p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Explanation</h4>
              <p className="text-sm text-muted-foreground">
                {result.isSubset 
                  ? `Every element in A is also in B. ${result.isProperSubset ? 'Since A has fewer elements than B, it is a proper subset.' : 'Since A and B have the same elements, they are equal.'}`
                  : 'At least one element in A is not found in B, so A is not a subset of B.'
                }
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
