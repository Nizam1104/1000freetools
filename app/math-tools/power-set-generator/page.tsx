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
        <h2 className="text-2xl font-semibold">What is a Power Set?</h2>
        <p className="text-muted-foreground">
          The power set of a set S, denoted P(S) or 2^S, is the set of all subsets of S, including the empty set and S itself. For a set with n elements, the power set contains 2ⁿ subsets.
        </p>
        <p className="text-muted-foreground">
          The term "power set" comes from the fact that the number of subsets equals 2 raised to the power of the number of elements in the original set.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Power Set Notation</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            P(S) = {"{A | A ⊆ S}"}
          </code>
          <p className="text-sm text-muted-foreground mt-2">
            Read as: "The power set of S equals the set of all A such that A is a subset of S"
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Alternative notations: 2^S, ℘(S)
          </p>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Power Set Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Set with 1 Element</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              S = {"{a}"}<br />
              P(S) = {"{∅, {a}}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              2¹ = 2 subsets
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Set with 2 Elements</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              S = {"{1, 2}"}<br />
              P(S) = {"{∅, {1}, {2}, {1, 2}}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              2² = 4 subsets
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Set with 3 Elements</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              S = {"{1, 2, 3}"}<br />
              P(S) = {"{∅, {1}, {2}, {3}, {1,2}, {1,3}, {2,3}, {1,2,3}}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              2³ = 8 subsets
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Empty Set</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              S = {"∅"}<br />
              P(S) = {"{∅}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              2⁰ = 1 subset (the empty set itself)
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Power Sets</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Cardinality</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• |P(S)| = 2^|S|</li>
              <li>• If |S| = n, then |P(S)| = 2ⁿ</li>
              <li>• Empty set has 1 subset: P(∅) = {"{∅}"}</li>
              <li>• Power set is always larger than original set</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Subset Count by Size</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• C(n,0) = 1 empty subset</li>
              <li>• C(n,1) = n subsets of size 1</li>
              <li>• C(n,k) subsets of size k</li>
              <li>• Sum of C(n,k) for k=0 to n = 2ⁿ</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Binomial Coefficients</h2>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            The number of subsets of size k from a set of n elements is given by the binomial coefficient C(n,k) or "n choose k":
          </p>
          <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
            C(n,k) = n! / (k! × (n-k)!)
          </code>
          <p className="text-xs text-muted-foreground mt-2">
            Example: For n=3, the counts are C(3,0)=1, C(3,1)=3, C(3,2)=3, C(3,3)=1, totaling 8 = 2³
          </p>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Applications of Power Sets</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Combinatorics</h3>
            <p className="text-sm text-muted-foreground">
              Counting all possible combinations or selections from a set of items.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Computer Science</h3>
            <p className="text-sm text-muted-foreground">
              Bitmask representations, where each bit represents membership in a subset.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Logic</h3>
            <p className="text-sm text-muted-foreground">
              Truth tables for n variables have 2ⁿ rows, corresponding to the power set.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Probability</h3>
            <p className="text-sm text-muted-foreground">
              Sample spaces and event spaces are built using power set concepts.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why is it called a power set?</h3>
            <p className="text-sm text-muted-foreground">
              Because the number of subsets equals 2 raised to the power of the number of elements: 2ⁿ.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Does the power set include the empty set?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! The empty set is a subset of every set, so it's always included in the power set.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can a power set be infinite?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! If the original set is infinite, its power set is also infinite (and actually "more infinite" - it has a higher cardinality).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the power set of the power set?</h3>
            <p className="text-sm text-muted-foreground">
              P(P(S)) has 2^(2ⁿ) elements. For example, if S has 2 elements, P(S) has 4, and P(P(S)) has 16!
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/subset-checker" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Subset Checker</p>
            <p className="text-xs text-muted-foreground">Test A ⊆ B</p>
          </a>
          <a href="/math-tools/combination-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Combinations</p>
            <p className="text-xs text-muted-foreground">nCr calculator</p>
          </a>
          <a href="/math-tools/factorial-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Factorial</p>
            <p className="text-xs text-muted-foreground">n! calculator</p>
          </a>
        </div>
      </section>
    </div>
  );
}
