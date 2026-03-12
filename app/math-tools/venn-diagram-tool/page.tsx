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
    <div className="w-full mx-auto space-y-8">
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

      <div className="mt-16 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">How the Venn Diagram Tool Works</h2>
          <p className="text-muted-foreground mb-4">
            A Venn diagram uses overlapping circles to visually represent the relationships between sets. Each circle represents a set, and the overlapping regions show where sets share common elements. This tool analyzes your input sets and breaks them down into distinct regions.
          </p>
          <p className="text-muted-foreground mb-4">
            For a <strong>2-set diagram</strong>, there are 4 regions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Only in A (elements unique to set A)</li>
            <li>Only in B (elements unique to set B)</li>
            <li>A ∩ B (intersection—elements in both A and B)</li>
            <li>Outside both (elements in neither set, from the universal set)</li>
          </ul>
          <p className="text-muted-foreground mb-4 mt-4">
            For a <strong>3-set diagram</strong>, there are 8 regions including A ∩ B ∩ C (the center where all three overlap). The tool calculates which elements belong in each region and displays the counts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Example Venn Diagram Analyses</h2>

          <h3 className="text-xl font-semibold mb-3 mt-6">2-Set Example: Even vs. Multiples of 3</h3>
          <p className="text-muted-foreground mb-2">
            A = {"{2, 4, 6, 8, 10, 12}"}, B = {"{3, 6, 9, 12, 15}"}
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Only in A: {"{2, 4, 8, 10}"}</p>
            <p>Only in B: {"{3, 9, 15}"}</p>
            <p>A ∩ B: {"{6, 12}"} (both even AND multiples of 3)</p>
            <p className="mt-2 text-muted-foreground">A ∪ B has 9 unique elements total</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">3-Set Example: Student Courses</h3>
          <p className="text-muted-foreground mb-2">
            Math = {"{Alice, Bob, Carol, David}"}, Science = {"{Bob, Carol, Eve, Frank}"}, Art = {"{Carol, David, Eve, Grace}"}
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Only Math: {"{Alice}"}</p>
            <p>Only Science: {"{Frank}"}</p>
            <p>Only Art: {"{Grace}"}</p>
            <p>Math ∩ Science only: {"{Bob}"}</p>
            <p>Math ∩ Art only: {"{David}"}</p>
            <p>Science ∩ Art only: {"{Eve}"}</p>
            <p>All three (A ∩ B ∩ C): {"{Carol}"}</p>
          </div>

          <h3 className="text-xl font-semibold mb-3 mt-6">Disjoint Sets (No Overlap)</h3>
          <p className="text-muted-foreground mb-2">
            A = {"{1, 2, 3}"}, B = {"{7, 8, 9}"}
          </p>
          <div className="bg-muted p-4 rounded-lg font-mono text-sm">
            <p>Only in A: {"{1, 2, 3}"}</p>
            <p>Only in B: {"{7, 8, 9}"}</p>
            <p>A ∩ B: ∅ (empty—no overlap)</p>
            <p className="mt-2 text-muted-foreground">Circles don&apos;t overlap in the diagram</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Quick Fact: Venn's Visual Revolution</h2>
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p className="text-muted-foreground">
              <strong>John Venn</strong> (1834-1923), a British logician and philosopher, introduced these diagrams in his 1880 paper "On the Diagrammatic and Mechanical Representation of Propositions and Reasonings." Interestingly, Venn called them "Eulerian Circles" because Swiss mathematician <strong>Leonhard Euler</strong> had used similar diagrams a century earlier. The name "Venn diagram" was coined by philosopher Clarence Irving Lewis in 1918. Venn was also an avid gardener who once won a prize at the Paris Exhibition for growing giant pumpkins, and he built a cricket-bowling machine that bowled out a top Australian player in 1909!
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">What does the overlapping region represent?</h3>
              <p className="text-muted-foreground">
                The overlapping region (intersection) contains elements that belong to <em>both</em> sets simultaneously. For example, if A = even numbers and B = multiples of 3, the overlap contains numbers that are both even AND multiples of 3 (like 6, 12, 18).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What's the difference between union and intersection?</h3>
              <p className="text-muted-foreground">
                The <strong>union</strong> (A ∪ B) includes everything in either circle—all elements from both sets combined. The <strong>intersection</strong> (A ∩ B) includes only the overlapping region—elements that are in both sets. Union = "or", Intersection = "and".
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">When should I use a 2-set vs. 3-set diagram?</h3>
              <p className="text-muted-foreground">
                Use a 2-set diagram when comparing two categories. Use a 3-set diagram when you need to analyze relationships among three categories and want to see the region where all three overlap. Beyond 3 sets, Venn diagrams become visually complex and harder to interpret.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What if my sets have no overlap?</h3>
              <p className="text-muted-foreground">
                Sets with no common elements are called <strong>disjoint</strong> or <strong>mutually exclusive</strong>. In a Venn diagram, the circles wouldn't overlap. The intersection would be the empty set (∅), and |A ∪ B| = |A| + |B|.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">How do I calculate the total number of elements?</h3>
              <p className="text-muted-foreground">
                For 2 sets: |A ∪ B| = |A| + |B| - |A ∩ B|. You subtract the intersection because those elements are counted twice. For the tool's output, simply add up all the region counts: Only A + Only B + Intersection = Total.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is the symmetric difference?</h3>
              <p className="text-muted-foreground">
                The symmetric difference (A △ B) contains elements that are in exactly one of the sets—not in both. It's "Only in A" plus "Only in B", excluding the intersection. Formula: A △ B = (A ∪ B) - (A ∩ B).
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Where are Venn diagrams used in real life?</h3>
              <p className="text-muted-foreground">
                Venn diagrams appear in data analysis (comparing customer segments), biology (comparing gene sets), marketing (overlapping target audiences), logic (visualizing syllogisms), and education (comparing concepts). They're excellent for any situation requiring visual comparison of groups.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
