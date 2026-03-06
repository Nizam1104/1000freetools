"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function UnionOfSetsCalculator() {
  const [setA, setAInput] = useState("");
  const [setB, setBInput] = useState("");
  const [setC, setCInput] = useState("");
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

  const calculateUnion = () => {
    try {
      const a = parseSet(setA);
      const b = parseSet(setB);
      const c = parseSet(setC);

      if (a.length === 0 && b.length === 0 && c.length === 0) {
        setError("Please enter at least one element in any set");
        setResult(null);
        return;
      }

      const union = [...new Set([...a, ...b, ...c])];
      union.sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") return a - b;
        return String(a).localeCompare(String(b));
      });

      setResult(union);
      setError("");
    } catch (e) {
      setError("Error parsing sets. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setAInput("");
    setBInput("");
    setCInput("");
    setResult(null);
    setError("");
  };

  const loadExample = () => {
    setAInput("1, 2, 3, 4");
    setBInput("3, 4, 5, 6");
    setCInput("");
    setResult(null);
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Union of Sets Calculator – Find A ∪ B Online</h1>
        <p className="text-muted-foreground">
          Calculate the union of any two or more sets with our free online union calculator. Returns all unique elements combined from each set with clear set notation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>Set A (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 1, 2, 3, 4 or apple, banana, cherry"
              value={setA}
              onChange={(e) => setAInput(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Set B (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 3, 4, 5, 6"
              value={setB}
              onChange={(e) => setBInput(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Set C (optional)</Label>
            <Textarea
              placeholder="e.g., 5, 6, 7, 8"
              value={setC}
              onChange={(e) => setCInput(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateUnion}>Calculate Union</Button>
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
                {setC.trim() ? "A ∪ B ∪ C" : "A ∪ B"}
              </p>
              <p className="text-lg font-mono">
                {"{"}{result.map(formatElement).join(", ")}{"}"}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Total elements: {result.length}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
              <p className="text-sm text-muted-foreground">
                The union contains all unique elements that appear in <strong>any</strong> of the input sets. 
                Duplicate elements appear only once in the result.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Union of Sets?</h2>
        <p className="text-muted-foreground">
          The union of sets combines all elements from multiple sets into one set, removing duplicates. If an element appears in any of the input sets, it appears exactly once in the union.
        </p>
        <p className="text-muted-foreground">
          The union operation is denoted by the symbol ∪. For sets A and B, their union is written as A ∪ B.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Union Notation</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            A ∪ B = {"{x | x ∈ A or x ∈ B}"}
          </code>
          <p className="text-sm text-muted-foreground mt-2">
            Read as: "A union B equals the set of all x such that x is in A or x is in B"
          </p>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Union Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Numbers with Overlap</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 3, 4}"}<br />
              B = {"{3, 4, 5, 6}"}<br />
              A ∪ B = {"{1, 2, 3, 4, 5, 6}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Note: 3 and 4 appear in both sets but only once in the union.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Disjoint Sets</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 3}"}<br />
              B = {"{4, 5, 6}"}<br />
              A ∪ B = {"{1, 2, 3, 4, 5, 6}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Sets with no common elements are called disjoint.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Three Sets</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{a, b, c}"}<br />
              B = {"{b, c, d}"}<br />
              C = {"{c, d, e}"}<br />
              A ∪ B ∪ C = {"{a, b, c, d, e}"}
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Union</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Commutative: A ∪ B = B ∪ A</li>
              <li>• Associative: (A ∪ B) ∪ C = A ∪ (B ∪ C)</li>
              <li>• Identity: A ∪ ∅ = A</li>
              <li>• Idempotent: A ∪ A = A</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">With Other Operations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• A ∪ (B ∩ C) = (A ∪ B) ∩ (A ∪ C)</li>
              <li>• A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C)</li>
              <li>• De Morgan: (A ∪ B)ᶜ = Aᶜ ∩ Bᶜ</li>
              <li>• A ⊆ A ∪ B (A is subset of union)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Venn Diagram Visualization</h2>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            In a Venn diagram, the union A ∪ B is represented by shading the entire area covered by both circles.
          </p>
          <div className="flex justify-center">
            <div className="relative w-48 h-32">
              <div className="absolute left-8 top-0 w-24 h-24 rounded-full border-2 border-primary bg-primary/20"></div>
              <div className="absolute right-8 top-0 w-24 h-24 rounded-full border-2 border-primary bg-primary/20"></div>
              <div className="absolute left-4 top-10 text-xs font-semibold">A</div>
              <div className="absolute right-4 top-10 text-xs font-semibold">B</div>
              <div className="absolute left-1/2 -translate-x-1/2 top-12 text-xs">A ∪ B</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What does union mean in sets?</h3>
            <p className="text-sm text-muted-foreground">
              Union combines all elements from multiple sets. An element is in the union if it appears in at least one of the sets. Duplicates are removed.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the difference between union and intersection?</h3>
            <p className="text-sm text-muted-foreground">
              Union (∪) includes elements in ANY set. Intersection (∩) includes only elements in ALL sets. Union is like "OR", intersection is like "AND".
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can union have duplicate elements?</h3>
            <p className="text-sm text-muted-foreground">
              No. By definition, a set contains only unique elements. If an element appears in multiple input sets, it appears exactly once in the union.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the union with an empty set?</h3>
            <p className="text-sm text-muted-foreground">
              The union of any set A with the empty set is just A: A ∪ ∅ = A. The empty set contributes no elements.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/intersection-of-sets-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Intersection of Sets</p>
            <p className="text-xs text-muted-foreground">Find A ∩ B</p>
          </a>
          <a href="/math-tools/difference-of-sets-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Set Difference</p>
            <p className="text-xs text-muted-foreground">Find A - B</p>
          </a>
          <a href="/math-tools/venn-diagram-tool" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Venn Diagram Tool</p>
            <p className="text-xs text-muted-foreground">Visualize sets</p>
          </a>
        </div>
      </section>
    </div>
  );
}
