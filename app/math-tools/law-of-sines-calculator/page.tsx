"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LawOfSinesCalculator() {
  const [knownType, setKnownType] = useState<"asa" | "aas" | "ssa">("asa");
  const [angleA, setAngleA] = useState<string>("");
  const [angleB, setAngleB] = useState<string>("");
  const [sideA, setSideA] = useState<string>("");
  const [sideB, setSideB] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculate = () => {
    setResult(null);
    setError("");

    if (knownType === "asa" || knownType === "aas") {
      const A = parseFloat(angleA);
      const B = parseFloat(angleB);
      const a = parseFloat(sideA);

      if (isNaN(A) || isNaN(B) || isNaN(a) || A <= 0 || B <= 0 || a <= 0) {
        setError("Please enter valid positive values");
        return;
      }

      if (A + B >= 180) {
        setError("Sum of two angles must be less than 180°");
        return;
      }

      const C = 180 - A - B;
      const b = (a * Math.sin(toRad(B))) / Math.sin(toRad(A));
      const c = (a * Math.sin(toRad(C))) / Math.sin(toRad(A));

      const s = (a + b + c) / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

      setResult({
        angles: { A, B, C },
        sides: { a, b, c },
        area,
        steps: [
          `Given: ∠A = ${A}°, ∠B = ${B}°, side a = ${a}`,
          ``,
          `Find ∠C:`,
          `  ∠C = 180° - ∠A - ∠B`,
          `  ∠C = 180° - ${A}° - ${B}° = ${C.toFixed(2)}°`,
          ``,
          `Using Law of Sines to find side b:`,
          `  a/sin(A) = b/sin(B)`,
          `  b = a × sin(B) / sin(A)`,
          `  b = ${a} × sin(${B}°) / sin(${A}°)`,
          `  b = ${b.toFixed(4)}`,
          ``,
          `Using Law of Sines to find side c:`,
          `  c = a × sin(C) / sin(A)`,
          `  c = ${a} × sin(${C.toFixed(2)}°) / sin(${A}°)`,
          `  c = ${c.toFixed(4)}`,
          ``,
          `Area using Heron's formula:`,
          `  s = (a + b + c) / 2 = ${s.toFixed(4)}`,
          `  Area = √[s(s-a)(s-b)(s-c)] = ${area.toFixed(4)}`
        ]
      });
    }
  };

  const reset = () => {
    setAngleA(""); setAngleB(""); setSideA(""); setSideB("");
    setResult(null);
    setError("");
  };

  const loadExample = (type: "asa" | "aas" | "ssa", data: any) => {
    setKnownType(type);
    setAngleA(data.A || "");
    setAngleB(data.B || "");
    setSideA(data.a || "");
    setSideB(data.b || "");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Law of Sines Calculator – Solve Triangles Using Sine Rule</h1>
        <p className="text-muted-foreground">
          Solve any triangle using the Law of Sines with our free online calculator. Find missing sides and angles for ASA, AAS, and SSA triangle configurations with step-by-step solutions.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Known Values</Label>
          <Select value={knownType} onValueChange={(v) => setKnownType(v as typeof knownType)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asa">ASA (Angle-Side-Angle)</SelectItem>
              <SelectItem value="aas">AAS (Angle-Angle-Side)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Angle A (°)</Label>
            <Input type="number" value={angleA} onChange={(e) => setAngleA(e.target.value)} />
          </div>
          <div>
            <Label>Angle B (°)</Label>
            <Input type="number" value={angleB} onChange={(e) => setAngleB(e.target.value)} />
          </div>
          <div>
            <Label>Side a</Label>
            <Input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} />
          </div>
        </div>

        {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>}

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("asa", { A: "45", B: "60", a: "10" })}>ASA: 45°,60°,10</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("asa", { A: "30", B: "45", a: "8" })}>ASA: 30°,45°,8</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("aas", { A: "50", B: "70", a: "12" })}>AAS: 50°,70°,12</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("asa", { A: "60", B: "60", a: "5" })}>ASA: 60°,60°,5 (equil.)</Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Angles</h4>
                <div className="space-y-2 font-mono">
                  <div>A = {result.angles.A.toFixed(2)}°</div>
                  <div>B = {result.angles.B.toFixed(2)}°</div>
                  <div>C = {result.angles.C.toFixed(2)}°</div>
                </div>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold text-sm mb-3">Sides</h4>
                <div className="space-y-2 font-mono">
                  <div>a = {result.sides.a.toFixed(4)}</div>
                  <div>b = {result.sides.b.toFixed(4)}</div>
                  <div>c = {result.sides.c.toFixed(4)}</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Area</h4>
              <p className="text-2xl font-bold">{result.area.toFixed(4)}</p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 text-sm font-mono">{result.steps.map((s: string, i: number) => <div key={i}>{s}</div>)}</div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding the Law of Sines</h2>
        <p className="text-muted-foreground">
          The Law of Sines relates the sides of a triangle to the sines of their opposite angles. It works for any triangle, not just right triangles. This makes it invaluable for solving triangles where you don't have a right angle to work with.
        </p>
        <p className="text-muted-foreground">
          Use the Law of Sines when you know either two angles and one side (ASA or AAS), or two sides and a non-included angle (SSA). For SSA, there might be zero, one, or two possible triangles – this is called the "ambiguous case."
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Law of Sines Formula</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-center text-lg p-4 bg-background rounded mb-4">
            a/sin(A) = b/sin(B) = c/sin(C)
          </div>
          <p className="text-sm text-muted-foreground">
            Each side divided by the sine of its opposite angle equals the same value (which equals 2R, where R is the circumradius of the triangle).
          </p>
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-background rounded">
              <p className="font-semibold text-sm mb-2">To find a side:</p>
              <p className="font-mono text-sm">a = b × sin(A) / sin(B)</p>
            </div>
            <div className="p-3 bg-background rounded">
              <p className="font-semibold text-sm mb-2">To find an angle:</p>
              <p className="font-mono text-sm">sin(A) = a × sin(B) / b</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: ASA Triangle</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Given: ∠A = 45°, ∠B = 60°, a = 10</div>
              <div>Find ∠C: C = 180° - 45° - 60° = 75°</div>
              <div>Find b: b = 10 × sin(60°) / sin(45°)</div>
              <div>b = 10 × 0.866 / 0.707 ≈ 12.25</div>
              <div>Find c: c = 10 × sin(75°) / sin(45°)</div>
              <div>c = 10 × 0.966 / 0.707 ≈ 13.66</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: AAS Triangle</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Given: ∠A = 30°, ∠B = 100°, a = 8</div>
              <div>Find ∠C: C = 180° - 30° - 100° = 50°</div>
              <div>Find b: b = 8 × sin(100°) / sin(30°)</div>
              <div>b = 8 × 0.985 / 0.5 ≈ 15.76</div>
              <div>Find c: c = 8 × sin(50°) / sin(30°)</div>
              <div>c = 8 × 0.766 / 0.5 ≈ 12.26</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Equilateral Triangle Check</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Given: ∠A = 60°, ∠B = 60°, a = 5</div>
              <div>Find ∠C: C = 180° - 60° - 60° = 60°</div>
              <div>All angles are 60°, so it's equilateral!</div>
              <div>b = 5 × sin(60°) / sin(60°) = 5</div>
              <div>c = 5 × sin(60°) / sin(60°) = 5</div>
              <div className="text-muted-foreground mt-2">All sides equal 5, confirming equilateral triangle.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The Law of Sines was known to Persian mathematicians in the 10th century. Al-Jayyani wrote the first general treatment of spherical trigonometry (which includes the Law of Sines) in his 11th-century book "The Book of Unknown Arcs of a Sphere."
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the ambiguous case (SSA)?</h4>
            <p className="text-sm text-muted-foreground">
              When you know two sides and a non-included angle, there might be 0, 1, or 2 possible triangles. This happens because sin(θ) = sin(180°-θ), so an angle and its supplement have the same sine value.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I use Law of Sines vs Law of Cosines?</h4>
            <p className="text-sm text-muted-foreground">
              Use Law of Sines for ASA, AAS, or SSA. Use Law of Cosines for SSS or SAS. Law of Sines is computationally simpler when it applies.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use Law of Sines for right triangles?</h4>
            <p className="text-sm text-muted-foreground">
              Yes! For a right triangle with C = 90°, sin(C) = 1, so c = a/sin(A) = b/sin(B). This gives the familiar relationships from right triangle trigonometry.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if I get sin(A) {'>'} 1?</h4>
            <p className="text-sm text-muted-foreground">
              That&apos;s impossible – sine values are always between -1 and 1. If your calculation gives sin(A) {'>'} 1, no triangle exists with the given measurements. Check your inputs.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find the area using Law of Sines?</h4>
            <p className="text-sm text-muted-foreground">
              Area = ½ab×sin(C) = ½bc×sin(A) = ½ac×sin(B). Pick the formula using the two sides and included angle you know or have calculated.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
