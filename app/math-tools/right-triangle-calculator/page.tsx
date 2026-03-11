"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RightTriangleCalculator() {
  const [knownType, setKnownType] = useState<"two-sides" | "side-angle">("two-sides");
  const [sideA, setSideA] = useState<string>("");
  const [sideB, setSideB] = useState<string>("");
  const [hypotenuse, setHypotenuse] = useState<string>("");
  const [angle, setAngle] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculate = () => {
    setResult(null);
    setError("");

    if (knownType === "two-sides") {
      if (sideA && sideB) {
        const a = parseFloat(sideA);
        const b = parseFloat(sideB);
        if (a <= 0 || b <= 0) { setError("Sides must be positive"); return; }
        const c = Math.sqrt(a*a + b*b);
        const A = toDeg(Math.atan(a/b));
        const B = 90 - A;
        setResult({ sides: { a, b, c }, angles: { A, B, C: 90 }, area: 0.5*a*b, perimeter: a+b+c });
      } else if (sideA && hypotenuse) {
        const a = parseFloat(sideA);
        const c = parseFloat(hypotenuse);
        if (a <= 0 || c <= 0 || a >= c) { setError("Invalid values"); return; }
        const b = Math.sqrt(c*c - a*a);
        const A = toDeg(Math.asin(a/c));
        const B = 90 - A;
        setResult({ sides: { a, b, c }, angles: { A, B, C: 90 }, area: 0.5*a*b, perimeter: a+b+c });
      } else if (sideB && hypotenuse) {
        const b = parseFloat(sideB);
        const c = parseFloat(hypotenuse);
        if (b <= 0 || c <= 0 || b >= c) { setError("Invalid values"); return; }
        const a = Math.sqrt(c*c - b*b);
        const B = toDeg(Math.asin(b/c));
        const A = 90 - B;
        setResult({ sides: { a, b, c }, angles: { A, B, C: 90 }, area: 0.5*a*b, perimeter: a+b+c });
      } else {
        setError("Enter any two sides");
      }
    } else {
      if (sideA && angle) {
        const a = parseFloat(sideA);
        const A = parseFloat(angle);
        if (a <= 0 || A <= 0 || A >= 90) { setError("Invalid values"); return; }
        const B = 90 - A;
        const b = a / Math.tan(toRad(A));
        const c = a / Math.sin(toRad(A));
        setResult({ sides: { a, b, c }, angles: { A, B, C: 90 }, area: 0.5*a*b, perimeter: a+b+c });
      } else if (sideB && angle) {
        const b = parseFloat(sideB);
        const A = parseFloat(angle);
        if (b <= 0 || A <= 0 || A >= 90) { setError("Invalid values"); return; }
        const B = 90 - A;
        const a = b * Math.tan(toRad(A));
        const c = b / Math.cos(toRad(A));
        setResult({ sides: { a, b, c }, angles: { A, B, C: 90 }, area: 0.5*a*b, perimeter: a+b+c });
      } else if (hypotenuse && angle) {
        const c = parseFloat(hypotenuse);
        const A = parseFloat(angle);
        if (c <= 0 || A <= 0 || A >= 90) { setError("Invalid values"); return; }
        const B = 90 - A;
        const a = c * Math.sin(toRad(A));
        const b = c * Math.cos(toRad(A));
        setResult({ sides: { a, b, c }, angles: { A, B, C: 90 }, area: 0.5*a*b, perimeter: a+b+c });
      } else {
        setError("Enter one side and one acute angle");
      }
    }
  };

  const reset = () => { setSideA(""); setSideB(""); setHypotenuse(""); setAngle(""); setResult(null); setError(""); };

  const loadExample = (type: typeof knownType, values: { a?: string; b?: string; c?: string; angle?: string }) => {
    setKnownType(type);
    setSideA(values.a || "");
    setSideB(values.b || "");
    setHypotenuse(values.c || "");
    setAngle(values.angle || "");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Right Triangle Calculator - Solve Right Triangles Online</h1>
        <p className="text-muted-foreground">
          Solve any right triangle by entering two known values with our free online right triangle calculator. Find all sides, angles, area, and perimeter with clear step-by-step solutions.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label>Known Values</Label>
          <Select value={knownType} onValueChange={(v) => setKnownType(v as typeof knownType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="two-sides">Two Sides</SelectItem>
              <SelectItem value="side-angle">One Side and One Angle</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {knownType === "two-sides" ? (
          <div className="grid md:grid-cols-3 gap-4">
            <div><Label>Leg a</Label><Input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} placeholder="e.g., 3" /></div>
            <div><Label>Leg b</Label><Input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} placeholder="e.g., 4" /></div>
            <div><Label>Hypotenuse c</Label><Input type="number" value={hypotenuse} onChange={(e) => setHypotenuse(e.target.value)} placeholder="e.g., 5" /></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            <div><Label>Leg a</Label><Input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} placeholder="e.g., 5" /></div>
            <div><Label>Leg b</Label><Input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} placeholder="e.g., 12" /></div>
            <div><Label>Hypotenuse c</Label><Input type="number" value={hypotenuse} onChange={(e) => setHypotenuse(e.target.value)} placeholder="e.g., 13" /></div>
            <div><Label>Acute Angle A (°)</Label><Input type="number" value={angle} onChange={(e) => setAngle(e.target.value)} placeholder="e.g., 30" /></div>
          </div>
        )}

        {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>}
        <div className="flex flex-wrap gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("two-sides", { a: "3", b: "4" })}>3-4-? triangle</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("two-sides", { a: "5", c: "13" })}>5-?-13 triangle</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("two-sides", { b: "1", c: "2" })}>1-?-2 triangle</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("side-angle", { a: "10", angle: "30" })}>a=10, A=30°</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("side-angle", { b: "8", angle: "45" })}>b=8, A=45°</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("side-angle", { c: "20", angle: "60" })}>c=20, A=60°</Button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg"><h4 className="font-semibold text-sm mb-2">Sides</h4>
                <div className="font-mono">a = {result.sides.a.toFixed(4)}<br/>b = {result.sides.b.toFixed(4)}<br/>c = {result.sides.c.toFixed(4)}</div></div>
              <div className="p-4 bg-muted rounded-lg"><h4 className="font-semibold text-sm mb-2">Angles</h4>
                <div className="font-mono">A = {result.angles.A.toFixed(2)}°<br/>B = {result.angles.B.toFixed(2)}°<br/>C = 90°</div></div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Area</p><p className="text-2xl font-bold">{result.area.toFixed(4)}</p></div>
              <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Perimeter</p><p className="text-2xl font-bold">{result.perimeter.toFixed(4)}</p></div>
              <div className="p-4 bg-muted rounded-lg text-center"><p className="text-sm text-muted-foreground">Semiperimeter</p><p className="text-2xl font-bold">{(result.perimeter/2).toFixed(4)}</p></div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Right Triangles</h2>
        <p className="text-muted-foreground">
          A right triangle is a triangle with one 90° angle. The side opposite the right angle is called the hypotenuse - it's always the longest side. The other two sides are called legs. Right triangles are fundamental to trigonometry and appear everywhere in mathematics, science, and engineering.
        </p>
        <p className="text-muted-foreground">
          What makes right triangles special is the Pythagorean theorem and the trigonometric ratios (sine, cosine, tangent). These relationships let you find any missing side or angle when you know just two pieces of information.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Right Triangle Formulas</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Pythagorean Theorem</h4>
            <p className="font-mono text-sm mb-2">a² + b² = c²</p>
            <p className="text-xs text-muted-foreground">Relates the three sides. Use when you know two sides.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Trigonometric Ratios</h4>
            <p className="font-mono text-xs mb-2">sin A = a/c (opposite/hypotenuse)</p>
            <p className="font-mono text-xs mb-2">cos A = b/c (adjacent/hypotenuse)</p>
            <p className="font-mono text-xs">tan A = a/b (opposite/adjacent)</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Area</h4>
            <p className="font-mono text-sm mb-2">Area = ½ × a × b</p>
            <p className="text-xs text-muted-foreground">The legs form the base and height.</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Angle Sum</h4>
            <p className="font-mono text-sm mb-2">A + B + C = 180°</p>
            <p className="text-xs text-muted-foreground">Since C = 90°, we have A + B = 90°</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: The Classic 3-4-5 Triangle</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Given legs a=3 and b=4, find the hypotenuse and angles.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Using Pythagorean theorem:</div>
              <div>c² = 3² + 4² = 9 + 16 = 25</div>
              <div>c = √25 = 5</div>
              <div>tan A = 3/4 = 0.75</div>
              <div>A = arctan(0.75) ≈ 36.87°</div>
              <div>B = 90° - 36.87° = 53.13°</div>
              <div className="text-green-600 font-semibold">Sides: 3, 4, 5 | Angles: 36.87°, 53.13°, 90°</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Finding a Missing Leg</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Given leg a=5 and hypotenuse c=13, find the other leg and angles.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>b² = c² - a² = 169 - 25 = 144</div>
              <div>b = √144 = 12</div>
              <div>sin A = 5/13 ≈ 0.3846</div>
              <div>A = arcsin(0.3846) ≈ 22.62°</div>
              <div>B = 90° - 22.62° = 67.38°</div>
              <div className="text-green-600 font-semibold">This is the 5-12-13 Pythagorean triple!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Using an Angle</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Given leg a=10 and angle A=30°, find the other sides.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>B = 90° - 30° = 60°</div>
              <div>sin 30° = 10/c</div>
              <div>c = 10/sin 30° = 10/0.5 = 20</div>
              <div>tan 30° = 10/b</div>
              <div>b = 10/tan 30° = 10/0.577 ≈ 17.32</div>
              <div className="text-green-600 font-semibold">This is a 30-60-90 triangle!</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Real-World Application</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A ladder 15 feet long leans against a wall, reaching 12 feet up. How far is the base from the wall, and what angle does the ladder make with the ground?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>c = 15 ft (ladder), a = 12 ft (height)</div>
              <div>b² = 15² - 12² = 225 - 144 = 81</div>
              <div>b = 9 ft (distance from wall)</div>
              <div>sin A = 12/15 = 0.8</div>
              <div>A = arcsin(0.8) ≈ 53.13°</div>
              <div className="text-green-600 font-semibold">Base is 9 ft from wall, ladder angle is 53.13°</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Quick Fact</h3>
        <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg">
          <p className="text-sm">
            The 3-4-5 triangle was used by ancient Egyptian "rope stretchers" to create perfect right angles for building pyramids and temples. They'd tie knots in a rope at equal intervals, forming 12 segments, then arrange it into a 3-4-5 triangle. The angle opposite the 5-segment side is guaranteed to be exactly 90°. This practical geometry predates Pythagoras by over 2000 years!
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What are Pythagorean triples?</h4>
            <p className="text-sm text-muted-foreground">
              Sets of three whole numbers that satisfy a² + b² = c². Common examples: 3-4-5, 5-12-13, 8-15-17, 7-24-25. Any multiple also works (6-8-10, 9-12-15). These give "nice" right triangles with integer sides.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's special about 30-60-90 and 45-45-90 triangles?</h4>
            <p className="text-sm text-muted-foreground">
              These are special right triangles with predictable side ratios. 30-60-90: sides are 1 : √3 : 2. 45-45-90: sides are 1 : 1 : √2. Memorizing these ratios lets you solve these triangles instantly without a calculator.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can a right triangle have equal legs?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! That's a 45-45-90 triangle (isosceles right triangle). Both acute angles are 45°, and if each leg is 1, the hypotenuse is √2. This triangle appears when you cut a square diagonally.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I know which trig function to use?</h4>
            <p className="text-sm text-muted-foreground">
              Use SOH-CAH-TOA: Sine = Opposite/Hypotenuse, Cosine = Adjacent/Hypotenuse, Tangent = Opposite/Adjacent. Pick the function that uses the sides you know and the side you're looking for.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if I only know one side?</h4>
            <p className="text-sm text-muted-foreground">
              You need at least two pieces of information to solve a right triangle: either two sides, or one side and one acute angle. With only one side, there are infinitely many possible right triangles.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Where are right triangles used in real life?</h4>
            <p className="text-sm text-muted-foreground">
              Everywhere! Construction (roof slopes, stair angles), navigation (bearing calculations), physics (force components), computer graphics (3D rendering), surveying, astronomy (parallax), and any situation involving heights, distances, or angles.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/pythagorean-theorem-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Pythagorean Theorem</p>
            <p className="text-xs text-muted-foreground">Find missing sides</p>
          </a>
          <a href="/math-tools/triangle-solver" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Triangle Solver</p>
            <p className="text-xs text-muted-foreground">Solve any triangle</p>
          </a>
          <a href="/math-tools/trigonometry-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Trigonometry Calculator</p>
            <p className="text-xs text-muted-foreground">Sin, cos, tan calculations</p>
          </a>
        </div>
      </section>
    </div>
  );
}
