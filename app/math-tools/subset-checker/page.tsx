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

      const isSubset = a.every(elemA =>
        b.some(elemB => areEqual(elemA, elemB))
      );

      const isEqual = a.length === b.length && isSubset;
      const isProperSubset = isSubset && !isEqual;

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

  const loadExample = (a: string, b: string) => {
    setAInput(a);
    setBInput(b);
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
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1, 2, 3", "1, 2, 3, 4, 5")}>{"{1,2,3}"} ⊂ {"{1,2,3,4,5}"}</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("a, b, c", "a, b, c, d, e")}>{"{a,b,c}"} ⊂ {"{a,b,c,d,e}"}</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1, 2, 3", "1, 2, 3")}>Equal sets</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1, 5, 7", "1, 2, 3, 4")}>Not a subset</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("", "1, 2, 3")}>Empty set</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10, 20, 30, 40", "10, 20, 30")}>Superset check</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("x, y", "x, y, z, w")}>Letter sets</Button>
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

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding Subsets</h2>
          <p className="text-muted-foreground">
            A subset is a set whose elements are all contained within another set. If every element of set A is also an element of set B, then A is a subset of B. Think of it like categories: all poodles are dogs, so the set of poodles is a subset of the set of dogs.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Set theory forms the foundation of modern mathematics. Subsets help us understand relationships between groups, classify objects, and build logical arguments. From database queries to programming conditions, subset relationships appear everywhere in computing and logic.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Subset Notation and Definitions</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Subset (⊆)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A ⊆ B means every element of A is also in B. A can equal B.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2}"}, B = {"{1, 2, 3}"} → A ⊆ B ✓
            </code>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Proper Subset (⊂)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A ⊂ B means A is a subset of B, but A ≠ B. A has fewer elements.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2}"}, B = {"{1, 2, 3}"} → A ⊂ B ✓
            </code>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Superset (⊇)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A ⊇ B means B is a subset of A. A contains all elements of B.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 3}"}, B = {"{1, 2}"} → A ⊇ B ✓
            </code>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Equal Sets (=)</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A = B means they contain exactly the same elements.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 3}"}, B = {"{3, 2, 1}"} → A = B ✓
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Basic subset</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Is A = {"{1, 2, 3}"} a subset of B = {"{1, 2, 3, 4, 5}"}?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Check each element of A:
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              1 ∈ B? Yes. 2 ∈ B? Yes. 3 ∈ B? Yes.
            </p>
            <p className="text-sm text-muted-foreground">
              All elements of A are in B, so A ⊆ B. Since B has extra elements, A ⊂ B (proper subset).
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Not a subset</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Is A = {"{1, 5, 7}"} a subset of B = {"{1, 2, 3, 4}"}?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Check each element of A:
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              1 ∈ B? Yes. 5 ∈ B? No! Stop here.
            </p>
            <p className="text-sm text-muted-foreground">
              Since 5 is not in B, A is NOT a subset of B.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Equal sets</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Is A = {"{a, b, c}"} a subset of B = {"{c, b, a}"}?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Order doesn't matter in sets. Both contain exactly a, b, c.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              A ⊆ B? Yes. B ⊆ A? Also yes.
            </p>
            <p className="text-sm text-muted-foreground">
              Therefore A = B. A is a subset but NOT a proper subset.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Empty set</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: Is ∅ (empty set) a subset of B = {"{1, 2, 3}"}?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: The empty set has no elements, so there's nothing to check.
            </p>
            <p className="text-sm text-muted-foreground">
              By definition, the empty set is a subset of every set. ∅ ⊆ B is always true.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Superset relationship</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Problem: A = {"{1, 2, 3, 4, 5}"}, B = {"{2, 4}"}. What's the relationship?
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              Solution: Check if B ⊆ A: 2 ∈ A? Yes. 4 ∈ A? Yes.
            </p>
            <p className="text-sm text-muted-foreground mb-2">
              B is a proper subset of A (B ⊂ A).
            </p>
            <p className="text-sm text-muted-foreground">
              Equivalently, A is a superset of B (A ⊇ B).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-sm">
            Georg Cantor (1845-1918) founded set theory and revolutionized mathematics by treating infinite sets rigorously. His work on subsets led to the shocking discovery that some infinities are larger than others. The set of real numbers is "uncountably infinite" – it has more elements than the set of natural numbers, even though both are infinite. This insight shocked 19th-century mathematicians.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Key Properties of Subsets</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Reflexive Property</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Every set is a subset of itself.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              A ⊆ A (always true)
            </code>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Transitive Property</h4>
            <p className="text-sm text-muted-foreground mb-2">
              If A is a subset of B, and B is a subset of C, then A is a subset of C.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              If A ⊆ B and B ⊆ C, then A ⊆ C
            </code>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Empty Set Property</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The empty set is a subset of every set.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              ∅ ⊆ A (for any set A)
            </code>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Subset and Equality</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Two sets are equal if and only if each is a subset of the other.
            </p>
            <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
              A = B if and only if A ⊆ B and B ⊆ A
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between ⊆ and ⊂?</h4>
            <p className="text-sm text-muted-foreground">
              ⊆ (subset or equal) allows the sets to be identical. ⊂ (proper subset) requires A to be strictly smaller than B. If A = {"{1,2}"} and B = {"{1,2}"}, then A ⊆ B is true, but A ⊂ B is false.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is every set a subset of itself?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Every set A satisfies A ⊆ A. This is the reflexive property. However, no set is a proper subset of itself – A ⊂ A is always false.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is the empty set a subset of every set?</h4>
            <p className="text-sm text-muted-foreground">
              It's vacuously true. To prove ∅ is NOT a subset of A, you'd need to find an element in ∅ that's not in A. But ∅ has no elements, so you can't. Therefore, ∅ ⊆ A is true for any A.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does order matter in sets?</h4>
            <p className="text-sm text-muted-foreground">
              No. {"{1, 2, 3}"} and {"{3, 2, 1}"} are the same set. Sets are defined only by which elements they contain, not the order. This is different from sequences or tuples where order matters.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can a set contain itself as an element?</h4>
            <p className="text-sm text-muted-foreground">
              In standard set theory (ZFC), no – this leads to Russell's Paradox. The set of all sets that don't contain themselves creates a logical contradiction. Modern set theory avoids this by restricting how sets can be formed.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How many subsets does a set have?</h4>
            <p className="text-sm text-muted-foreground">
              A set with n elements has 2ⁿ subsets (the power set). For example, {"{a, b, c}"} has 2³ = 8 subsets: ∅, {"{a}"}, {"{b}"}, {"{c}"}, {"{a,b}"}, {"{a,c}"}, {"{b,c}"}, {"{a,b,c}"}. This includes the empty set and the set itself.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/set-operations-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Set Operations Calculator</p>
            <p className="text-xs text-muted-foreground">Union, intersection</p>
          </a>
          <a href="/math-tools/venn-diagram-generator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Venn Diagram Generator</p>
            <p className="text-xs text-muted-foreground">Visualize sets</p>
          </a>
          <a href="/math-tools/power-set-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Power Set Calculator</p>
            <p className="text-xs text-muted-foreground">All subsets</p>
          </a>
        </div>
      </section>
    </div>
  );
}
