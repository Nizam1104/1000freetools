"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function IntersectionOfSetsCalculator() {
  const [setA, setAInput] = useState("");
  const [setB, setBInput] = useState("");
  const [setC, setCInput] = useState("");
  const [result, setResult] = useState<number[] | string[] | null>(null);
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

  const calculateIntersection = () => {
    try {
      const a = parseSet(setA);
      const b = parseSet(setB);
      const c = parseSet(setC);

      if (a.length === 0 || b.length === 0) {
        setError("Please enter elements in at least Set A and Set B");
        setResult(null);
        return;
      }

      let intersection = a.filter(item => b.includes(item));
      
      if (c.length > 0) {
        intersection = intersection.filter(item => c.includes(item));
      }

      intersection = [...new Set(intersection)];
      intersection.sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") return a - b;
        return String(a).localeCompare(String(b));
      });

      setResult(intersection);
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
    setAInput("1, 2, 3, 4, 5");
    setBInput("3, 4, 5, 6, 7");
    setCInput("");
    setResult(null);
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Intersection of Sets Calculator – Find A ∩ B Online</h1>
        <p className="text-muted-foreground">
          Find the intersection of any two or more sets with our free online intersection calculator. Identifies all common elements shared between sets with clear notation.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>Set A (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 1, 2, 3, 4, 5"
              value={setA}
              onChange={(e) => setAInput(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Set B (comma or space separated)</Label>
            <Textarea
              placeholder="e.g., 3, 4, 5, 6, 7"
              value={setB}
              onChange={(e) => setBInput(e.target.value)}
              rows={2}
            />
          </div>
          <div>
            <Label>Set C (optional)</Label>
            <Textarea
              placeholder="e.g., 4, 5, 8, 9"
              value={setC}
              onChange={(e) => setCInput(e.target.value)}
              rows={2}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={calculateIntersection}>Calculate Intersection</Button>
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
                {setC.trim() ? "A ∩ B ∩ C" : "A ∩ B"}
              </p>
              {result.length > 0 ? (
                <p className="text-lg font-mono">
                  {"{"}{result.map(formatElement).join(", ")}{"}"}
                </p>
              ) : (
                <p className="text-lg font-mono">∅ (empty set)</p>
              )}
              <p className="text-sm text-muted-foreground mt-2">
                {result.length > 0 
                  ? `Common elements: ${result.length}`
                  : "No common elements (disjoint sets)"}
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
              <p className="text-sm text-muted-foreground">
                The intersection contains only elements that appear in <strong>all</strong> of the input sets. 
                If there are no common elements, the intersection is the empty set (∅).
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is Intersection of Sets?</h2>
        <p className="text-muted-foreground">
          The intersection of sets contains only the elements that are common to all sets. An element must appear in every input set to be included in the intersection.
        </p>
        <p className="text-muted-foreground">
          The intersection operation is denoted by the symbol ∩. For sets A and B, their intersection is written as A ∩ B.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Intersection Notation</h2>
        <div className="p-4 border rounded-lg">
          <code className="text-lg font-mono bg-muted px-3 py-2 rounded block">
            A ∩ B = {"{x | x ∈ A and x ∈ B}"}
          </code>
          <p className="text-sm text-muted-foreground mt-2">
            Read as: "A intersection B equals the set of all x such that x is in A and x is in B"
          </p>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Intersection Examples</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Numbers with Overlap</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 3, 4, 5}"}<br />
              B = {"{3, 4, 5, 6, 7}"}<br />
              A ∩ B = {"{3, 4, 5}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Only 3, 4, and 5 appear in both sets.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Disjoint Sets</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 3}"}<br />
              B = {"{4, 5, 6}"}<br />
              A ∩ B = ∅
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              No common elements means the intersection is empty.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Subset Intersection</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{1, 2, 3, 4, 5}"}<br />
              B = {"{2, 4}"}<br />
              A ∩ B = {"{2, 4}"} = B
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              When B is a subset of A, the intersection equals B.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Three Sets</h3>
            <code className="text-sm font-mono bg-muted px-2 py-1 rounded block">
              A = {"{a, b, c, d}"}<br />
              B = {"{b, c, d, e}"}<br />
              C = {"{c, d, e, f}"}<br />
              A ∩ B ∩ C = {"{c, d}"}
            </code>
            <p className="text-xs text-muted-foreground mt-2">
              Only c and d appear in all three sets.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Properties of Intersection</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Key Properties</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Commutative: A ∩ B = B ∩ A</li>
              <li>• Associative: (A ∩ B) ∩ C = A ∩ (B ∩ C)</li>
              <li>• Identity: A ∩ U = A (U = universal set)</li>
              <li>• Idempotent: A ∩ A = A</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Special Cases</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• A ∩ ∅ = ∅ (empty set)</li>
              <li>• If A ⊆ B, then A ∩ B = A</li>
              <li>• A ∩ Aᶜ = ∅ (complement)</li>
              <li>• A ∩ B ⊆ A and A ∩ B ⊆ B</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Venn Diagram Visualization</h2>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            In a Venn diagram, the intersection A ∩ B is represented by shading only the overlapping region of the circles.
          </p>
          <div className="flex justify-center">
            <div className="relative w-48 h-32">
              <div className="absolute left-8 top-0 w-24 h-24 rounded-full border-2 border-primary bg-primary/10"></div>
              <div className="absolute right-8 top-0 w-24 h-24 rounded-full border-2 border-primary bg-primary/10"></div>
              <div className="absolute left-1/2 -translate-x-1/2 top-6 w-12 h-16 rounded-full bg-primary/40"></div>
              <div className="absolute left-4 top-10 text-xs font-semibold">A</div>
              <div className="absolute right-4 top-10 text-xs font-semibold">B</div>
              <div className="absolute left-1/2 -translate-x-1/2 top-8 text-xs font-bold">A ∩ B</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What does intersection mean in sets?</h3>
            <p className="text-sm text-muted-foreground">
              Intersection finds elements common to all sets. An element is in the intersection only if it appears in every input set.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What if there are no common elements?</h3>
            <p className="text-sm text-muted-foreground">
              If sets have no common elements, their intersection is the empty set (∅ or {"{}"}). Such sets are called disjoint.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What is the difference between union and intersection?</h3>
            <p className="text-sm text-muted-foreground">
              Union (∪) combines all elements (like OR). Intersection (∩) finds common elements only (like AND). Union is usually larger; intersection is usually smaller.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can intersection equal one of the original sets?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! If one set is a subset of another, their intersection equals the smaller set. Also, A ∩ A = A.
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
          <a href="/math-tools/difference-of-sets-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Set Difference</p>
            <p className="text-xs text-muted-foreground">Find A - B</p>
          </a>
          <a href="/math-tools/complement-of-set-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Set Complement</p>
            <p className="text-xs text-muted-foreground">Find Aᶜ</p>
          </a>
        </div>
      </section>
    </div>
  );
}
