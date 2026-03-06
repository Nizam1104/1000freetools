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

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Pythagorean Theorem Calculator – Find Any Side of a Right Triangle</h1>
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

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
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

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">What is the Pythagorean Theorem?</h2>
        <p className="text-muted-foreground">
          The Pythagorean theorem states that in a right triangle, the square of the hypotenuse (the side opposite the right angle) equals the sum of the squares of the other two sides. This fundamental relationship has been known for over 2,500 years.
        </p>
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm font-medium mb-2">The Formula</p>
          <p className="text-lg font-mono">a² + b² = c²</p>
          <p className="text-sm text-muted-foreground mt-2">
            Where c is the hypotenuse, and a and b are the legs of the right triangle.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">How to Use the Pythagorean Theorem</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Finding the Hypotenuse</h3>
            <p className="text-sm text-muted-foreground mb-2">
              When you know both legs (a and b), find the hypotenuse using:
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">c = √(a² + b²)</code>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Finding a Missing Leg</h3>
            <p className="text-sm text-muted-foreground mb-2">
              When you know the hypotenuse and one leg, find the other leg using:
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">a = √(c² - b²)</code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Pythagorean Theorem Examples</h2>
        <div className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Example 1: Find the Hypotenuse</h3>
            <p className="text-sm text-muted-foreground mb-2">Given: a = 3, b = 4</p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              c² = 3² + 4² = 9 + 16 = 25<br />
              c = √25 = 5
            </code>
            <p className="text-sm text-muted-foreground mt-2">
              This is the famous 3-4-5 right triangle, one of the simplest Pythagorean triples.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Example 2: Find a Missing Leg</h3>
            <p className="text-sm text-muted-foreground mb-2">Given: c = 13, a = 5</p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              b² = 13² - 5² = 169 - 25 = 144<br />
              b = √144 = 12
            </code>
            <p className="text-sm text-muted-foreground mt-2">
              The 5-12-13 triangle is another common Pythagorean triple.
            </p>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Example 3: Real-World Application</h3>
            <p className="text-sm text-muted-foreground mb-2">
              A ladder leans against a wall. The base is 6 feet from the wall, and the ladder reaches 8 feet up. How long is the ladder?
            </p>
            <code className="text-sm font-mono bg-background px-2 py-1 rounded block">
              c² = 6² + 8² = 36 + 64 = 100<br />
              c = √100 = 10 feet
            </code>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Common Pythagorean Triples</h2>
        <p className="text-muted-foreground">
          Pythagorean triples are sets of three positive integers that satisfy a² + b² = c². These appear frequently in geometry problems.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3">a</th>
                <th className="text-left py-2 px-3">b</th>
                <th className="text-left py-2 px-3">c</th>
                <th className="text-left py-2 px-3">Verification</th>
              </tr>
            </thead>
            <tbody>
              {[
                [3, 4, 5, "9 + 16 = 25"],
                [5, 12, 13, "25 + 144 = 169"],
                [7, 24, 25, "49 + 576 = 625"],
                [8, 15, 17, "64 + 225 = 289"],
                [9, 40, 41, "81 + 1600 = 1681"],
                [11, 60, 61, "121 + 3600 = 3721"],
                [12, 35, 37, "144 + 1225 = 1369"],
                [20, 21, 29, "400 + 441 = 841"]
              ].map(([a, b, c, verify]) => (
                <tr key={a} className="border-b">
                  <td className="py-2 px-3 font-mono">{a}</td>
                  <td className="py-2 px-3 font-mono">{b}</td>
                  <td className="py-2 px-3 font-mono">{c}</td>
                  <td className="py-2 px-3 text-muted-foreground">{verify}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div>
          <h3 className="font-semibold mb-2">When can I use the Pythagorean theorem?</h3>
          <p className="text-sm text-muted-foreground">
            Only with right triangles. The theorem specifically relates to the 90-degree angle. For other triangles, you'll need the Law of Cosines or Law of Sines.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What if my answer has a decimal?</h3>
          <p className="text-sm text-muted-foreground">
            That's perfectly normal. Most right triangles don't have integer sides. For example, if a = 1 and b = 1, then c = √2 ≈ 1.414. You can leave it as a square root for exact answers or round for practical use.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Who discovered the Pythagorean theorem?</h3>
          <p className="text-sm text-muted-foreground">
            While named after the Greek mathematician Pythagoras (around 570-495 BCE), evidence shows the Babylonians and Indians knew this relationship centuries earlier. Pythagoras or his followers likely provided the first formal proof.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Can the Pythagorean theorem be used in 3D?</h3>
          <p className="text-sm text-muted-foreground">
            Yes. For a rectangular box with dimensions l, w, h, the space diagonal d is found using: d² = l² + w² + h². This extends the 2D theorem into three dimensions.
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-2">What's the converse of the Pythagorean theorem?</h3>
          <p className="text-sm text-muted-foreground">
            If a² + b² = c² for a triangle, then that triangle is a right triangle. You can use this to test whether a triangle has a right angle when you know all three sides.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-4">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/right-triangle-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Right Triangle Calculator</p>
            <p className="text-xs text-muted-foreground">Solve any right triangle</p>
          </a>
          <a href="/math-tools/triangle-solver" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Triangle Solver</p>
            <p className="text-xs text-muted-foreground">SSS, SAS, ASA, AAS</p>
          </a>
          <a href="/math-tools/distance-between-two-points-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Distance Calculator</p>
            <p className="text-xs text-muted-foreground">Distance formula</p>
          </a>
        </div>
      </section>
    </div>
  );
}
