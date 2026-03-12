"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function PowerSetGenerator() {
  const [inputSet, setInputSet] = useState("");
  const [result, setResult] = useState<(number | string)[][] | null>(null);
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

  const generatePowerSet = (set: (number | string)[]): (number | string)[][] => {
    const powerSet: (number | string)[][] = [[]];

    for (const element of set) {
      const newSubsets = powerSet.map(subset => [...subset, element]);
      powerSet.push(...newSubsets);
    }

    return powerSet;
  };

  const calculatePowerSet = () => {
    try {
      const set = parseSet(inputSet);

      if (set.length === 0) {
        setError("Please enter a set");
        setResult(null);
        return;
      }

      if (set.length > 25) {
        setError("For performance, please limit to 25 elements or fewer");
        setResult(null);
        return;
      }

      const powerSet = generatePowerSet(set);

      // Sort subsets by size, then lexicographically
      powerSet.sort((a, b) => {
        if (a.length !== b.length) return a.length - b.length;
        const aStr = a.map(String).sort().join(",");
        const bStr = b.map(String).sort().join(",");
        return aStr.localeCompare(bStr);
      });

      setResult(powerSet);
      setError("");
    } catch (e) {
      setError("Error generating power set. Please check your input.");
      setResult(null);
    }
  };

  const reset = () => {
    setInputSet("");
    setResult(null);
    setError("");
  };

  const loadExample = (example: string) => {
    setInputSet(example);
    setResult(null);
    setError("");
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  const formatSubset = (subset: (number | string)[]): string => {
    if (subset.length === 0) return "∅";
    return "{" + subset.map(formatElement).join(", ") + "}";
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Power Set Generator - Find All Subsets Online</h1>
        <p className="text-muted-foreground">
          Generate the complete power set of any set with our free online power set generator. Find all 2ⁿ subsets including the empty set and the set itself.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Set (comma or space separated)</Label>
          <Textarea
            placeholder="e.g., 1, 2, 3 or a, b, c, d"
            value={inputSet}
            onChange={(e) => setInputSet(e.target.value)}
            rows={2}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculatePowerSet}>Generate Power Set</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1, 2, 3")}>&#123;1, 2, 3&#125;</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("a, b, c, d")}>&#123;a, b, c, d&#125;</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("red, green, blue")}>Colors</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("5, 10, 15, 20, 25")}>Numbers</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("x, y, z")}>Variables</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("1")}>Single element</Button>
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
                P(S) - Power Set ({result.length} subsets)
              </p>
              <div className="font-mono text-xs space-y-1 max-h-96 overflow-y-auto bg-background p-4 rounded">
                {"{"}
                {result.map((subset, index) => (
                  <div key={index} className="ml-4">
                    {formatSubset(subset)}{index < result.length - 1 ? "," : ""}
                  </div>
                ))}
                {"}"}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Total subsets: {result.length} = 2^{inputSet.split(/[,\s]+/).filter(s => s.trim()).length}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">By Subset Size</h4>
                <div className="space-y-2 text-sm">
                  {Array.from({ length: (inputSet.split(/[,\s]+/).filter(s => s.trim()).length) + 1 }, (_, i) => i).map(size => {
                    const count = result.filter(s => s.length === size).length;
                    return (
                      <div key={size} className="flex justify-between">
                        <span>Size {size}:</span>
                        <span className="font-mono">{count} subset{count !== 1 ? "s" : ""}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-2">Understanding the Result</h4>
                <p className="text-sm text-muted-foreground">
                  The power set contains <strong>all possible subsets</strong> of the original set, including the empty set and the set itself.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Power Sets</h2>
        <p className="text-muted-foreground">
          The power set of a set S is the collection of ALL possible subsets of S - every combination of elements you can make, from the empty set (no elements) to the full set itself. It's called the "power" set because if your original set has n elements, the power set has 2ⁿ elements.
        </p>
        <p className="text-muted-foreground">
          Think of it this way: for each element in your set, you have two choices - include it in a subset or don't. With n elements, that's 2 × 2 × 2 × ... (n times) = 2ⁿ possible combinations.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Power Set Properties</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Size Formula</h4>
            <p className="text-sm text-muted-foreground mb-2">If |S| = n, then |P(S)| = 2ⁿ</p>
            <div className="font-mono text-xs bg-muted p-2 rounded space-y-1">
              <div>Set with 1 element → 2¹ = 2 subsets</div>
              <div>Set with 2 elements → 2² = 4 subsets</div>
              <div>Set with 3 elements → 2³ = 8 subsets</div>
              <div>Set with 10 elements → 2¹⁰ = 1,024 subsets</div>
            </div>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Key Properties</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• The empty set ∅ is always in P(S)</li>
              <li>• The set S itself is always in P(S)</li>
              <li>• Every element of S appears in exactly half the subsets</li>
              <li>• P(∅) = {'{'}∅{'}'} (one subset: the empty set)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Power Set of {'{'}1, 2{'}'}</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Original set: S = {'{'}1, 2{'}'}</div>
              <div>Number of elements: n = 2</div>
              <div>Expected subsets: 2² = 4</div>
              <div>Power set P(S) = {"{"} ∅, {'{'}1{'}'}, {'{'}2{'}'}, {'{'}1,2{'}'} {"}"}</div>
              <div className="text-muted-foreground">Breakdown: 1 empty + 2 singletons + 1 full set = 4</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Power Set of {'{'}a, b, c{'}'}</h4>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Original set: S = {'{'}a, b, c{'}'}</div>
              <div>Number of elements: n = 3</div>
              <div>Expected subsets: 2³ = 8</div>
              <div>Power set P(S) = {"{"}</div>
              <div className="ml-4">∅,</div>
              <div className="ml-4">{'{'}a{'}'}, {'{'}b{'}'}, {'{'}c{'}'},</div>
              <div className="ml-4">{'{'}a,b{'}'}, {'{'}a,c{'}'}, {'{'}b,c{'}'},</div>
              <div className="ml-4">{'{'}a,b,c{'}'}</div>
              <div>{"}"}</div>
              <div className="text-muted-foreground">Breakdown: 1 + 3 + 3 + 1 = 8 subsets</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Power Set of {'{'}red, blue{'}'}</h4>
            <p className="text-sm text-muted-foreground mb-2">Using color names as elements:</p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>S = {'{'}red, blue{'}'}</div>
              <div>P(S) = {"{"} ∅, {'{'}red{'}'}, {'{'}blue{'}'}, {'{'}red,blue{'}'} {"}"}</div>
              <div className="text-muted-foreground">Elements can be anything: numbers, letters, words, objects...</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Real-World Application</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A pizza shop offers 4 toppings: pepperoni, mushrooms, onions, peppers. How many different pizzas can you order (including plain cheese)?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>This is the power set of {'{'}pepperoni, mushrooms, onions, peppers{'}'}</div>
              <div>Number of possible pizzas = 2⁴ = 16</div>
              <div>Breakdown: 1 plain + 4 one-topping + 6 two-topping + 4 three-topping + 1 four-topping = 16</div>
              <div className="text-green-600 font-semibold">You can order 16 different pizza combinations!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            Georg Cantor, the father of set theory, proved that the power set of any set is always strictly larger than the original set - even for infinite sets! This means there are different "sizes" of infinity. The power set of the natural numbers has the same size as the real numbers. This revolutionary idea was so controversial that some mathematicians attacked Cantor personally, contributing to his mental health struggles.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is it called a "power" set?</h4>
            <p className="text-sm text-muted-foreground">
              The name comes from the fact that if a set has n elements, its power set has 2ⁿ (2 to the power of n) elements. The notation P(S) or ℘(S) comes from the German "Potenzmenge" meaning "power set."
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the power set of the empty set?</h4>
            <p className="text-sm text-muted-foreground">
              P(∅) = {'{'}∅{'}'}. The empty set has one subset: itself. So |P(∅)| = 2⁰ = 1. This might seem paradoxical, but the empty set is a subset of every set, including itself.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I count subsets of a specific size?</h4>
            <p className="text-sm text-muted-foreground">
              Use binomial coefficients (combinations). The number of k-element subsets of an n-element set is C(n,k) = n!/(k!(n-k)!). For a 5-element set: C(5,0)=1 empty, C(5,1)=5 singletons, C(5,2)=10 pairs, C(5,3)=10 triples, C(5,4)=5 quadruples, C(5,5)=1 full set. Total: 1+5+10+10+5+1=32=2⁵.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can a set contain itself as an element?</h4>
            <p className="text-sm text-muted-foreground">
              In standard set theory (ZFC), no - this leads to Russell's Paradox. However, the power set P(S) contains S as a subset (element of the power set), which is different. S ∈ P(S) but S ⊄ S.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What&apos;s the difference between a subset and an element?</h4>
            <p className="text-sm text-muted-foreground">
              An element is a member of a set (1 ∈ {'{'}1,2,3{'}'}). A subset is a set whose elements are all in another set ({'{'}1,2{'}'} ⊆ {'{'}1,2,3{'}'}). In the power set, the elements ARE subsets of the original set.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where are power sets used in computer science?</h4>
            <p className="text-sm text-muted-foreground">
              Power sets appear in combinatorial optimization, feature selection in machine learning (which features to include), test case generation (which tests to run), access control (which permissions to grant), and anywhere you need to enumerate all possible combinations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
