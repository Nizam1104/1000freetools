"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function VennDiagramTool() {
  const [mode, setMode] = useState<"2set" | "3set">("2set");
  const [setA, setAInput] = useState("");
  const [setB, setBInput] = useState("");
  const [setC, setCInput] = useState("");
  const [result, setResult] = useState<{
    onlyA: (number | string)[];
    onlyB: (number | string)[];
    onlyC: (number | string)[];
    onlyAB: (number | string)[];
    onlyAC: (number | string)[];
    onlyBC: (number | string)[];
    ABC: (number | string)[];
    none: (number | string)[];
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

  const calculateVennRegions = () => {
    try {
      const a = parseSet(setA);
      const b = parseSet(setB);
      const c = mode === "3set" ? parseSet(setC) : [];

      const allElements = [...new Set([...a, ...b, ...c].map(el => 
        typeof el === "number" ? el : String(el)
      ))] as (number | string)[];

      const onlyA: (number | string)[] = [];
      const onlyB: (number | string)[] = [];
      const onlyC: (number | string)[] = [];
      const onlyAB: (number | string)[] = [];
      const onlyAC: (number | string)[] = [];
      const onlyBC: (number | string)[] = [];
      const ABC: (number | string)[] = [];
      const none: (number | string)[] = [];

      for (const elem of allElements) {
        const inA = a.some(x => areEqual(x, elem));
        const inB = b.some(x => areEqual(x, elem));
        const inC = c.some(x => areEqual(x, elem));

        if (inA && inB && inC) {
          ABC.push(elem);
        } else if (inA && inB) {
          onlyAB.push(elem);
        } else if (inA && inC) {
          onlyAC.push(elem);
        } else if (inB && inC) {
          onlyBC.push(elem);
        } else if (inA) {
          onlyA.push(elem);
        } else if (inB) {
          onlyB.push(elem);
        } else if (inC) {
          onlyC.push(elem);
        } else {
          none.push(elem);
        }
      }

      const sortElements = (arr: (number | string)[]) => {
        return arr.sort((x, y) => {
          if (typeof x === "number" && typeof y === "number") return x - y;
          return String(x).localeCompare(String(y));
        });
      };

      setResult({
        onlyA: sortElements(onlyA),
        onlyB: sortElements(onlyB),
        onlyC: sortElements(onlyC),
        onlyAB: sortElements(onlyAB),
        onlyAC: sortElements(onlyAC),
        onlyBC: sortElements(onlyBC),
        ABC: sortElements(ABC),
        none: sortElements(none),
      });
      setError("");
    } catch (e) {
      setError("Error calculating Venn diagram regions. Please check your input.");
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

  const loadExample2Set = () => {
    setMode("2set");
    setAInput("1, 2, 3, 4");
    setBInput("3, 4, 5, 6");
    setCInput("");
    setResult(null);
  };

  const loadExample3Set = () => {
    setMode("3set");
    setAInput("1, 2, 3, 4, 5");
    setBInput("4, 5, 6, 7, 8");
    setCInput("5, 6, 9, 10");
    setResult(null);
  };

  const formatElement = (el: number | string): string => {
    return typeof el === "number" ? el.toString() : `"${el}"`;
  };

  const formatRegion = (elements: (number | string)[]): string => {
    if (elements.length === 0) return "∅";
    return "{" + elements.map(formatElement).join(", ") + "}";
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Venn Diagram Tool – Visualize Set Relationships</h1>
        <p className="text-muted-foreground">
          Create interactive 2-set and 3-set Venn diagrams with our free online tool. Analyze set intersections, unions, and differences with visual representation and detailed region breakdowns.
        </p>
      </div>

      <div className="space-y-4">
        <Tabs value={mode} onValueChange={(v) => setMode(v as "2set" | "3set")}>
          <TabsList>
            <TabsTrigger value="2set">2-Set Diagram</TabsTrigger>
            <TabsTrigger value="3set">3-Set Diagram</TabsTrigger>
          </TabsList>

          <TabsContent value="2set" className="space-y-4 mt-4">
            <div className="space-y-4">
              <div>
                <Label>Set A (comma or space separated)</Label>
                <Textarea
                  placeholder="e.g., 1, 2, 3, 4"
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
            </div>
          </TabsContent>

          <TabsContent value="3set" className="space-y-4 mt-4">
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
                  placeholder="e.g., 4, 5, 6, 7, 8"
                  value={setB}
                  onChange={(e) => setBInput(e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <Label>Set C (comma or space separated)</Label>
                <Textarea
                  placeholder="e.g., 5, 6, 9, 10"
                  value={setC}
                  onChange={(e) => setCInput(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculateVennRegions}>Generate Venn Diagram</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
          <Button variant="outline" onClick={mode === "2set" ? loadExample2Set : loadExample3Set}>
            Load {mode === "2set" ? "2-Set" : "3-Set"} Example
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <div className="p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-4">Venn Diagram Visualization</h3>
              <div className="flex justify-center">
                {mode === "2set" ? (
                  <div className="relative w-64 h-40">
                    <div className="absolute left-8 top-0 w-32 h-32 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-semibold -mt-8">A</span>
                    </div>
                    <div className="absolute right-8 top-0 w-32 h-32 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                      <span className="text-xs font-semibold -mt-8">B</span>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold">
                      A ∩ B
                    </div>
                  </div>
                ) : (
                  <div className="relative w-64 h-56">
                    <div className="absolute left-8 top-0 w-28 h-28 rounded-full border-2 border-primary bg-primary/15 flex items-center justify-center">
                      <span className="text-xs font-semibold -mt-10">A</span>
                    </div>
                    <div className="absolute left-2 top-16 w-28 h-28 rounded-full border-2 border-primary bg-primary/15 flex items-center justify-center">
                      <span className="text-xs font-semibold mt-10">B</span>
                    </div>
                    <div className="absolute right-6 top-16 w-28 h-28 rounded-full border-2 border-primary bg-primary/15 flex items-center justify-center">
                      <span className="text-xs font-semibold mt-10">C</span>
                    </div>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold">
                      A ∩ B ∩ C
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-muted rounded-lg">
              <h3 className="font-semibold mb-4">Region Breakdown</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {mode === "2set" ? (
                  <>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Only in A</p>
                      <p className="font-mono text-sm">{formatRegion(result.onlyA)}</p>
                      <p className="text-xs text-muted-foreground">({result.onlyA.length} elements)</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Only in B</p>
                      <p className="font-mono text-sm">{formatRegion(result.onlyB)}</p>
                      <p className="text-xs text-muted-foreground">({result.onlyB.length} elements)</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">In A ∩ B (intersection)</p>
                      <p className="font-mono text-sm">{formatRegion(result.onlyAB)}</p>
                      <p className="text-xs text-muted-foreground">({result.onlyAB.length} elements)</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Total in A ∪ B (union)</p>
                      <p className="font-mono text-sm">{result.onlyA.length + result.onlyB.length + result.onlyAB.length} elements</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Only in A</p>
                      <p className="font-mono text-sm">{formatRegion(result.onlyA)}</p>
                      <p className="text-xs text-muted-foreground">({result.onlyA.length})</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Only in B</p>
                      <p className="font-mono text-sm">{formatRegion(result.onlyB)}</p>
                      <p className="text-xs text-muted-foreground">({result.onlyB.length})</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Only in C</p>
                      <p className="font-mono text-sm">{formatRegion(result.onlyC)}</p>
                      <p className="text-xs text-muted-foreground">({result.onlyC.length})</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">In A ∩ B only</p>
                      <p className="font-mono text-sm">{formatRegion(result.onlyAB)}</p>
                      <p className="text-xs text-muted-foreground">({result.onlyAB.length})</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">In A ∩ C only</p>
                      <p className="font-mono text-sm">{formatRegion(result.onlyAC)}</p>
                      <p className="text-xs text-muted-foreground">({result.onlyAC.length})</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">In B ∩ C only</p>
                      <p className="font-mono text-sm">{formatRegion(result.onlyBC)}</p>
                      <p className="text-xs text-muted-foreground">({result.onlyBC.length})</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">In A ∩ B ∩ C</p>
                      <p className="font-mono text-sm">{formatRegion(result.ABC)}</p>
                      <p className="text-xs text-muted-foreground">({result.ABC.length})</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Total in A ∪ B ∪ C</p>
                      <p className="font-mono text-sm">
                        {result.onlyA.length + result.onlyB.length + result.onlyC.length + 
                         result.onlyAB.length + result.onlyAC.length + result.onlyBC.length + 
                         result.ABC.length} elements
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Set Statistics</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">{parseSet(setA).length}</p>
                  <p className="text-xs text-muted-foreground">|A|</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">{parseSet(setB).length}</p>
                  <p className="text-xs text-muted-foreground">|B|</p>
                </div>
                {mode === "3set" && (
                  <div>
                    <p className="text-2xl font-bold">{parseSet(setC).length}</p>
                    <p className="text-xs text-muted-foreground">|C|</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is a Venn Diagram?</h2>
        <p className="text-muted-foreground">
          A Venn diagram is a visual representation of sets using overlapping circles or other shapes. Each circle represents a set, and the overlapping regions show the relationships between sets, such as intersections and unions.
        </p>
        <p className="text-muted-foreground">
          Venn diagrams were popularized by John Venn in the 1880s and are widely used in mathematics, logic, statistics, and computer science to illustrate set relationships.
        </p>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Venn Diagram Regions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">2-Set Diagram Regions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Only A: elements in A but not B</li>
              <li>• Only B: elements in B but not A</li>
              <li>• A ∩ B: elements in both A and B</li>
              <li>• A ∪ B: all elements in either set</li>
            </ul>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">3-Set Diagram Regions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Only A, Only B, Only C</li>
              <li>• A ∩ B only (not in C)</li>
              <li>• A ∩ C only (not in B)</li>
              <li>• B ∩ C only (not in A)</li>
              <li>• A ∩ B ∩ C (all three)</li>
              <li>• 7 distinct regions total</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Applications of Venn Diagrams</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Logic and Boolean Algebra</h3>
            <p className="text-sm text-muted-foreground">
              Visualizing logical operations AND, OR, NOT and their combinations.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Probability</h3>
            <p className="text-sm text-muted-foreground">
              Understanding joint probabilities, conditional probability, and independence.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Data Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Comparing datasets and finding common or unique elements.
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-2">Database Queries</h3>
            <p className="text-sm text-muted-foreground">
              Understanding JOIN operations and set-based queries.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8">
        <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What does the overlapping region represent?</h3>
            <p className="text-sm text-muted-foreground">
              The overlapping region represents the intersection of sets - elements that belong to all overlapping sets simultaneously.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">Can Venn diagrams have more than 3 sets?</h3>
            <p className="text-sm text-muted-foreground">
              Yes, but they become complex. 4-set Venn diagrams use ellipses, and higher numbers require more complex shapes or alternative visualizations.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">What if circles don't overlap?</h3>
            <p className="text-sm text-muted-foreground">
              Non-overlapping circles represent disjoint sets - sets with no common elements (their intersection is empty).
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold mb-2">How do I calculate the union using a Venn diagram?</h3>
            <p className="text-sm text-muted-foreground">
              The union is represented by the total area covered by all circles. Count all elements in any region of the diagram.
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
