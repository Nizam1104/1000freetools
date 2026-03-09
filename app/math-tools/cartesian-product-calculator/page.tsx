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

      if (a.length > 100 || b.length > 100) {
        setError("For performance reasons, please limit sets to 100 elements each");
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

  const loadExample = (type: string) => {
    const examples: Record<string, { a: string; b: string }> = {
      basic: { a: "1, 2, 3", b: "x, y" },
      numbers: { a: "1, 2, 3, 4", b: "5, 6, 7" },
      colors: { a: "red, green, blue", b: "light, dark" },
      dice: { a: "1, 2, 3, 4, 5, 6", b: "1, 2, 3, 4, 5, 6" },
      coins: { a: "heads, tails", b: "heads, tails" },
      sizes: { a: "small, medium, large", b: "red, blue, green" },
      letters: { a: "a, b, c, d", b: "1, 2, 3, 4, 5" }
    };
    const ex = examples[type] || examples.basic;
    setAInput(ex.a);
    setBInput(ex.b);
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

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculateCartesianProduct}>Calculate A × B</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Load example:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("basic")}>Basic</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("numbers")}>Numbers</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("colors")}>Colors</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("dice")}>Dice Roll</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("coins")}>Coin Flips</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("sizes")}>Sizes × Colors</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("letters")}>Letters × Numbers</Button>
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
              <div className="font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
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
                Order matters: (a, b) ≠ (b, a) unless a = b. The total number of pairs equals |A| × |B|.
              </p>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Cartesian Products</h2>
        <p className="text-muted-foreground">
          The Cartesian product is a fundamental operation in set theory that combines two sets to create a new set of ordered pairs. Named after the French mathematician René Descartes, this concept forms the foundation of coordinate geometry – every point on a graph is essentially an element of the Cartesian product of the real numbers with themselves.
        </p>
        <p className="text-muted-foreground">
          When you take the Cartesian product of set A with set B (written as A × B), you're creating every possible pairing where the first item comes from A and the second comes from B. If A has 3 elements and B has 4 elements, the product A × B will have exactly 3 × 4 = 12 ordered pairs.
        </p>
        <p className="text-muted-foreground">
          The word "ordered" is crucial here. The pair (1, 2) is different from (2, 1) because the order tells you which set each element came from. This is why A × B is generally different from B × A – you'd get the same pairs but with the elements reversed.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">The Cartesian Product Formula</h2>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-sm mb-4">
            A × B = {"{"}(a, b) | a ∈ A and b ∈ B{"}"}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Read this as: "A cross B equals the set of all ordered pairs (a, b) such that a is an element of A and b is an element of B."
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-semibold">Size formula:</span>
              <span>|A × B| = |A| × |B|</span>
            </div>
            <div className="text-muted-foreground">
              The number of elements in the Cartesian product equals the product of the sizes of the two sets.
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Key Properties</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Not Commutative</div>
                <div className="text-muted-foreground">A × B ≠ B × A (unless A = B or one is empty)</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Empty Set Rule</div>
                <div className="text-muted-foreground">A × ∅ = ∅ × A = ∅ (product with empty set is empty)</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Distributive Laws</div>
                <div className="text-muted-foreground">A × (B ∪ C) = (A × B) ∪ (A × C)</div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Real-World Applications</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Database Queries</div>
                <div className="text-muted-foreground">SQL JOIN operations create Cartesian products of tables</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Probability</div>
                <div className="text-muted-foreground">Sample spaces for combined events are Cartesian products</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-semibold">Computer Graphics</div>
                <div className="text-muted-foreground">Screen pixels form a Cartesian product of x and y coordinates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: Basic Numbers and Letters</h3>
            <p className="text-sm text-muted-foreground mb-3">Find A × B where A = {"{1, 2, 3}"} and B = {"{x, y}"}</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Set A:</strong> {"{1, 2, 3}"} (3 elements)</div>
              <div><strong>Set B:</strong> {"{x, y}"} (2 elements)</div>
              <div><strong>Expected pairs:</strong> 3 × 2 = 6</div>
              <div className="pt-2 border-t">
                <strong>A × B = {"{"}</strong>
              </div>
              <div className="ml-4">(1, x), (1, y),</div>
              <div className="ml-4">(2, x), (2, y),</div>
              <div className="ml-4">(3, x), (3, y)</div>
              <div><strong>{"}"}</strong></div>
              <div className="pt-2 text-muted-foreground">
                Each element from A is paired with each element from B, maintaining order.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Rolling Two Dice</h3>
            <p className="text-sm text-muted-foreground mb-3">The sample space for rolling two six-sided dice is the Cartesian product of {"{1,2,3,4,5,6}"} with itself.</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Set A (Die 1):</strong> {"{1, 2, 3, 4, 5, 6}"}</div>
              <div><strong>Set B (Die 2):</strong> {"{1, 2, 3, 4, 5, 6}"}</div>
              <div><strong>Total outcomes:</strong> 6 × 6 = 36</div>
              <div className="pt-2 border-t font-semibold">Sample Space (A × A):</div>
              <div className="grid grid-cols-6 gap-1 text-xs mt-2">
                {Array.from({ length: 6 }, (_, i) => i + 1).flatMap(row => 
                  Array.from({ length: 6 }, (_, col) => (
                    <div key={`${row}-${col}`} className="text-center p-1 bg-background rounded">({row},{col + 1})</div>
                  ))
                )}
              </div>
              <div className="pt-2 text-muted-foreground">
                This is why there are 36 possible outcomes when rolling two dice. The probability of rolling doubles (1,1), (2,2), etc. is 6/36 = 1/6.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Coin Flip Combinations</h3>
            <p className="text-sm text-muted-foreground mb-3">Find all outcomes when flipping two coins (heads or tails).</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Set A (Coin 1):</strong> {"{heads, tails}"}</div>
              <div><strong>Set B (Coin 2):</strong> {"{heads, tails}"}</div>
              <div><strong>Total outcomes:</strong> 2 × 2 = 4</div>
              <div className="pt-2 border-t">
                <strong>A × B = {"{"}(heads, heads), (heads, tails), (tails, heads), (tails, tails){"}"}</strong>
              </div>
              <div className="pt-2 text-muted-foreground">
                Notice (heads, tails) ≠ (tails, heads) – the first coin is different in each case. This is why there are 4 outcomes, not 3.
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Product Sizes and Colors</h3>
            <p className="text-sm text-muted-foreground mb-3">A store sells shirts in 3 sizes and 3 colors. How many size-color combinations exist?</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
              <div><strong>Sizes:</strong> {"{small, medium, large}"}</div>
              <div><strong>Colors:</strong> {"{red, blue, green}"}</div>
              <div><strong>Total combinations:</strong> 3 × 3 = 9</div>
              <div className="pt-2 border-t">
                <strong>Sizes × Colors = {"{"}</strong>
              </div>
              <div className="ml-4">(small, red), (small, blue), (small, green),</div>
              <div className="ml-4">(medium, red), (medium, blue), (medium, green),</div>
              <div className="ml-4">(large, red), (large, blue), (large, green)</div>
              <div><strong>{"}"}</strong></div>
              <div className="pt-2 text-muted-foreground">
                This is why the store needs to stock 9 different SKU combinations to offer all size-color options.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Quick Fact</h2>
        <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm">
            <strong>René Descartes</strong> (1596-1650) gave his name to the Cartesian product and Cartesian coordinate system. Legend has it that he conceived the idea while watching a fly crawl across the ceiling of his room. He realized he could describe the fly's position using two numbers – its distance from two adjacent walls. This insight united algebra and geometry, creating analytic geometry and paving the way for calculus. The phrase "I think, therefore I am" (Cogito, ergo sum) is also his.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">Why is it called "Cartesian" product?</h3>
            <p className="text-sm text-muted-foreground">
              It's named after René Descartes, who developed the Cartesian coordinate system. In that system, every point is identified by an ordered pair (x, y) – exactly the structure of a Cartesian product. The entire coordinate plane is essentially ℝ × ℝ (the real numbers crossed with themselves).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Is A × B the same as B × A?</h3>
            <p className="text-sm text-muted-foreground">
              Generally, no. If A = {"{1}"} and B = {"{2}"}, then A × B = {"{(1, 2)}"} but B × A = {"{(2, 1)}"}. These are different ordered pairs. They're only equal if A = B (same set) or if one of the sets is empty (both products are empty).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What happens if one set is empty?</h3>
            <p className="text-sm text-muted-foreground">
              The Cartesian product with an empty set is always empty. If A = {"{1, 2}"} and B = ∅, then A × B = ∅. There's nothing in B to pair with elements from A, so no ordered pairs can be formed.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can I take the Cartesian product of a set with itself?</h3>
            <p className="text-sm text-muted-foreground">
              Absolutely. A × A gives you all ordered pairs where both elements come from A. For A = {"{1, 2}"}, A × A = {"{(1,1), (1,2), (2,1), (2,2)}"}. This is common in probability (like rolling two identical dice) and relations (a relation on A is a subset of A × A).
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the difference between Cartesian product and combinations?</h3>
            <p className="text-sm text-muted-foreground">
              Cartesian product creates ordered pairs from two different sets – order matters and elements come from specific sets. Combinations select items from a single set where order doesn't matter. For example, choosing 2 from {"{a,b,c}"} gives {"{a,b}, {a,c}, {b,c}"} (3 combinations), but {"{a,b}"} × {"{a,b}"} gives 4 ordered pairs.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How is Cartesian product used in databases?</h3>
            <p className="text-sm text-muted-foreground">
              In SQL, a CROSS JOIN creates the Cartesian product of two tables – every row from table A paired with every row from table B. If table A has 100 rows and table B has 50 rows, the result has 5,000 rows. This is rarely what you want, which is why JOINs usually include conditions to filter the product.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Can Cartesian products have more than two sets?</h3>
            <p className="text-sm text-muted-foreground">
              Yes! The Cartesian product of three sets A × B × C creates ordered triples (a, b, c). This extends to any number of sets. In fact, 3D space is ℝ × ℝ × ℝ – every point is an ordered triple (x, y, z). Computer scientists use n-tuples from Cartesian products extensively in data structures.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
