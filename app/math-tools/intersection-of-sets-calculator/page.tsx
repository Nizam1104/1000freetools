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

  const loadExample = (a: string, b: string, c?: string) => {
    setAInput(a);
    setBInput(b);
    setCInput(c || "");
    setResult(null);
    setError("");
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  return (
    <div className="w-full mx-auto space-y-8">
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

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateIntersection}>Calculate Intersection</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1, 2, 3, 4, 5", "3, 4, 5, 6, 7")}>Numbers</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("2, 4, 6, 8, 10", "1, 3, 5, 7, 9")}>Disjoint</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("a, b, c, d", "c, d, e, f")}>Letters</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1, 2, 3", "2, 3, 4", "3, 4, 5")}>Three sets</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("10, 20, 30, 40, 50", "25, 30, 35, 40, 45")}>Multiples</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1, 1, 2, 2, 3", "2, 2, 3, 3, 4")}>With duplicates</Button>
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

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Set A size</p>
                <p className="text-2xl font-bold">{parseSet(setA).length}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Set B size</p>
                <p className="text-2xl font-bold">{parseSet(setB).length}</p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Intersection size</p>
                <p className="text-2xl font-bold">{result.length}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Set Intersection</h2>
        <p className="text-muted-foreground">
          The intersection of sets is one of the fundamental operations in set theory. It finds all elements that are common to two or more sets. The intersection of sets A and B is written as A ∩ B and read as "A intersect B" or "A cap B."
        </p>
        <p className="text-muted-foreground">
          Think of intersection as the "AND" operation for sets. An element is in A ∩ B only if it's in A AND in B. This is different from union (A ∪ B), which includes elements in A OR B (or both).
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Set Intersection Properties</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-sm mb-3">Definition</h4>
              <div className="font-mono text-sm p-3 bg-background rounded mb-3">
                A ∩ B = {'{'}x {'|'} x ∈ A and x ∈ B{'}'}
              </div>
              <p className="text-sm text-muted-foreground">
                The set of all elements x such that x is in A AND x is in B.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Key Properties</h4>
              <ul className="space-y-2 text-sm">
                <li>• Commutative: A ∩ B = B ∩ A</li>
                <li>• Associative: (A ∩ B) ∩ C = A ∩ (B ∩ C)</li>
                <li>• Identity: A ∩ U = A (U = universal set)</li>
                <li>• Empty: A ∩ ∅ = ∅</li>
                <li>• Idempotent: A ∩ A = A</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: Basic Intersection</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = {'{'}1, 2, 3, 4, 5{'}'}</div>
              <div>B = {'{'}3, 4, 5, 6, 7{'}'}</div>
              <div className="mt-2">Find A ∩ B:</div>
              <div>Common elements: 3, 4, 5</div>
              <div>A ∩ B = {'{'}3, 4, 5{'}'}</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: Disjoint Sets</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = {'{'}2, 4, 6, 8, 10{'}'} (even numbers)</div>
              <div>B = {'{'}1, 3, 5, 7, 9{'}'} (odd numbers)</div>
              <div className="mt-2">Find A ∩ B:</div>
              <div>No common elements</div>
              <div>A ∩ B = ∅ (empty set)</div>
              <div className="text-muted-foreground mt-2">These sets are disjoint.</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Three Sets</h4>
            <div className="font-mono text-sm space-y-2">
              <div>A = {'{'}1, 2, 3, 4, 5{'}'}</div>
              <div>B = {'{'}2, 3, 4, 5, 6{'}'}</div>
              <div>C = {'{'}3, 4, 5, 6, 7{'}'}</div>
              <div className="mt-2">Find A ∩ B ∩ C:</div>
              <div>A ∩ B = {'{'}2, 3, 4, 5{'}'}</div>
              <div>(A ∩ B) ∩ C = {'{'}3, 4, 5{'}'}</div>
              <div className="text-muted-foreground mt-2">Only 3, 4, 5 appear in ALL three sets.</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 4: Real-World Application</h4>
            <div className="text-sm space-y-2">
              <p>In a survey of 100 students:</p>
              <div className="font-mono">A = students who like Math = {'{'}45{'}'}</div>
              <div className="font-mono">B = students who like Science = {'{'}50{'}'}</div>
              <div className="font-mono">A ∩ B = students who like BOTH = {'{'}20{'}'}</div>
              <p className="text-muted-foreground mt-2">20 students like both Math and Science.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            Set theory was founded by German mathematician Georg Cantor in the 1870s. His work on infinite sets was revolutionary and controversial. The intersection symbol ∩ was introduced by Giuseppe Peano in 1888, inspired by the logical AND operator.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between intersection and union?</h4>
            <p className="text-sm text-muted-foreground">
              Intersection (∩) finds elements in BOTH sets – it's the "AND" operation. Union (∪) finds elements in EITHER set – it's the "OR" operation. Intersection makes sets smaller; union makes them larger.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does it mean if the intersection is empty?</h4>
            <p className="text-sm text-muted-foreground">
              Empty intersection (∅) means the sets have no common elements. Such sets are called "disjoint" or "mutually exclusive." For example, the set of even numbers and the set of odd numbers are disjoint.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can intersection contain duplicates?</h4>
            <p className="text-sm text-muted-foreground">
              No. Sets by definition contain only unique elements. Even if an element appears multiple times in the input, it appears only once in the intersection. This calculator automatically removes duplicates.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find intersection of more than two sets?</h4>
            <p className="text-sm text-muted-foreground">
              Intersection is associative, so order doesn't matter. Find A ∩ B first, then intersect that result with C, and so on. An element must be in ALL sets to be in the final intersection.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the intersection of a set with itself?</h4>
            <p className="text-sm text-muted-foreground">
              A ∩ A = A. Every element in A is obviously in A, so the intersection contains all elements of A. This is called the idempotent property of intersection.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where is set intersection used in real life?</h4>
            <p className="text-sm text-muted-foreground">
              Database queries (SQL JOIN), search engines (finding pages matching multiple criteria), filtering products by multiple features, Venn diagrams in statistics, and probability (P(A and B) uses intersection).
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
