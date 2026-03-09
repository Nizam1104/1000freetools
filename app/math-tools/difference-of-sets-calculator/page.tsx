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

  const loadExample = (a: string, b: string) => {
    setAInput(a);
    setBInput(b);
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateDifference}>Calculate A - B</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={() => loadExample("1, 2, 3, 4, 5, 6", "2, 4, 6, 8")}>Numbers Example</Button>
          <Button variant="outline" onClick={() => loadExample("10, 20, 30, 40, 50", "15, 20, 25, 30")}>Multiples of 10</Button>
          <Button variant="outline" onClick={() => loadExample("apple, banana, cherry, date", "banana, date, fig")}>Fruits Example</Button>
          <Button variant="outline" onClick={() => loadExample("1, 3, 5, 7, 9, 11", "2, 4, 6, 8, 10")}>Odd vs Even</Button>
          <Button variant="outline" onClick={() => loadExample("2, 3, 5, 7, 11, 13, 17", "4, 6, 8, 9, 10, 12, 14")}>Primes vs Composites</Button>
          <Button variant="outline" onClick={() => loadExample("1, 2, 3, 4, 5", "1, 2, 3, 4, 5")}>Identical Sets</Button>
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

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Set A</h4>
                <p className="font-mono text-sm">{"{"}{parseSet(setA).map(formatElement).join(", ")}{"}"}</p>
                <p className="text-xs text-muted-foreground mt-1">{parseSet(setA).length} elements</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Set B</h4>
                <p className="font-mono text-sm">{"{"}{parseSet(setB).map(formatElement).join(", ")}{"}"}</p>
                <p className="text-xs text-muted-foreground mt-1">{parseSet(setB).length} elements</p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
              <p className="text-sm text-muted-foreground">
                The set difference A - B contains all elements that are in <strong>A but not in B</strong>.
                Elements that appear in both sets are excluded from the result.
              </p>
            </div>

            {result.length > 0 && (
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-green-700 dark:text-green-400">Elements Unique to A</h4>
                <p className="text-sm text-muted-foreground">
                  These {result.length} element{result.length !== 1 ? 's' : ''} appear in set A but not in set B.
                </p>
              </div>
            )}

            {result.length === 0 && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <h4 className="font-semibold text-sm mb-2 text-blue-700 dark:text-blue-400">Empty Set</h4>
                <p className="text-sm text-muted-foreground">
                  A - B = ∅ (empty set). Every element in A is also in B, meaning A is a subset of B.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Set Difference</h2>
        <p className="text-muted-foreground">
          Set difference is one of the fundamental operations in set theory. When we write A - B (or A \ B), we're asking: "What's in A that isn't in B?" Think of it like subtraction for sets – you start with everything in A and remove anything that also appears in B.
        </p>
        <p className="text-muted-foreground">
          This operation is useful in many contexts. Database queries use set difference to find records in one table that don't exist in another. Programmers use it to find unique items. Mathematicians use it to prove theorems about set relationships.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Set Difference Formula and Notation</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="text-center mb-4">
            <p className="text-2xl font-mono font-bold">A - B = {"{"}x | x ∈ A and x ∉ B{"}"}</p>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            "A minus B equals the set of all x such that x is in A and x is not in B"
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Notation Variants</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-mono">A - B</span>
                  <span className="text-muted-foreground">Common notation</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">A \ B</span>
                  <span className="text-muted-foreground">Set theory notation</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-mono">A ∩ B'</span>
                  <span className="text-muted-foreground">Intersection with complement</span>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Key Properties</h4>
              <ul className="space-y-2 text-sm">
                <li>• A - A = ∅ (empty set)</li>
                <li>• A - ∅ = A</li>
                <li>• ∅ - A = ∅</li>
                <li>• A - B ≠ B - A (not commutative)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Basic Number Sets</h4>
            <div className="text-sm space-y-2">
              <p>A = {1, 2, 3, 4, 5, 6}</p>
              <p>B = {2, 4, 6, 8}</p>
              <p>A - B = {1, 3, 5}</p>
              <p className="text-muted-foreground">We remove 2, 4, and 6 from A because they appear in B. The result contains only elements unique to A.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Multiples of 10</h4>
            <div className="text-sm space-y-2">
              <p>A = {10, 20, 30, 40, 50}</p>
              <p>B = {15, 20, 25, 30}</p>
              <p>A - B = {10, 40, 50}</p>
              <p className="text-muted-foreground">20 and 30 appear in both sets, so they're removed. 15 and 25 don't affect the result since they're not in A.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Fruit Names (String Elements)</h4>
            <div className="text-sm space-y-2">
              <p>A = {"{apple, banana, cherry, date}"}</p>
              <p>B = {"{banana, date, fig}"}</p>
              <p>A - B = {"{apple, cherry}"}</p>
              <p className="text-muted-foreground">Set difference works with any type of element. Banana and date are removed, leaving apple and cherry.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Odd vs Even Numbers</h4>
            <div className="text-sm space-y-2">
              <p>A = {1, 3, 5, 7, 9, 11} (odd numbers)</p>
              <p>B = {2, 4, 6, 8, 10} (even numbers)</p>
              <p>A - B = {1, 3, 5, 7, 9, 11}</p>
              <p className="text-muted-foreground">Since no odd numbers are in B, A - B equals A entirely. The sets are disjoint (no overlap).</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 5: Identical Sets</h4>
            <div className="text-sm space-y-2">
              <p>A = {1, 2, 3, 4, 5}</p>
              <p>B = {1, 2, 3, 4, 5}</p>
              <p>A - B = ∅ (empty set)</p>
              <p className="text-muted-foreground">When sets are identical, their difference is empty. Every element in A is also in B, so nothing remains.</p>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 6: Primes vs Composites</h4>
            <div className="text-sm space-y-2">
              <p>A = {2, 3, 5, 7, 11, 13, 17} (primes under 20)</p>
              <p>B = {4, 6, 8, 9, 10, 12, 14} (composites under 15)</p>
              <p>A - B = {2, 3, 5, 7, 11, 13, 17}</p>
              <p className="text-muted-foreground">No prime numbers are composite, so A - B = A. These sets have no common elements.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-6 bg-primary/10 rounded-lg border border-primary/20">
          <p className="text-sm">
            <strong>Set theory was created by Georg Cantor in the 1870s</strong> as a way to rigorously study infinity. His work was initially controversial – some mathematicians rejected his ideas about different "sizes" of infinity. Today, set theory forms the foundation of modern mathematics. Nearly all mathematical objects can be defined in terms of sets.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Is A - B the same as B - A?</h4>
            <p className="text-sm text-muted-foreground">
              No, set difference is not commutative. A - B gives elements in A but not B. B - A gives elements in B but not A. These are usually different. For example, if A = {1,2} and B = {2,3}, then A - B = {1} but B - A = {3}.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if the sets have no common elements?</h4>
            <p className="text-sm text-muted-foreground">
              If A and B are disjoint (no overlap), then A - B = A. Nothing gets removed because nothing from B exists in A. The same applies to B - A = B.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can set difference result in an empty set?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. A - B = ∅ when every element of A is also in B (A is a subset of B). Also, ∅ - A = ∅ for any set A, since there's nothing to begin with.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does order matter within a set?</h4>
            <p className="text-sm text-muted-foreground">
              No. Sets are unordered collections. {1, 2, 3} is the same set as {3, 1, 2}. The calculator sorts results for readability, but mathematically the order doesn't matter.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use strings or only numbers?</h4>
            <p className="text-sm text-muted-foreground">
              Sets can contain any type of element – numbers, strings, objects, even other sets. This calculator handles both numbers and text strings. Elements are compared by value.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between set difference and symmetric difference?</h4>
            <p className="text-sm text-muted-foreground">
              Set difference (A - B) gives elements only in A. Symmetric difference (A △ B) gives elements in either A or B but not both. Symmetric difference = (A - B) ∪ (B - A).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/union-of-sets-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Union of Sets Calculator</p>
            <p className="text-xs text-muted-foreground">Combine sets (A ∪ B)</p>
          </a>
          <a href="/math-tools/intersection-of-sets-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Intersection Calculator</p>
            <p className="text-xs text-muted-foreground">Find common elements (A ∩ B)</p>
          </a>
          <a href="/math-tools/venn-diagram-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Venn Diagram Generator</p>
            <p className="text-xs text-muted-foreground">Visualize set relationships</p>
          </a>
        </div>
      </section>
    </div>
  );
}
