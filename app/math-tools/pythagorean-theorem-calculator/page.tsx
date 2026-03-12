"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PythagoreanTheoremCalculator() {
  const [mode, setMode] = useState<"hypotenuse" | "leg">("hypotenuse");
  const [sideA, setSideA] = useState("");
  const [sideB, setSideB] = useState("");
  const [hypotenuse, setHypotenuse] = useState("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const calculate = () => {
    setError("");
    setResult(null);

    if (mode === "hypotenuse") {
      const a = parseFloat(sideA);
      const b = parseFloat(sideB);

      if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        setError("Please enter positive values for both sides");
        return;
      }

      const c = Math.sqrt(a * a + b * b);
      setResult({
        value: Math.round(c * 10000) / 10000,
        formula: `c = √(a² + b²) = √(${a}² + ${b}²) = √(${a * a} + ${b * b}) = √${a * a + b * b}`,
        steps: [
          `a² = ${a}² = ${a * a}`,
          `b² = ${b}² = ${b * b}`,
          `a² + b² = ${a * a} + ${b * b} = ${a * a + b * b}`,
          `c = √${a * a + b * b} ≈ ${Math.round(c * 10000) / 10000}`
        ]
      });
    } else {
      const c = parseFloat(hypotenuse);
      const knownLeg = parseFloat(sideA);

      if (isNaN(c) || isNaN(knownLeg) || c <= 0 || knownLeg <= 0) {
        setError("Please enter positive values");
        return;
      }

      if (c <= knownLeg) {
        setError("Hypotenuse must be longer than either leg");
        return;
      }

      const missingLeg = Math.sqrt(c * c - knownLeg * knownLeg);
      setResult({
        value: Math.round(missingLeg * 10000) / 10000,
        formula: `b = √(c² - a²) = √(${c}² - ${knownLeg}²) = √(${c * c} - ${knownLeg * knownLeg}) = √${c * c - knownLeg * knownLeg}`,
        steps: [
          `c² = ${c}² = ${c * c}`,
          `a² = ${knownLeg}² = ${knownLeg * knownLeg}`,
          `c² - a² = ${c * c} - ${knownLeg * knownLeg} = ${c * c - knownLeg * knownLeg}`,
          `b = √${c * c - knownLeg * knownLeg} ≈ ${Math.round(missingLeg * 10000) / 10000}`
        ]
      });
    }
  };

  const reset = () => {
    setSideA("");
    setSideB("");
    setHypotenuse("");
    setResult(null);
    setError("");
  };

  const loadExample = (m: typeof mode, a: string, b: string, h: string) => {
    setMode(m);
    setSideA(a);
    setSideB(b);
    setHypotenuse(h);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pythagorean Theorem Calculator - Find Any Side of a Right Triangle</h1>
        <p className="text-muted-foreground">
          Solve for any missing side of a right triangle using the Pythagorean theorem with our free online calculator. Enter two sides and instantly find the third with step-by-step working.
        </p>
      </div>

      <div className="space-y-4">
        <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
          <TabsList>
            <TabsTrigger value="hypotenuse">Find Hypotenuse</TabsTrigger>
            <TabsTrigger value="leg">Find Missing Leg</TabsTrigger>
          </TabsList>

          <TabsContent value="hypotenuse" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Side a</Label>
                <Input
                  type="number"
                  placeholder="Enter length of side a"
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                />
              </div>
              <div>
                <Label>Side b</Label>
                <Input
                  type="number"
                  placeholder="Enter length of side b"
                  value={sideB}
                  onChange={(e) => setSideB(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leg" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Known Leg (a or b)</Label>
                <Input
                  type="number"
                  placeholder="Enter length of known leg"
                  value={sideA}
                  onChange={(e) => setSideA(e.target.value)}
                />
              </div>
              <div>
                <Label>Hypotenuse (c)</Label>
                <Input
                  type="number"
                  placeholder="Enter length of hypotenuse"
                  value={hypotenuse}
                  onChange={(e) => setHypotenuse(e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("hypotenuse", "3", "4", "")}>3-4-? triangle</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("hypotenuse", "5", "12", "")}>5-12-? triangle</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("hypotenuse", "1", "1", "")}>1-1-? triangle</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("leg", "3", "", "5")}>?-4-5 triangle</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("leg", "8", "", "10")}>?-8-10 triangle</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("hypotenuse", "7", "24", "")}>7-24-? triangle</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="p-6 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground mb-2">Missing Side Length</p>
              <p className="text-5xl font-bold">{result.value}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Formula Used</h4>
              <code className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                {result.formula}
              </code>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Step-by-Step Solution</h4>
              <div className="space-y-2">
                {result.steps.map((step: string, index: number) => (
                  <code key={index} className="text-sm font-mono bg-muted px-3 py-2 rounded block">
                    {step}
                  </code>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding the Pythagorean Theorem</h2>
        <p className="text-muted-foreground">
          The Pythagorean theorem is one of the most famous and useful relationships in mathematics. It states that in a right triangle, the square of the hypotenuse (the side opposite the right angle) equals the sum of the squares of the other two sides.
        </p>
        <p className="text-muted-foreground">
          This 2,500-year-old theorem isn't just abstract math - it's used in construction, navigation, computer graphics, physics, and countless real-world applications. Every time you calculate a diagonal distance or check if a corner is square, you're using Pythagoras' discovery.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Pythagorean Theorem Formula</h3>
        <div className="p-4 bg-muted rounded-lg">
          <p className="font-mono text-center text-2xl mb-3">a² + b² = c²</p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>Where:</p>
            <p>• a and b are the lengths of the legs (the sides forming the right angle)</p>
            <p>• c is the length of the hypotenuse (the side opposite the right angle)</p>
            <p>• The hypotenuse is always the longest side</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Finding the Hypotenuse</h4>
            <p className="font-mono text-sm mb-2">c = √(a² + b²)</p>
            <p className="text-xs text-muted-foreground">When you know both legs, square them, add, then take the square root.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Finding a Leg</h4>
            <p className="font-mono text-sm mb-2">a = √(c² - b²)</p>
            <p className="text-xs text-muted-foreground">When you know the hypotenuse and one leg, subtract squares, then take the square root.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: The Classic 3-4-5 Triangle</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find the hypotenuse when the legs are 3 and 4.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>a = 3, b = 4</div>
              <div>c² = 3² + 4²</div>
              <div>c² = 9 + 16 = 25</div>
              <div>c = √25 = 5</div>
              <div className="text-green-600 font-semibold">The hypotenuse is 5 units</div>
              <div className="text-muted-foreground">This is the famous 3-4-5 right triangle used by carpenters!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Finding a Missing Leg</h4>
            <p className="text-sm text-muted-foreground mb-2">
              The hypotenuse is 13 and one leg is 5. Find the other leg.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>c = 13, a = 5</div>
              <div>b² = c² - a²</div>
              <div>b² = 13² - 5² = 169 - 25 = 144</div>
              <div>b = √144 = 12</div>
              <div className="text-green-600 font-semibold">The missing leg is 12 units</div>
              <div className="text-muted-foreground">Another Pythagorean triple: 5-12-13</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Real-World Application - Ladder Problem</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A 15-foot ladder leans against a wall. The base is 9 feet from the wall. How high up the wall does the ladder reach?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Hypotenuse (ladder) = 15 ft</div>
              <div>Base distance = 9 ft</div>
              <div>Height² = 15² - 9² = 225 - 81 = 144</div>
              <div>Height = √144 = 12 ft</div>
              <div className="text-green-600 font-semibold">The ladder reaches 12 feet up the wall</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Diagonal Distance</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A rectangular field is 100m by 75m. What's the diagonal distance across the field?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>a = 100m, b = 75m</div>
              <div>c² = 100² + 75² = 10,000 + 5,625 = 15,625</div>
              <div>c = √15,625 = 125m</div>
              <div className="text-green-600 font-semibold">The diagonal is 125 meters</div>
              <div className="text-muted-foreground">Walking diagonally saves 50m compared to walking the edges!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Non-Integer Result</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find the hypotenuse when legs are 1 and 1.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>a = 1, b = 1</div>
              <div>c² = 1² + 1² = 1 + 1 = 2</div>
              <div>c = √2 ≈ 1.4142</div>
              <div className="text-green-600 font-semibold">The hypotenuse is √2 (approximately 1.4142)</div>
              <div className="text-muted-foreground">This is an irrational number - the decimal never ends or repeats!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            Although named after Greek mathematician Pythagoras (570-495 BCE), the theorem was known to Babylonian mathematicians over 1,000 years earlier. A clay tablet called Plimpton 322 (1800 BCE) contains Pythagorean triples. The theorem has over 370 different proofs, including one by U.S. President James Garfield in 1876 - while he was still a Congressman!
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Does the Pythagorean theorem work for all triangles?</h4>
            <p className="text-sm text-muted-foreground">
              No, only for right triangles (triangles with a 90° angle). For other triangles, you need the Law of Cosines, which is a generalization of the Pythagorean theorem. If the triangle isn't right, a² + b² ≠ c².
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What are Pythagorean triples?</h4>
            <p className="text-sm text-muted-foreground">
              Sets of three whole numbers that satisfy a² + b² = c². Common examples: 3-4-5, 5-12-13, 8-15-17, 7-24-25. Any multiple also works (6-8-10, 9-12-15). These are useful for quick mental calculations.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I know which side is the hypotenuse?</h4>
            <p className="text-sm text-muted-foreground">
              The hypotenuse is always opposite the right angle and is always the longest side. In diagrams, it's often labeled 'c'. If you're not sure which angle is 90°, the hypotenuse is the side that doesn't touch the right angle.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the result be a decimal or irrational number?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! Most right triangles don't have whole number sides. For example, if both legs are 1, the hypotenuse is √2, which is irrational (approximately 1.41421356...). The decimal goes on forever without repeating.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the converse of the Pythagorean theorem?</h4>
            <p className="text-sm text-muted-foreground">
              If a² + b² = c² for a triangle's sides, then the triangle MUST be a right triangle. This lets you test if a triangle is right-angled without measuring angles. Useful in construction for checking square corners.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where is the Pythagorean theorem used in real life?</h4>
            <p className="text-sm text-muted-foreground">
              Construction (checking square corners, calculating roof slopes), navigation (shortest distance), surveying, computer graphics (distance between pixels), physics (vector components), GPS triangulation, and anywhere diagonal distances matter.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
