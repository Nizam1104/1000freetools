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
        <h2 className="text-2xl font-semibold">What is Complement of a Set?</h2>
        <p className="text-muted-foreground">
          The complement of a set A, denoted as A′ or Aᶜ, is the set of all elements in the universal set U that are not in A. In other words, it contains everything "outside" of set A within the context of the universal set.
        </p>
        <p className="text-muted-foreground">
          The complement operation is fundamental in set theory and is used extensively in probability, logic, and various branches of mathematics.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Complement Notation</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            A′ = {"{x ∈ U | x ∉ A}"}
          </code>
          <p className="text-sm text-muted-foreground mt-2">
            Read as: "A complement equals the set of all x in U such that x is not in A"
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Alternative notations: Aᶜ, A̅, or U - A
          </p>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Complement Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Numbers Example</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              U = {"{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}"}<br />
              A = {"{2, 4, 6, 8, 10}"}<br />
              A′ = {"{1, 3, 5, 7, 9}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              The complement contains all odd numbers from 1 to 10.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Letters Example</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              U = {"{a, b, c, d, e, f}"}<br />
              A = {"{a, c, e}"}<br />
              A′ = {"{b, d, f}"}
            </code>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Empty Set Complement</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              U = {"{1, 2, 3}"}<br />
              A = {"{ }"} (empty set)<br />
              A′ = {"{1, 2, 3}"} = U
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              The complement of the empty set is the universal set.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Complement</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Basic Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• A ∪ A′ = U (union with complement is universal)</li>
              <li>• A ∩ A′ = ∅ (intersection with complement is empty)</li>
              <li>• (A′)′ = A (double complement returns original)</li>
              <li>• ∅′ = U (complement of empty set)</li>
              <li>• U′ = ∅ (complement of universal set)</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">De Morgan's Laws</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• (A ∪ B)′ = A′ ∩ B′</li>
              <li>• (A ∩ B)′ = A′ ∪ B′</li>
              <li>• The complement of a union is the intersection of complements</li>
              <li>• The complement of an intersection is the union of complements</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Venn Diagram Visualization</h2>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            In a Venn diagram, the complement A′ is represented by shading the area outside circle A but within the universal set rectangle.
          </p>
          <div className="flex justify-center">
            <div className="relative w-48 h-36 border-2 border-muted-foreground rounded-lg p-4">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-primary bg-primary/20"></div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-semibold">A</div>
              <div className="absolute right-2 top-2 text-xs text-muted-foreground">U</div>
              <div className="absolute left-2 bottom-2 text-xs font-semibold text-primary">A′</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Applications of Set Complement</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Probability Theory</h3>
            <p className="text-sm text-muted-foreground">
              P(A′) = 1 - P(A). The probability of an event not occurring equals 1 minus the probability of it occurring.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Logic and Boolean Algebra</h3>
            <p className="text-sm text-muted-foreground">
              Complement corresponds to logical NOT. If A is true, A′ is false, and vice versa.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Database Queries</h3>
            <p className="text-sm text-muted-foreground">
              Finding records that don't match certain criteria uses set complement operations.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Computer Science</h3>
            <p className="text-sm text-muted-foreground">
              Bitwise NOT operations and set difference calculations rely on complement concepts.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the universal set?</h3>
            <p className="text-sm text-muted-foreground">
              The universal set U is the set containing all elements under consideration for a particular problem. The complement is always defined relative to a universal set.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can the complement be empty?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! If set A equals the universal set U, then A′ = ∅ (the empty set). There are no elements outside of A.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What happens if you take the complement twice?</h3>
            <p className="text-sm text-muted-foreground">
              Taking the complement twice returns the original set: (A′)′ = A. This is called the involution property.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Is complement the same as set difference?</h3>
            <p className="text-sm text-muted-foreground">
              The complement A′ is a special case of set difference: A′ = U - A. Set difference is more general and works with any two sets.
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
          <a href="/math-tools/difference-of-sets-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Set Difference</p>
            <p className="text-xs text-muted-foreground">Find A - B</p>
          </a>
        </div>
      </section>
    </div>
  );
}
