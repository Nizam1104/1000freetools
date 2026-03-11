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

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How the Union of Sets Calculator Works</h2>
          <p className="text-muted-foreground mb-4">
            In set theory, the <strong>union</strong> of two or more sets combines all elements from each set into a single set. The union is denoted by the symbol ∪. The key rule: each element appears exactly once in the union, even if it appears in multiple input sets.
          </p>
          <p className="text-muted-foreground mb-4">
            Mathematically, for sets A and B:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm mb-4">
            A ∪ B = &#123;x | x ∈ A or x ∈ B&#125;
          </div>
          <p className="text-muted-foreground mb-4">
            This means the union contains every element that belongs to A, or B, or both. The calculator automatically removes duplicates and sorts the result for easy reading.
          </p>
          <p className="text-muted-foreground">
            The union operation is <strong>commutative</strong> (A ∪ B = B ∪ A) and <strong>associative</strong> ((A ∪ B) ∪ C = A ∪ (B ∪ C)), so the order of sets doesn&apos;t matter.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Union Calculations</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">Basic Number Sets</h3>
          <p className="text-muted-foreground mb-2">
            Find A ∪ B where A = &#123;1, 2, 3, 4&#125; and B = &#123;3, 4, 5, 6&#125;
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>A = &#123;1, 2, 3, 4&#125;</p>
            <p>B = &#123;3, 4, 5, 6&#125;</p>
            <p className="mt-2">A ∪ B = &#123;1, 2, 3, 4, 5, 6&#125;</p>
            <p className="text-muted-foreground mt-2">Note: 3 and 4 appear only once (duplicates removed)</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Three-Set Union</h3>
          <p className="text-muted-foreground mb-2">
            Find A ∪ B ∪ C where:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>A = &#123;1, 2, 3&#125;</p>
            <p>B = &#123;2, 3, 4, 5&#125;</p>
            <p>C = &#123;4, 5, 6, 7&#125;</p>
            <p className="mt-2">A ∪ B ∪ C = &#123;1, 2, 3, 4, 5, 6, 7&#125;</p>
            <p className="text-muted-foreground mt-2">Total: 7 unique elements</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Text/String Sets</h3>
          <p className="text-muted-foreground mb-2">
            Union works with any type of elements:
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>A = &#123;"apple", "banana", "cherry"&#125;</p>
            <p>B = &#123;"banana", "date", "elderberry"&#125;</p>
            <p className="mt-2">A ∪ B = &#123;"apple", "banana", "cherry", "date", "elderberry"&#125;</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Disjoint Sets</h3>
          <p className="text-muted-foreground mb-2">
            When sets have no common elements (disjoint):
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>A = &#123;1, 2, 3&#125;</p>
            <p>B = &#123;7, 8, 9&#125;</p>
            <p className="mt-2">A ∪ B = &#123;1, 2, 3, 7, 8, 9&#125;</p>
            <p className="text-muted-foreground mt-2">|A ∪ B| = |A| + |B| = 6 (no overlap)</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Fact: Set Theory's Revolutionary Impact</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p className="text-muted-foreground">
              <strong>Georg Cantor</strong> (1845-1918) founded set theory in the 1870s while studying trigonometric series. His work was initially controversial—mathematician Leopold Kronecker called Cantor a "scientific charlatan" and attacked his ideas about infinity. Cantor proved that some infinities are larger than others (the set of real numbers is "more infinite" than the set of integers), which seemed paradoxical at the time. Today, set theory is the foundation of all modern mathematics. Every mathematical object—from numbers to functions to spaces—can be defined in terms of sets. The union operation (&cup;) is one of the fundamental building blocks of this framework.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What is the union of two sets?</h3>
              <p className="text-muted-foreground">
                The union of sets A and B contains all elements that are in A, in B, or in both. It's like combining two groups and removing duplicate members. For example, if A = &#123;1, 2&#125; and B = &#123;2, 3&#125;, then A &cup; B = &#123;1, 2, 3&#125;.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What's the difference between union and intersection?</h3>
              <p className="text-muted-foreground">
                Union (&cup;) combines all elements from both sets. Intersection (&cap;) keeps only elements that appear in <em>both</em> sets. Using A = &#123;1, 2, 3&#125; and B = &#123;2, 3, 4&#125;: A &cup; B = &#123;1, 2, 3, 4&#125; but A &cap; B = &#123;2, 3&#125;.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What happens if one set is empty?</h3>
              <p className="text-muted-foreground">
                The union of any set A with the empty set &empty; equals A itself: A &cup; &empty; = A. The empty set contributes no elements, so the union is unchanged. This makes the empty set the "identity element" for union, similar to how 0 is the identity for addition.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I calculate the size of a union?</h3>
              <p className="text-muted-foreground">
                For two sets: |A &cup; B| = |A| + |B| - |A &cap; B|. You add the sizes, then subtract the overlap (elements counted twice). For A = &#123;1,2,3&#125; and B = &#123;3,4,5&#125;: |A &cup; B| = 3 + 3 - 1 = 5.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can I union sets with different types of elements?</h3>
              <p className="text-muted-foreground">
                Yes! Sets can contain numbers, strings, or any objects. The union simply combines all unique elements. However, mixing types might not be mathematically meaningful in some contexts, so use judgment based on your application.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the complement of a set?</h3>
              <p className="text-muted-foreground">
                The complement of set A (written A' or Aᶜ) contains everything <em>not</em> in A, relative to a universal set U. For example, if U = &#123;1,2,3,4,5&#125; and A = &#123;1,2&#125;, then A' = &#123;3,4,5&#125;. De Morgan's Laws relate complement to union: (A &cup; B)' = A' &cap; B'.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Where is set union used in real applications?</h3>
              <p className="text-muted-foreground">
                Set union appears in database queries (SQL UNION), programming (combining arrays or lists), probability (P(A or B)), search engines (combining result sets), and data analysis (merging datasets). It's a fundamental operation in any field that handles collections of data.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Related Math Tools</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/math-tools/intersection-of-sets-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Intersection of Sets Calculator</h3>
              <p className="text-sm text-muted-foreground">Find elements common to all input sets using set intersection.</p>
            </a>
            <a href="/math-tools/set-difference-calculator" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Set Difference Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate A - B (elements in A but not in B).</p>
            </a>
            <a href="/math-tools/venn-diagram-tool" className="p-4 border rounded-lg hover:bg-muted transition-colors">
              <h3 className="font-semibold mb-2">Venn Diagram Tool</h3>
              <p className="text-sm text-muted-foreground">Visualize set relationships with interactive 2-set and 3-set diagrams.</p>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
