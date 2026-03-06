"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CartesianProductCalculator() {
  const [setA, setAInput] = useState("");
  const [setB, setBInput] = useState("");
  const [result, setResult] = useState<[number | string, number | string][] | null>(null);
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

  const calculateCartesianProduct = () => {
    try {
      const a = parseSet(setA);
      const b = parseSet(setB);

      if (a.length === 0 || b.length === 0) {
        setError("Please enter both sets A and B");
        setResult(null);
        return;
      }

      const product: [number | string, number | string][] = [];
      for (const elemA of a) {
        for (const elemB of b) {
          product.push([elemA, elemB]);
        }
      }

      setResult(product);
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
    setAInput("1, 2, 3");
    setBInput("x, y");
    setResult(null);
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Cartesian Product Calculator – Find A × B Online</h1>
        <p className="text-muted-foreground">
          Calculate the Cartesian product of any two sets with our free online calculator. Generate all ordered pairs (a, b) where a ∈ A and b ∈ B with clear notation.
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
              placeholder="e.g., x, y"
              value={setB}
              onChange={(e) => setBInput(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateCartesianProduct}>Calculate A × B</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={loadExample}>Load Example</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && result.length > 0 && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                A × B (Cartesian Product)
              </p>
              <div className="font-mono text-sm space-y-1 max-h-64 overflow-y-auto">
                {"{"}
                {result.map((pair, index) => (
                  <div key={index} className="ml-4">
                    ({formatElement(pair[0])}, {formatElement(pair[1])}){index < result.length - 1 ? "," : ""}
                  </div>
                ))}
                {"}"}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Total ordered pairs: {result.length} (|A| × |B| = {setA.split(/[,\s]+/).filter(s => s.trim()).length} × {setB.split(/[,\s]+/).filter(s => s.trim()).length})
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
              <p className="text-sm text-muted-foreground">
                The Cartesian product A × B contains all possible <strong>ordered pairs</strong> where the first element comes from A and the second from B.
                Order matters: (a, b) ≠ (b, a) unless a = b.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Cartesian Product?</h2>
        <p className="text-muted-foreground">
          The Cartesian product of two sets A and B, denoted A × B, is the set of all ordered pairs (a, b) where a is an element of A and b is an element of B. It's named after René Descartes, whose coordinate system uses this concept.
        </p>
        <p className="text-muted-foreground">
          The Cartesian product is fundamental in mathematics, forming the basis for coordinate geometry, relations, and functions.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Cartesian Product Notation</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            A × B = {"{(a, b) | a ∈ A and b ∈ B}"}
          </code>
          <p className="text-sm text-muted-foreground mt-2">
            Read as: "A cross B equals the set of all ordered pairs (a, b) such that a is in A and b is in B"
          </p>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Cartesian Product Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Numbers and Letters</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 3}"}<br />
              B = {"{x, y}"}<br />
              A × B = {"{(1,x), (1,y), (2,x), (2,y), (3,x), (3,y)}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              3 elements in A × 2 elements in B = 6 ordered pairs
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Same Set (A × A)</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2}"}<br />
              A × A = {"{(1,1), (1,2), (2,1), (2,2)}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              This is used in coordinate systems and relations.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">With Empty Set</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2}"}<br />
              B = {"{ }"}<br />
              A × B = {"{ }"} = ∅
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Cartesian product with empty set is always empty.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Real Numbers (R × R)</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              R × R = all points (x, y) in 2D plane
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              The entire Cartesian coordinate plane.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Cartesian Product</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• |A × B| = |A| × |B| (cardinality rule)</li>
              <li>• A × ∅ = ∅ × A = ∅</li>
              <li>• A × B ≠ B × A (not commutative)</li>
              <li>• (A × B) × C ≠ A × (B × C) (not associative)</li>
              <li>• A × (B ∪ C) = (A × B) ∪ (A × C)</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Distributive Laws</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• A × (B ∪ C) = (A × B) ∪ (A × C)</li>
              <li>• A × (B ∩ C) = (A × B) ∩ (A × C)</li>
              <li>• A × (B - C) = (A × B) - (A × C)</li>
              <li>• (A ∪ B) × C = (A × C) ∪ (B × C)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">A × B vs B × A</h2>
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            Cartesian product is <strong>not commutative</strong>. A × B and B × A are different sets (unless A = B or one is empty).
          </p>
          <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
            A = {"{1, 2}"}<br />
            B = {"{x, y}"}<br />
            <br />
            A × B = {"{(1,x), (1,y), (2,x), (2,y)}"}<br />
            B × A = {"{(x,1), (x,2), (y,1), (y,2)}"}
          </code>
          <p className="text-xs text-muted-foreground mt-2">
            The pairs are reversed, making them different sets.
          </p>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Applications of Cartesian Product</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Coordinate Geometry</h3>
            <p className="text-sm text-muted-foreground">
              The Cartesian plane is R × R, where every point is an ordered pair (x, y) of real numbers.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Database Relations</h3>
            <p className="text-sm text-muted-foreground">
              SQL CROSS JOIN produces Cartesian product of two tables, pairing every row from one with every row from another.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Functions and Relations</h3>
            <p className="text-sm text-muted-foreground">
              A function is a special subset of A × B where each input maps to exactly one output.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Combinatorics</h3>
            <p className="text-sm text-muted-foreground">
              Counting outcomes: if task A has m ways and task B has n ways, together they have m × n ways.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Why is it called Cartesian product?</h3>
            <p className="text-sm text-muted-foreground">
              Named after René Descartes, who developed analytic geometry using ordered pairs to represent points on a plane.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What's the difference between (a,b) and {"{a,b}"}?</h3>
            <p className="text-sm text-muted-foreground">
              (a,b) is an ordered pair where order matters. {"{a,b}"} is a set where order doesn't matter. (1,2) ≠ (2,1) but {"{1,2}"} = {"{2,1}"}.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can Cartesian product be infinite?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! If either set is infinite, the Cartesian product is infinite. For example, N × N (natural numbers) is countably infinite.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do you calculate the size of A × B?</h3>
            <p className="text-sm text-muted-foreground">
              For finite sets: |A × B| = |A| × |B|. Multiply the number of elements in each set.
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
          <a href="/math-tools/permutation-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Permutations</p>
            <p className="text-xs text-muted-foreground">Order matters</p>
          </a>
          <a href="/math-tools/combination-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Combinations</p>
            <p className="text-xs text-muted-foreground">Order doesn't matter</p>
          </a>
        </div>
      </section>
    </div>
  );
}
