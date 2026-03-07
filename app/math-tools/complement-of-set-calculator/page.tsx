"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ComplementOfSetCalculator() {
  const [universalSet, setUniversalSet] = useState("");
  const [subsetA, setSubsetA] = useState("");
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

  const calculateComplement = () => {
    try {
      const U = parseSet(universalSet);
      const A = parseSet(subsetA);

      if (U.length === 0) {
        setError("Please enter the universal set");
        setResult(null);
        return;
      }

      const complement = U.filter(element => {
        return !A.some(a => {
          if (typeof element === "number" && typeof a === "number") {
            return element === a;
          }
          return String(element) === String(a);
        });
      });

      complement.sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") return a - b;
        return String(a).localeCompare(String(b));
      });

      setResult(complement);
      setError("");
    } catch (e) {
      setError("Error parsing sets. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setUniversalSet("");
    setSubsetA("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setUniversalSet("1, 2, 3, 4, 5, 6, 7, 8, 9, 10");
    setSubsetA("2, 4, 6, 8, 10");
    setResult(null);
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Complement of a Set Calculator – Find A′ Online</h1>
        <p className="text-muted-foreground">
          Calculate the complement of any set with our free online complement calculator. Given a universal set U and subset A, find all elements in U that are not in A with clear set notation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>Universal Set U (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
              value={universalSet}
              onChange={(e) => setUniversalSet(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Subset A (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 2, 4, 6, 8, 10"
              value={subsetA}
              onChange={(e) => setSubsetA(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateComplement}>Calculate Complement</Button>
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
                A′ (Complement of A)
              </p>
              <p className="text-lg font-mono">
                {"{"}{result.map(formatElement).join(", ")}{"}"}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Total elements in complement: {result.length}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
              <p className="text-sm text-muted-foreground">
                The complement A′ contains all elements that are in the universal set U but <strong>not</strong> in set A.
                Together, A and A′ make up the entire universal set.
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
