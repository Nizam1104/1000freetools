"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Mode = "angles" | "sides" | "twoSidesOneAngle";

export default function AngleCalculator() {
  const [mode, setMode] = useState<Mode>("angles");
  const [angleA, setAngleA] = useState<string>("");
  const [angleB, setAngleB] = useState<string>("");
  const [angleC, setAngleC] = useState<string>("");
  const [sideA, setSideA] = useState<string>("");
  const [sideB, setSideB] = useState<string>("");
  const [sideC, setSideC] = useState<string>("");
  const [result, setResult] = useState<{ angles: { A: number; B: number; C: number }; sides?: { a: number; b: number; c: number }; steps: string[] } | null>(null);
  const [error, setError] = useState<string>("");

  const calculateFromAngles = () => {
    const A = parseFloat(angleA);
    const B = parseFloat(angleB);
    const C = parseFloat(angleC);

    const steps: string[] = [];
    steps.push("Triangle Angle Sum Theorem: A + B + C = 180°");
    steps.push("");

    // Case 1: Find third angle given two angles
    if (A && B && !angleC) {
      const calcC = 180 - A - B;
      if (calcC <= 0) {
        setError("Invalid angles: they must sum to less than 180°");
        return;
      }
      steps.push(`Given: A = ${A}°, B = ${B}°`);
      steps.push(`C = 180° - A - B = 180° - ${A}° - ${B}°`);
      steps.push(`C = ${calcC}°`);
      setResult({ angles: { A, B, C: calcC }, steps });
    } else if (A && !angleB && C) {
      const calcB = 180 - A - C;
      if (calcB <= 0) {
        setError("Invalid angles: they must sum to less than 180°");
        return;
      }
      steps.push(`Given: A = ${A}°, C = ${C}°`);
      steps.push(`B = 180° - A - C = 180° - ${A}° - ${C}°`);
      steps.push(`B = ${calcB}°`);
      setResult({ angles: { A, B: calcB, C }, steps });
    } else if (!angleA && B && C) {
      const calcA = 180 - B - C;
      if (calcA <= 0) {
        setError("Invalid angles: they must sum to less than 180°");
        return;
      }
      steps.push(`Given: B = ${B}°, C = ${C}°`);
      steps.push(`A = 180° - B - C = 180° - ${B}° - ${C}°`);
      steps.push(`A = ${calcA}°`);
      setResult({ angles: { A: calcA, B, C }, steps });
    } else if (A && B && C) {
      const sum = A + B + C;
      if (Math.abs(sum - 180) < 0.01) {
        steps.push(`Given: A = ${A}°, B = ${B}°, C = ${C}°`);
        steps.push(`Verification: ${A}° + ${B}° + ${C}° = ${sum}° ✓`);
        steps.push(`The angles form a valid triangle.`);
        setResult({ angles: { A, B, C }, steps });
      } else {
        setError(`Invalid triangle: angles sum to ${sum}°, not 180°`);
      }
    } else {
      setError("Please enter exactly two angles to find the third");
    }
  };

  const calculateFromSides = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (!a || !b || !c) {
      setError("Please enter all three sides");
      return;
    }

    // Triangle inequality check
    if (a + b <= c || a + c <= b || b + c <= a) {
      setError("These sides do not form a valid triangle");
      return;
    }

    const steps: string[] = [];
    steps.push("Law of Cosines: c² = a² + b² - 2ab·cos(C)");
    steps.push("");
    steps.push(`Given sides: a = ${a}, b = ${b}, c = ${c}`);
    steps.push("");

    // Calculate angles using Law of Cosines
    const A = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
    const B = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
    const C = Math.acos((a * a + b * b - c * c) / (2 * a * b)) * (180 / Math.PI);

    steps.push("Using Law of Cosines to find each angle:");
    steps.push("");
    steps.push(`Angle A = arccos((b² + c² - a²) / 2bc)`);
    steps.push(`A = arccos((${b}² + ${c}² - ${a}²) / (2 × ${b} × ${c}))`);
    steps.push(`A = arccos(${(b * b + c * c - a * a).toFixed(4)} / ${(2 * b * c).toFixed(4)})`);
    steps.push(`A = ${A.toFixed(2)}°`);
    steps.push("");
    steps.push(`Angle B = arccos((a² + c² - b²) / 2ac)`);
    steps.push(`B = ${B.toFixed(2)}°`);
    steps.push("");
    steps.push(`Angle C = arccos((a² + b² - c²) / 2ab)`);
    steps.push(`C = ${C.toFixed(2)}°`);
    steps.push("");
    steps.push(`Verification: ${A.toFixed(2)}° + ${B.toFixed(2)}° + ${C.toFixed(2)}° = ${(A + B + C).toFixed(2)}° ≈ 180°`);

    setResult({ angles: { A, B, C }, sides: { a, b, c }, steps });
  };

  const calculateTwoSidesOneAngle = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const C = parseFloat(angleC);

    if (!a || !b || !C) {
      setError("Please enter two sides and the included angle");
      return;
    }

    const steps: string[] = [];
    steps.push("Solving triangle with SAS (Side-Angle-Side)");
    steps.push("");
    steps.push(`Given: a = ${a}, b = ${b}, C = ${C}°`);
    steps.push("");

    // Convert C to radians
    const Crad = C * Math.PI / 180;

    // Find side c using Law of Cosines
    const c = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(Crad));

    steps.push("Step 1: Find side c using Law of Cosines");
    steps.push(`c² = a² + b² - 2ab·cos(C)`);
    steps.push(`c² = ${a}² + ${b}² - 2(${a})(${b})·cos(${C}°)`);
    steps.push(`c² = ${a * a} + ${b * b} - ${2 * a * b}·${Math.cos(Crad).toFixed(4)}`);
    steps.push(`c² = ${(a * a + b * b - 2 * a * b * Math.cos(Crad)).toFixed(4)}`);
    steps.push(`c = ${c.toFixed(4)}`);
    steps.push("");

    // Find angles A and B using Law of Sines
    const sinC = Math.sin(Crad);
    const Asin = (a * sinC) / c;
    const Bsin = (b * sinC) / c;

    const A = Math.asin(Asin) * (180 / Math.PI);
    const B = Math.asin(Bsin) * (180 / Math.PI);

    steps.push("Step 2: Find angle A using Law of Sines");
    steps.push(`sin(A)/a = sin(C)/c`);
    steps.push(`A = arcsin(a × sin(C) / c)`);
    steps.push(`A = ${A.toFixed(2)}°`);
    steps.push("");
    steps.push("Step 3: Find angle B");
    steps.push(`B = 180° - A - C`);
    steps.push(`B = 180° - ${A.toFixed(2)}° - ${C}°`);
    steps.push(`B = ${(180 - A - C).toFixed(2)}°`);

    setResult({ angles: { A, B, C }, sides: { a, b, c }, steps });
  };

  const calculate = () => {
    setError("");
    setResult(null);

    if (mode === "angles") {
      calculateFromAngles();
    } else if (mode === "sides") {
      calculateFromSides();
    } else {
      calculateTwoSidesOneAngle();
    }
  };

  const reset = () => {
    setAngleA("");
    setAngleB("");
    setAngleC("");
    setSideA("");
    setSideB("");
    setSideC("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Triangle Angle Calculator – Find Missing Angles in a Triangle</h1>
        <p className="text-muted-foreground">
          Find any missing angle in a triangle with our free online angle calculator. Enter known angles or sides and instantly solve for the remaining angles using trigonometry rules.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Triangle Angle Calculator</CardTitle>
          <CardDescription>
            Select a calculation mode and enter known values.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Calculation Mode</Label>
              <Select value={mode} onValueChange={(v) => { setMode(v as Mode); setResult(null); setError(""); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="angles">Find Missing Angle (from angles)</SelectItem>
                  <SelectItem value="sides">Find Angles (from 3 sides)</SelectItem>
                  <SelectItem value="twoSidesOneAngle">Solve Triangle (2 sides + included angle)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "angles" && (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-2">Triangle Angle Sum Theorem</div>
                  <div className="font-mono text-lg">A + B + C = 180°</div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label>Angle A (°)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 60"
                      step="any"
                      value={angleA}
                      onChange={(e) => setAngleA(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Angle B (°)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 70"
                      step="any"
                      value={angleB}
                      onChange={(e) => setAngleB(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Angle C (°)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 50"
                      step="any"
                      value={angleC}
                      onChange={(e) => setAngleC(e.target.value)}
                    />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Enter two angles to find the third, or all three to verify.
                </p>
              </>
            )}

            {mode === "sides" && (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-2">Law of Cosines</div>
                  <div className="font-mono text-sm">c² = a² + b² - 2ab·cos(C)</div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label>Side a</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 5"
                      step="any"
                      value={sideA}
                      onChange={(e) => setSideA(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Side b</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 7"
                      step="any"
                      value={sideB}
                      onChange={(e) => setSideB(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Side c</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 8"
                      step="any"
                      value={sideC}
                      onChange={(e) => setSideC(e.target.value)}
                    />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Enter all three sides to calculate all angles.
                </p>
              </>
            )}

            {mode === "twoSidesOneAngle" && (
              <>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="font-semibold text-sm mb-2">SAS Triangle Solution</div>
                  <div className="font-mono text-xs">Use Law of Cosines to find third side, then Law of Sines for angles</div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label>Side a</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 6"
                      step="any"
                      value={sideA}
                      onChange={(e) => setSideA(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Side b</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 8"
                      step="any"
                      value={sideB}
                      onChange={(e) => setSideB(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Included Angle C (°)</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 60"
                      step="any"
                      value={angleC}
                      onChange={(e) => setAngleC(e.target.value)}
                    />
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Enter two sides and the angle between them.
                </p>
              </>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Angle A</p>
                    <p className="text-3xl font-bold">{result.angles.A.toFixed(2)}°</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Angle B</p>
                    <p className="text-3xl font-bold">{result.angles.B.toFixed(2)}°</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Angle C</p>
                    <p className="text-3xl font-bold">{result.angles.C.toFixed(2)}°</p>
                  </div>
                </div>

                {result.sides && (
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">Side a</p>
                      <p className="text-xl font-semibold">{result.sides.a}</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">Side b</p>
                      <p className="text-xl font-semibold">{result.sides.b}</p>
                    </div>
                    <div className="p-4 border rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">Side c</p>
                      <p className="text-xl font-semibold">{result.sides.c}</p>
                    </div>
                  </div>
                )}

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
          <h2 className="text-2xl font-semibold mb-3">Understanding Triangle Angles</h2>
          <p className="text-muted-foreground">
            Every triangle has three angles that always add up to 180 degrees. This fundamental rule – the Triangle Angle Sum Theorem – lets you find any missing angle when you know the other two. But triangles can be solved in multiple ways depending on what information you have.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            This calculator handles three common scenarios: finding a missing angle from two known angles, calculating all angles when you know all three sides (using the Law of Cosines), or solving a triangle when you have two sides and the angle between them. Each method is shown step by step.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Triangle Angle Methods</h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg">
            <h4 className="font-semibold mb-3">AA (Angle-Angle)</h4>
            <div className="p-3 bg-muted rounded-lg font-mono text-sm mb-3">A + B + C = 180°</div>
            <p className="text-sm text-muted-foreground">
              Given two angles, subtract their sum from 180° to find the third. This is the simplest case and works for any triangle.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h4 className="font-semibold mb-3">SSS (Side-Side-Side)</h4>
            <div className="p-3 bg-muted rounded-lg font-mono text-xs mb-3">cos(C) = (a² + b² - c²) / 2ab</div>
            <p className="text-sm text-muted-foreground">
              Given three sides, use the Law of Cosines to find each angle. The sides must satisfy the triangle inequality.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h4 className="font-semibold mb-3">SAS (Side-Angle-Side)</h4>
            <div className="p-3 bg-muted rounded-lg font-mono text-xs mb-3">c² = a² + b² - 2ab·cos(C)</div>
            <p className="text-sm text-muted-foreground">
              Given two sides and the included angle, first find the third side using Law of Cosines, then use Law of Sines for remaining angles.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Types of Triangles by Angles</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Acute Triangle</h4>
            <p className="text-sm text-muted-foreground mb-3">All three angles are less than 90°.</p>
            <div className="text-xs text-muted-foreground">Example: 60°, 70°, 50°</div>
          </div>
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Right Triangle</h4>
            <p className="text-sm text-muted-foreground mb-3">One angle is exactly 90°. The other two angles are complementary (sum to 90°).</p>
            <div className="text-xs text-muted-foreground">Example: 90°, 30°, 60°</div>
          </div>
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Obtuse Triangle</h4>
            <p className="text-sm text-muted-foreground mb-3">One angle is greater than 90°. Only one angle can be obtuse.</p>
            <div className="text-xs text-muted-foreground">Example: 120°, 30°, 30°</div>
          </div>
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Equiangular Triangle</h4>
            <p className="text-sm text-muted-foreground mb-3">All three angles are equal. Each angle is exactly 60°.</p>
            <div className="text-xs text-muted-foreground">Example: 60°, 60°, 60°</div>
          </div>
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Isosceles Triangle</h4>
            <p className="text-sm text-muted-foreground mb-3">At least two angles are equal. The equal sides have equal opposite angles.</p>
            <div className="text-xs text-muted-foreground">Example: 70°, 70°, 40°</div>
          </div>
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-2">Scalene Triangle</h4>
            <p className="text-sm text-muted-foreground mb-3">All three angles are different. All three sides have different lengths.</p>
            <div className="text-xs text-muted-foreground">Example: 50°, 60°, 70°</div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Key Formulas</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Triangle Angle Sum Theorem</h4>
            <div className="p-3 bg-muted rounded-lg font-mono text-center mb-2">A + B + C = 180°</div>
            <p className="text-sm text-muted-foreground">
              The foundation of triangle geometry. Use this when you know two angles and need the third.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Law of Cosines</h4>
            <div className="grid sm:grid-cols-3 gap-2 p-3 bg-muted rounded-lg font-mono text-xs mb-2">
              <div>c² = a² + b² - 2ab·cos(C)</div>
              <div>a² = b² + c² - 2bc·cos(A)</div>
              <div>b² = a² + c² - 2ac·cos(B)</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Generalizes the Pythagorean theorem for any triangle. Use when you know all three sides (SSS) or two sides and the included angle (SAS).
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Law of Sines</h4>
            <div className="p-3 bg-muted rounded-lg font-mono text-center mb-2">sin(A)/a = sin(B)/b = sin(C)/c</div>
            <p className="text-sm text-muted-foreground">
              Relates angles to their opposite sides. Useful when you know one angle-side pair and want to find another angle or side.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do triangle angles add to 180 degrees?</h4>
            <p className="text-sm text-muted-foreground">
              Draw a line parallel to one side through the opposite vertex. The alternate interior angles formed are equal to the triangle's base angles. These three angles form a straight line, which is 180°. This proof works for any triangle in Euclidean geometry.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can a triangle have two right angles?</h4>
            <p className="text-sm text-muted-foreground">
              No. Two right angles would sum to 180°, leaving 0° for the third angle – impossible. A triangle can have at most one right angle or one obtuse angle.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if I only know one angle?</h4>
            <p className="text-sm text-muted-foreground">
              One angle alone isn't enough to determine a unique triangle. You need at least one side length, or two angles, or two sides. With only one angle, infinitely many triangles are possible.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find angles in a right triangle?</h4>
            <p className="text-sm text-muted-foreground">
              One angle is 90°. If you know one acute angle, subtract it from 90° to find the other. If you know sides, use trigonometric ratios: sin, cos, or tan, then use inverse functions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the triangle inequality?</h4>
            <p className="text-sm text-muted-foreground">
              For three lengths to form a triangle, the sum of any two sides must exceed the third side. If a + b ≤ c (or any similar combination), those lengths cannot form a triangle.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When do I use Law of Cosines vs Law of Sines?</h4>
            <p className="text-sm text-muted-foreground">
              Use Law of Cosines for SSS (three sides) or SAS (two sides + included angle). Use Law of Sines for AAS, ASA, or SSA (when you have an angle-side pair and want to find another angle or side).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/calculators/pythagorean-theorem-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Pythagorean Theorem</p>
            <p className="text-xs text-muted-foreground">Right triangle solver</p>
          </a>
          <a href="/math-tools/triangle-area-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Triangle Area Calculator</p>
            <p className="text-xs text-muted-foreground">Triangle area</p>
          </a>
          <a href="/calculators/law-of-cosines-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Law of Cosines Calculator</p>
            <p className="text-xs text-muted-foreground">SAS and SSS triangles</p>
          </a>
        </div>
      </section>
    </div>
  );
}
