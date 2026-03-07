"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PythagoreanTheoremCalculator() {
  const [a, setA] = useState<string>("");
  const [b, setB] = useState<string>("");
  const [c, setC] = useState<string>("");
  const [result, setResult] = useState<{ side: string; value: number; steps: string[] } | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    setError("");
    const aVal = a ? parseFloat(a) : null;
    const bVal = b ? parseFloat(b) : null;
    const cVal = c ? parseFloat(c) : null;

    const steps: string[] = [];
    steps.push("Pythagorean Theorem: a² + b² = c²");
    steps.push("");

    if (aVal && bVal && !c) {
      const cCalc = Math.sqrt(aVal * aVal + bVal * bVal);
      steps.push(`Given: a = ${aVal}, b = ${bVal}`);
      steps.push(`c² = a² + b² = ${aVal}² + ${bVal}²`);
      steps.push(`c² = ${aVal * aVal} + ${bVal * bVal} = ${aVal * aVal + bVal * bVal}`);
      steps.push(`c = √${aVal * aVal + bVal * bVal} ≈ ${cCalc.toFixed(4)}`);
      setResult({ side: "c (hypotenuse)", value: cCalc, steps });
    } else if (aVal && cVal && !b && cVal > aVal) {
      const bCalc = Math.sqrt(cVal * cVal - aVal * aVal);
      steps.push(`Given: a = ${aVal}, c = ${cVal}`);
      steps.push(`b² = c² - a² = ${cVal}² - ${aVal}²`);
      steps.push(`b² = ${cVal * cVal} - ${aVal * aVal} = ${cVal * cVal - aVal * aVal}`);
      steps.push(`b = √${cVal * cVal - aVal * aVal} ≈ ${bCalc.toFixed(4)}`);
      setResult({ side: "b (leg)", value: bCalc, steps });
    } else if (bVal && cVal && !a && cVal > bVal) {
      const aCalc = Math.sqrt(cVal * cVal - bVal * bVal);
      steps.push(`Given: b = ${bVal}, c = ${cVal}`);
      steps.push(`a² = c² - b² = ${cVal}² - ${bVal}²`);
      steps.push(`a² = ${cVal * cVal} - ${bVal * bVal} = ${cVal * cVal - bVal * bVal}`);
      steps.push(`a = √${cVal * cVal - bVal * bVal} ≈ ${aCalc.toFixed(4)}`);
      setResult({ side: "a (leg)", value: aCalc, steps });
    } else {
      if (!aVal && !bVal && !cVal) {
        setError("Please enter at least two sides");
      } else if (aVal && bVal && cVal) {
        setError("Leave one side empty to calculate it");
      } else if ((aVal && cVal && cVal <= aVal) || (bVal && cVal && cVal <= bVal)) {
        setError("Hypotenuse must be longer than either leg");
      } else {
        setError("Please enter exactly two known sides");
      }
    }
  };

  const reset = () => {
    setA("");
    setB("");
    setC("");
    setResult(null);
    setError("");
  };

  const loadExample = (example: { a?: string; b?: string; c?: string }) => {
    setA(example.a || "");
    setB(example.b || "");
    setC(example.c || "");
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

      <Card>
        <CardHeader>
          <CardTitle>Pythagorean Theorem Calculator</CardTitle>
          <CardDescription>
            Enter two known sides to calculate the missing side.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-muted rounded-lg text-center">
              <div className="font-mono text-2xl font-semibold">a² + b² = c²</div>
              <p className="text-sm text-muted-foreground mt-2">c is the hypotenuse (longest side)</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <Label>Side a (leg)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 3"
                  step="any"
                  value={a}
                  onChange={(e) => setA(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && calculate()}
                />
              </div>
              <div>
                <Label>Side b (leg)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 4"
                  step="any"
                  value={b}
                  onChange={(e) => setB(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && calculate()}
                />
              </div>
              <div>
                <Label>Side c (hypotenuse)</Label>
                <Input
                  type="number"
                  placeholder="e.g., 5"
                  step="any"
                  value={c}
                  onChange={(e) => setC(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && calculate()}
                />
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              Enter any two sides. Leave the side you want to find empty.
            </p>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ a: "3", b: "4" })}>
                3-4-? (Classic)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ a: "5", b: "12" })}>
                5-12-?
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ a: "8", c: "17" })}>
                8-?-17
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ b: "7", c: "25" })}>
                ?-7-25
              </Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Missing Side: {result.side}</p>
                  <p className="text-5xl font-bold">{result.value.toFixed(4)}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {Number.isInteger(result.value) ? result.value : `${result.value.toFixed(2)} (rounded)`}
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
                  <div className="space-y-2 text-sm font-mono">
                    {result.steps.map((step, i) => (
                      <div key={i} className={step === "" ? "h-2" : ""}>
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding the Pythagorean Theorem</h2>
          <p className="text-muted-foreground">
            The Pythagorean theorem is one of the most fundamental relationships in geometry. It states that in a right triangle, the square of the hypotenuse (the side opposite the right angle) equals the sum of the squares of the other two sides. Simple to state, endlessly useful.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            This calculator solves for any missing side. Enter the two sides you know, and it'll find the third – showing each step along the way. Whether you're checking homework, sizing a TV, or figuring out ladder placement, the math happens instantly.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Formula</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-3xl text-center mb-4">a² + b² = c²</div>
          <p className="text-sm text-muted-foreground text-center">
            Where <strong>c</strong> is always the hypotenuse (longest side, opposite the 90° angle) and <strong>a</strong> and <strong>b</strong> are the legs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Finding the Hypotenuse</h4>
            <div className="font-mono text-sm bg-muted p-2 rounded mb-2">c = √(a² + b²)</div>
            <p className="text-xs text-muted-foreground">Add the squares of both legs, then take the square root.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Finding Leg a</h4>
            <div className="font-mono text-sm bg-muted p-2 rounded mb-2">a = √(c² - b²)</div>
            <p className="text-xs text-muted-foreground">Subtract the square of the known leg from the hypotenuse squared.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Finding Leg b</h4>
            <div className="font-mono text-sm bg-muted p-2 rounded mb-2">b = √(c² - a²)</div>
            <p className="text-xs text-muted-foreground">Same process – subtract the known leg from the hypotenuse squared.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Pythagorean Triples</h3>
        <p className="text-muted-foreground">
          Pythagorean triples are sets of three whole numbers that satisfy a² + b² = c². These create right triangles with integer side lengths – no decimals, no rounding.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm border">
            <thead>
              <tr className="bg-muted">
                <th className="text-left py-3 px-4 font-semibold border-b">Side a</th>
                <th className="text-left py-3 px-4 font-semibold border-b">Side b</th>
                <th className="text-left py-3 px-4 font-semibold border-b">Hypotenuse c</th>
                <th className="text-left py-3 px-4 font-semibold border-b">Verification</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">3</td>
                <td className="py-3 px-4 font-mono">4</td>
                <td className="py-3 px-4 font-mono">5</td>
                <td className="py-3 px-4 font-mono text-xs">9 + 16 = 25 ✓</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">5</td>
                <td className="py-3 px-4 font-mono">12</td>
                <td className="py-3 px-4 font-mono">13</td>
                <td className="py-3 px-4 font-mono text-xs">25 + 144 = 169 ✓</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">8</td>
                <td className="py-3 px-4 font-mono">15</td>
                <td className="py-3 px-4 font-mono">17</td>
                <td className="py-3 px-4 font-mono text-xs">64 + 225 = 289 ✓</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">7</td>
                <td className="py-3 px-4 font-mono">24</td>
                <td className="py-3 px-4 font-mono">25</td>
                <td className="py-3 px-4 font-mono text-xs">49 + 576 = 625 ✓</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">9</td>
                <td className="py-3 px-4 font-mono">40</td>
                <td className="py-3 px-4 font-mono">41</td>
                <td className="py-3 px-4 font-mono text-xs">81 + 1600 = 1681 ✓</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4 font-mono">12</td>
                <td className="py-3 px-4 font-mono">35</td>
                <td className="py-3 px-4 font-mono">37</td>
                <td className="py-3 px-4 font-mono text-xs">144 + 1225 = 1369 ✓</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground">
          Multiples of these triples also work. For example, doubling (3, 4, 5) gives (6, 8, 10), which is also a valid right triangle.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Real-World Applications</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Construction and Carpentry</h4>
            <p className="text-sm text-muted-foreground">
              Builders use the 3-4-5 rule to ensure corners are perfectly square. Measure 3 feet along one wall, 4 feet along the other – if the diagonal is exactly 5 feet, the corner is a perfect 90 degrees. This works because 3² + 4² = 5².
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">TV and Monitor Sizing</h4>
            <p className="text-sm text-muted-foreground">
              Screens are measured diagonally. A 55-inch TV with a 16:9 aspect ratio has a width of about 47.9 inches and height of 27 inches. The diagonal (55") is the hypotenuse of that right triangle.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Ladder Placement</h4>
            <p className="text-sm text-muted-foreground">
              Need to reach a 12-foot roof? If you place the ladder base 5 feet from the wall, you need a 13-foot ladder (5² + 12² = 13²). Safety guidelines often recommend a 4:1 ratio – for every 4 feet up, move the base 1 foot out.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Navigation and GPS</h4>
            <p className="text-sm text-muted-foreground">
              The distance formula used in GPS and mapping is based on the Pythagorean theorem. To find the straight-line distance between two points, you're essentially calculating the hypotenuse of a right triangle formed by the coordinate differences.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Computer Graphics</h4>
            <p className="text-sm text-muted-foreground">
              Video games use the theorem constantly – calculating distances between objects, determining if characters are in range, collision detection, camera positioning. Every time a game checks if you're close enough to interact with something, it's using a² + b² = c².
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the Pythagorean theorem?</h4>
            <p className="text-sm text-muted-foreground">
              The Pythagorean theorem states that in a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: a² + b² = c². It only works for right triangles – triangles with one 90-degree angle.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I identify the hypotenuse?</h4>
            <p className="text-sm text-muted-foreground">
              The hypotenuse is always the longest side and sits opposite the right angle (90°). In the formula a² + b² = c², c is always the hypotenuse. The other two sides (a and b) are called legs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use this for non-right triangles?</h4>
            <p className="text-sm text-muted-foreground">
              No. For non-right triangles, you need the Law of Cosines: c² = a² + b² - 2ab·cos(C). The Pythagorean theorem only applies when one angle is exactly 90 degrees. For oblique triangles, you'll need different formulas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does the theorem work?</h4>
            <p className="text-sm text-muted-foreground">
              There are hundreds of proofs. One intuitive approach: arrange four identical right triangles to form a square. The empty space in the middle has area c². Rearrange the same triangles, and the empty space becomes two squares with areas a² and b². Same total area, so a² + b² = c².
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Who discovered the Pythagorean theorem?</h4>
            <p className="text-sm text-muted-foreground">
              Although named after Greek mathematician Pythagoras (570-495 BCE), the relationship was known much earlier. Babylonian tablets from 1800 BCE show knowledge of Pythagorean triples. Pythagoras or his followers likely provided the first formal proof.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if my answer has a decimal?</h4>
            <p className="text-sm text-muted-foreground">
              Most right triangles don't have integer sides. If you get a decimal, that's normal. For example, a triangle with legs 1 and 1 has hypotenuse √2 ≈ 1.414. This is an irrational number – it can't be written as a simple fraction.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <a href="/calculators/distance-formula-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Distance Formula Calculator</p>
            <p className="text-xs text-muted-foreground">Distance between points</p>
          </a>
          <a href="/calculators/triangle-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Triangle Calculator</p>
            <p className="text-xs text-muted-foreground">Complete triangle solver</p>
          </a>
        </div>
      </section>
    </div>
  );
}
