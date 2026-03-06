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

  const loadExample = () => {
    setAInput("1, 2, 3, 4, 5, 6");
    setBInput("2, 4, 6, 8");
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

        <div className="flex gap-2">
          <Button onClick={calculateDifference}>Calculate A - B</Button>
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
                A - B (Set Difference)
              </p>
              <p className="text-lg font-mono">
                {"{"}{result.map(formatElement).join(", ")}{"}"}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Total elements in difference: {result.length}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
              <p className="text-sm text-muted-foreground">
                The set difference A - B contains all elements that are in <strong>A but not in B</strong>.
                Elements that appear in both sets are excluded from the result.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Set Difference?</h2>
        <p className="text-muted-foreground">
          The set difference A - B (also written as A \ B) is the set of all elements that belong to A but do not belong to B. It removes from A any elements that also appear in B.
        </p>
        <p className="text-muted-foreground">
          Set difference is a fundamental operation in set theory, used to find what's unique to one set when compared to another.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Set Difference Notation</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            A - B = {"{x | x ∈ A and x ∉ B}"}
          </code>
          <p className="text-sm text-muted-foreground mt-2">
            Read as: "A minus B equals the set of all x such that x is in A and x is not in B"
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Alternative notations: A \ B, A ~ B
          </p>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Set Difference Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Numbers with Overlap</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 3, 4, 5, 6}"}<br />
              B = {"{2, 4, 6, 8}"}<br />
              A - B = {"{1, 3, 5}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Elements 2, 4, 6 are removed because they appear in B.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Disjoint Sets</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 3}"}<br />
              B = {"{4, 5, 6}"}<br />
              A - B = {"{1, 2, 3}"} = A
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              When sets have no common elements, A - B = A.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Subset Case</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 3, 4, 5}"}<br />
              B = {"{1, 2, 3}"}<br />
              A - B = {"{4, 5}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              B is a subset of A, so A - B contains the remaining elements.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Letters Example</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{a, b, c, d, e}"}<br />
              B = {"{b, d, f}"}<br />
              A - B = {"{a, c, e}"}
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Set Difference</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• A - A = ∅ (difference with itself is empty)</li>
              <li>• A - ∅ = A (difference with empty set)</li>
              <li>• ∅ - A = ∅ (empty minus anything is empty)</li>
              <li>• A - B ≠ B - A (not commutative)</li>
              <li>• A - B = A ∩ B′ (equals A intersect B complement)</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Important Identities</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• A - (B ∪ C) = (A - B) ∩ (A - C)</li>
              <li>• A - (B ∩ C) = (A - B) ∪ (A - C)</li>
              <li>• (A - B) ∪ (A ∩ B) = A</li>
              <li>• If B ⊆ A, then A - B = A \ B</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Venn Diagram Visualization</h2>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            In a Venn diagram, A - B is represented by shading only the part of circle A that does not overlap with circle B.
          </p>
          <div className="flex justify-center">
            <div className="relative w-48 h-32">
              <div className="absolute left-8 top-0 w-24 h-24 rounded-full border-2 border-primary bg-primary/30"></div>
              <div className="absolute right-8 top-0 w-24 h-24 rounded-full border-2 border-primary bg-primary/10"></div>
              <div className="absolute left-4 top-10 text-xs font-semibold">A</div>
              <div className="absolute right-4 top-10 text-xs font-semibold">B</div>
              <div className="absolute left-6 top-12 text-xs font-bold">A - B</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">A - B vs B - A</h2>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            Set difference is <strong>not commutative</strong>. A - B and B - A generally give different results.
          </p>
          <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
            A = {"{1, 2, 3, 4}"}<br />
            B = {"{3, 4, 5, 6}"}<br />
            <br />
            A - B = {"{1, 2}"} (elements only in A)<br />
            B - A = {"{5, 6}"} (elements only in B)
          </code>
          <p className="text-xs text-muted-foreground mt-2">
            A - B ≠ B - A unless A = B (in which case both equal ∅)
          </p>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Applications of Set Difference</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Database Operations</h3>
            <p className="text-sm text-muted-foreground">
              SQL EXCEPT and MINUS operations use set difference to find records in one table not in another.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Version Control</h3>
            <p className="text-sm text-muted-foreground">
              Git diff shows changes (differences) between file versions using set difference concepts.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Filtering Data</h3>
            <p className="text-sm text-muted-foreground">
              Removing duplicates or excluded items from a list uses set difference operations.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Logic Circuits</h3>
            <p className="text-sm text-muted-foreground">
              Digital logic uses set difference for implementing certain Boolean functions.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is set difference the same as subtraction?</h3>
            <p className="text-sm text-muted-foreground">
              Conceptually similar, but set difference removes elements (not numbers). It's about membership, not arithmetic.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What if A and B have no common elements?</h3>
            <p className="text-sm text-muted-foreground">
              If A and B are disjoint (no common elements), then A - B = A. Nothing is removed from A.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can set difference be empty?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! If all elements of A are also in B (A ⊆ B), then A - B = ∅ (the empty set).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between - and \ notation?</h3>
            <p className="text-sm text-muted-foreground">
              Both A - B and A \ B mean the same thing. The backslash notation is preferred in some texts to avoid confusion with arithmetic subtraction.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/union-of-sets-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Union of Sets</p>
            <p className="text-xs text-muted-foreground">Find A ∪ B</p>
          </a>
          <a href="/math-tools/intersection-of-sets-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Intersection of Sets</p>
            <p className="text-xs text-muted-foreground">Find A ∩ B</p>
          </a>
          <a href="/math-tools/complement-of-set-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Complement of Set</p>
            <p className="text-xs text-muted-foreground">Find A′</p>
          </a>
        </div>
      </section>
    </div>
  );
}
