"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PowerSetGenerator() {
  const [inputSet, setInputSet] = useState("");
  const [result, setResult] = useState<(number | string)[][] | null>(null);
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

  const generatePowerSet = (set: (number | string)[]): (number | string)[][] => {
    const powerSet: (number | string)[][] = [[]];
    
    for (const element of set) {
      const newSubsets = powerSet.map(subset => [...subset, element]);
      powerSet.push(...newSubsets);
    }
    
    return powerSet;
  };

  const calculatePowerSet = () => {
    try {
      const set = parseSet(inputSet);

      if (set.length === 0) {
        setError("Please enter a set");
        setResult(null);
        return;
      }

      if (set.length > 20) {
        setError("For performance, please limit to 20 elements or fewer");
        setResult(null);
        return;
      }

      const powerSet = generatePowerSet(set);
      
      // Sort subsets by size, then lexicographically
      powerSet.sort((a, b) => {
        if (a.length !== b.length) return a.length - b.length;
        const aStr = a.map(String).sort().join(",");
        const bStr = b.map(String).sort().join(",");
        return aStr.localeCompare(bStr);
      });

      setResult(powerSet);
      setError("");
    } catch (e) {
      setError("Error generating power set. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setInputSet("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setInputSet("1, 2, 3");
    setResult(null);
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  const formatSubset = (subset: (number | string)[]): string => {
    if (subset.length === 0) return "∅";
    return "{" + subset.map(formatElement).join(", ") + "}";
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Power Set Generator – Find All Subsets Online</h1>
        <p className="text-muted-foreground">
          Generate the complete power set of any set with our free online power set generator. Find all 2ⁿ subsets including the empty set and the set itself.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Set (comma or space separated)</Label>
          <Textarea
            placeholder="e.g., 1, 2, 3"
            value={inputSet}
            onChange={(e) => setInputSet(e.target.value)}
            rows={2}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculatePowerSet}>Generate Power Set</Button>
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
                P(S) - Power Set ({result.length} subsets)
              </p>
              <div className="font-mono text-xs space-y-1 max-h-96 overflow-y-auto bg-background p-4 rounded">
                {"{"}
                {result.map((subset, index) => (
                  <div key={index} className="ml-4">
                    {formatSubset(subset)}{index < result.length - 1 ? "," : ""}
                  </div>
                ))}
                {"}"}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Total subsets: {result.length} = 2^{inputSet.split(/[,\s]+/).filter(s => s.trim()).length}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">By Subset Size</h4>
                <div className="space-y-2 text-sm">
                  {Array.from({ length: (inputSet.split(/[,\s]+/).filter(s => s.trim()).length) + 1 }, (_, i) => i).map(size => {
                    const count = result.filter(s => s.length === size).length;
                    return (
                      <div key={size} className="flex justify-between">
                        <span>Size {size}:</span>
                        <span className="font-mono">{count} subset{count !== 1 ? "s" : ""}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
                <p className="text-sm text-muted-foreground">
                  The power set contains <strong>all possible subsets</strong> of the original set, including the empty set and the set itself.
                </p>
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
