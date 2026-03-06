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
        <h2 className="text-2xl font-semibold">What is a Subset?</h2>
        <p className="text-muted-foreground">
          A set A is a subset of set B if every element of A is also an element of B. This is denoted as A ⊆ B. If A is a subset of B but A ≠ B, then A is called a proper subset of B, denoted A ⊂ B.
        </p>
        <p className="text-muted-foreground">
          The subset relationship is fundamental in set theory and forms the basis for understanding set hierarchies and classifications.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Subset Notation</h2>
        <div className="p-4 border rounded-lg space-y-4">
          <div>
            <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
              A ⊆ B means "A is a subset of B"
            </code>
            <p className="text-sm text-muted-foreground mt-2">
              Every element of A is also in B (A can equal B)
            </p>
          </div>
          <div>
            <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
              A ⊂ B means "A is a proper subset of B"
            </code>
            <p className="text-sm text-muted-foreground mt-2">
              Every element of A is in B, but A ≠ B (A is strictly smaller)
            </p>
          </div>
          <div>
            <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
              A ⊇ B means "A is a superset of B"
            </code>
            <p className="text-sm text-muted-foreground mt-2">
              B is a subset of A
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Subset Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Proper Subset</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 3}"}<br />
              B = {"{1, 2, 3, 4, 5}"}<br />
              A ⊆ B: ✓ Yes<br />
              A ⊂ B: ✓ Yes (proper subset)
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Equal Sets</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{a, b, c}"}<br />
              B = {"{a, b, c}"}<br />
              A ⊆ B: ✓ Yes<br />
              A ⊂ B: ✗ No (they are equal)
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Not a Subset</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 6}"}<br />
              B = {"{1, 2, 3, 4, 5}"}<br />
              A ⊆ B: ✗ No (6 is not in B)
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Empty Set</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"∅"}<br />
              B = {"{1, 2, 3}"}<br />
              A ⊆ B: ✓ Yes (empty set is subset of every set)
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Subsets</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• ∅ ⊆ A (empty set is subset of every set)</li>
              <li>• A ⊆ A (every set is a subset of itself)</li>
              <li>• If A ⊆ B and B ⊆ C, then A ⊆ C (transitive)</li>
              <li>• If A ⊆ B and B ⊆ A, then A = B (antisymmetric)</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Counting Subsets</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• A set with n elements has 2ⁿ subsets</li>
              <li>• A set with n elements has 2ⁿ - 1 proper subsets</li>
              <li>• The empty set has exactly 1 subset (itself)</li>
              <li>• C(n,k) subsets of size k</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Venn Diagram Visualization</h2>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            When A is a subset of B, circle A is drawn completely inside circle B.
          </p>
          <div className="flex justify-center">
            <div className="relative w-48 h-36 border-2 border-muted-foreground rounded-lg p-4">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-primary bg-primary/10"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full border-2 border-primary bg-primary/30"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold">A</div>
              <div className="absolute right-4 bottom-4 text-xs font-semibold">B</div>
              <div className="absolute left-2 top-2 text-xs text-muted-foreground">A ⊆ B</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Applications of Subsets</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Database Queries</h3>
            <p className="text-sm text-muted-foreground">
              SQL uses subset logic for filtering records that match certain criteria.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Classification</h3>
            <p className="text-sm text-muted-foreground">
              Taxonomy and categorization rely on subset relationships (species ⊆ genus ⊆ family).
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Programming</h3>
            <p className="text-sm text-muted-foreground">
              Type systems use subset relationships (a subclass is a subset of its parent class).
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Logic</h3>
            <p className="text-sm text-muted-foreground">
              Implication in logic corresponds to subset relationships in set theory.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is the empty set a subset of every set?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! The empty set has no elements, so trivially all of its elements (none) are in any other set.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between ⊆ and ⊂?</h3>
            <p className="text-sm text-muted-foreground">
              ⊆ allows equality (A can equal B), while ⊂ requires A to be strictly smaller than B (proper subset).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can a set be a subset of itself?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! Every set is a subset of itself (A ⊆ A). But it's not a proper subset of itself.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How many subsets does a set have?</h3>
            <p className="text-sm text-muted-foreground">
              A set with n elements has 2ⁿ total subsets. For example, a set with 3 elements has 8 subsets.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/power-set-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Power Set Generator</p>
            <p className="text-xs text-muted-foreground">All subsets</p>
          </a>
          <a href="/math-tools/union-of-sets-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Union of Sets</p>
            <p className="text-xs text-muted-foreground">Find A ∪ B</p>
          </a>
          <a href="/math-tools/intersection-of-sets-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Intersection of Sets</p>
            <p className="text-xs text-muted-foreground">Find A ∩ B</p>
          </a>
        </div>
      </section>
    </div>
  );
}
