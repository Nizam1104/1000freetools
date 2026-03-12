"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function LawOfCosinesCalculator() {
  const [knownType, setKnownType] = useState<"sss" | "sas">("sss");
  const [sideA, setSideA] = useState<string>("");
  const [sideB, setSideB] = useState<string>("");
  const [sideC, setSideC] = useState<string>("");
  const [angleA, setAngleA] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculate = () => {
    setResult(null);
    setError("");

    if (knownType === "sss") {
      const a = parseFloat(sideA);
      const b = parseFloat(sideB);
      const c = parseFloat(sideC);

      if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
        setError("All sides must be positive numbers");
        return;
      }

      if (a + b <= c || a + c <= b || b + c <= a) {
        setError("These sides cannot form a triangle");
        return;
      }

      const A = toDeg(Math.acos((b*b + c*c - a*a) / (2*b*c)));
      const B = toDeg(Math.acos((a*a + c*c - b*b) / (2*a*c)));
      const C = 180 - A - B;

      const s = (a + b + c) / 2;
      const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

      setResult({
        sides: { a, b, c },
        angles: { A, B, C },
        area,
        steps: [
          `Given: a = ${a}, b = ${b}, c = ${c}`,
          ``,
          `Using Law of Cosines to find ∠A:`,
          `  cos(A) = (b² + c² - a²) / (2bc)`,
          `  cos(A) = (${b}² + ${c}² - ${a}²) / (2 × ${b} × ${c})`,
          `  A = arccos(${((b*b + c*c - a*a) / (2*b*c)).toFixed(4)})`,
          `  A = ${A.toFixed(2)}°`,
          ``,
          `Using Law of Cosines to find ∠B:`,
          `  B = ${B.toFixed(2)}°`,
          ``,
          `Finding ∠C:`,
          `  C = 180° - A - B = ${C.toFixed(2)}°`,
          ``,
          `Area using Heron's formula:`,
          `  Area = ${area.toFixed(4)}`
        ]
      });
    } else {
      const b = parseFloat(sideB);
      const A = parseFloat(angleA);
      const c = parseFloat(sideC);

      if (isNaN(b) || isNaN(A) || isNaN(c) || b <= 0 || c <= 0 || A <= 0 || A >= 180) {
        setError("Invalid values");
        return;
      }

      const a = Math.sqrt(b*b + c*c - 2*b*c*Math.cos(toRad(A)));
      const B = toDeg(Math.acos((a*a + c*c - b*b) / (2*a*c)));
      const C = 180 - A - B;
      const area = 0.5 * b * c * Math.sin(toRad(A));

      setResult({
        sides: { a, b, c },
        angles: { A, B, C },
        area,
        steps: [
          `Given: b = ${b}, ∠A = ${A}°, c = ${c}`,
          ``,
          `Using Law of Cosines to find side a:`,
          `  a² = b² + c² - 2bc × cos(A)`,
          `  a = √(${b}² + ${c}² - 2 × ${b} × ${c} × cos(${A}°))`,
          `  a = ${a.toFixed(4)}`,
          ``,
          `Finding ∠B using Law of Cosines:`,
          `  B = ${B.toFixed(2)}°`,
          ``,
          `Finding ∠C:`,
          `  C = 180° - A - B = ${C.toFixed(2)}°`,
          ``,
          `Area:`,
          `  Area = ½ × b × c × sin(A) = ${area.toFixed(4)}`
        ]
      });
    }
  };

  const reset = () => {
    setSideA(""); setSideB(""); setSideC(""); setAngleA("");
    setResult(null); setError("");
  };

  const loadExample = (type: "sss" | "sas", data: any) => {
    setKnownType(type);
    if (type === "sss") {
      setSideA(data.a);
      setSideB(data.b);
      setSideC(data.c);
      setAngleA("");
    } else {
      setSideA("");
      setSideB(data.b);
      setSideC(data.c);
      setAngleA(data.A);
    }
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Law of Cosines Calculator – Solve Triangles Using Cosine Rule</h1>
        <p className="text-muted-foreground">
          Solve triangles using the Law of Cosines with our free online calculator. Find missing sides and angles for SSS and SAS configurations with detailed step-by-step solutions.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>Known Values</Label>
          <Select value={knownType} onValueChange={(v) => setKnownType(v as typeof knownType)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="sss">SSS (Three Sides)</SelectItem>
              <SelectItem value="sas">SAS (Two Sides and Included Angle)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {knownType === "sss" ? (
          <div className="grid md:grid-cols-3 gap-4">
            <div><Label>Side a</Label><Input type="number" value={sideA} onChange={(e) => setSideA(e.target.value)} /></div>
            <div><Label>Side b</Label><Input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} /></div>
            <div><Label>Side c</Label><Input type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} /></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            <div><Label>Side b</Label><Input type="number" value={sideB} onChange={(e) => setSideB(e.target.value)} /></div>
            <div><Label>Angle A (°)</Label><Input type="number" value={angleA} onChange={(e) => setAngleA(e.target.value)} /></div>
            <div><Label>Side c</Label><Input type="number" value={sideC} onChange={(e) => setSideC(e.target.value)} /></div>
          </div>
        )}

        {error && <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>}

        <div className="flex gap-2 flex-wrap">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("sss", {a: "7", b: "5", c: "8"})}>SSS: 7,5,8</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("sss", {a: "13", b: "14", c: "15"})}>SSS: 13,14,15</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("sas", {b: "10", A: "60", c: "8"})}>SAS: b=10,A=60°,c=8</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("sas", {b: "5", A: "45", c: "7"})}>SAS: b=5,A=45°,c=7</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("sss", {a: "3", b: "4", c: "5"})}>SSS: 3,4,5 (right)</Button>
        </div>

        {result && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg"><h4 className="font-semibold text-sm mb-3">Angles</h4>
                <div className="space-y-2 font-mono"><div>A = {result.angles.A.toFixed(2)}°</div><div>B = {result.angles.B.toFixed(2)}°</div><div>C = {result.angles.C.toFixed(2)}°</div></div>
              </div>
              <div className="p-4 bg-muted rounded-lg"><h4 className="font-semibold text-sm mb-3">Sides</h4>
                <div className="space-y-2 font-mono"><div>a = {result.sides.a.toFixed(4)}</div><div>b = {result.sides.b.toFixed(4)}</div><div>c = {result.sides.c.toFixed(4)}</div></div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Area</h4>
              <p className="text-2xl font-bold">{result.area.toFixed(4)}</p>
            </div>

            <div className="p-4 border rounded-lg"><h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
              <div className="space-y-2 text-sm font-mono">{result.steps.map((s: string, i: number) => <div key={i}>{s}</div>)}</div>
            </div>
          </div>
        )}
      </div>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding the Law of Cosines</h2>
        <p className="text-muted-foreground">
          The Law of Cosines generalizes the Pythagorean theorem to any triangle. For right triangles, it reduces to a² + b² = c². It relates the three sides of a triangle to the cosine of one of its angles.
        </p>
        <p className="text-muted-foreground">
          Use the Law of Cosines when you know all three sides (SSS) or two sides and the included angle (SAS). It's the go-to formula when the Law of Sines doesn't apply.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Law of Cosines Formula</h3>
        <div className="p-6 bg-muted rounded-lg">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-background rounded">
              <div className="font-mono text-lg mb-2">a² = b² + c² - 2bc·cos(A)</div>
              <p className="text-xs text-muted-foreground">Find side a</p>
            </div>
            <div className="p-4 bg-background rounded">
              <div className="font-mono text-lg mb-2">b² = a² + c² - 2ac·cos(B)</div>
              <p className="text-xs text-muted-foreground">Find side b</p>
            </div>
            <div className="p-4 bg-background rounded">
              <div className="font-mono text-lg mb-2">c² = a² + b² - 2ab·cos(C)</div>
              <p className="text-xs text-muted-foreground">Find side c</p>
            </div>
          </div>
          <p className="text-sm mt-4 text-muted-foreground">
            For finding angles, rearrange: cos(A) = (b² + c² - a²) / (2bc)
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 1: SSS Triangle (7, 5, 8)</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Given: a=7, b=5, c=8</div>
              <div>cos(A) = (25 + 64 - 49) / (2×5×8) = 40/80 = 0.5</div>
              <div>A = arccos(0.5) = 60°</div>
              <div>cos(B) = (49 + 64 - 25) / (2×7×8) = 88/112 ≈ 0.786</div>
              <div>B = arccos(0.786) ≈ 38.21°</div>
              <div>C = 180° - 60° - 38.21° ≈ 81.79°</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 2: SAS Triangle</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Given: b=10, ∠A=60°, c=8</div>
              <div>a² = 100 + 64 - 2×10×8×cos(60°)</div>
              <div>a² = 164 - 160×0.5 = 164 - 80 = 84</div>
              <div>a = √84 ≈ 9.17</div>
              <div>Area = ½ × 10 × 8 × sin(60°) ≈ 34.64</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-3">Example 3: Right Triangle Verification</h4>
            <div className="font-mono text-sm space-y-2">
              <div>Given: a=3, b=4, c=5 (Pythagorean triple)</div>
              <div>cos(C) = (9 + 16 - 25) / (2×3×4) = 0/24 = 0</div>
              <div>C = arccos(0) = 90° ✓</div>
              <div className="text-muted-foreground mt-2">Confirms this is a right triangle!</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <h4 className="font-semibold text-sm mb-2 text-amber-800">Quick Fact</h4>
          <p className="text-sm text-amber-700">
            The Law of Cosines was stated in Euclid's Elements (around 300 BCE) in geometric form, though not using cosine. The modern trigonometric form was developed by Persian mathematician Al-Kashi in the 15th century. In France, it's still called "Al-Kashi's theorem."
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I use Law of Cosines vs Law of Sines?</h4>
            <p className="text-sm text-muted-foreground">
              Use Law of Cosines for SSS (three sides) or SAS (two sides + included angle). Use Law of Sines for ASA, AAS, or SSA. Law of Cosines always works but is more computation; Law of Sines is simpler when applicable.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How does this relate to Pythagorean theorem?</h4>
            <p className="text-sm text-muted-foreground">
              When C = 90°, cos(90°) = 0, so c² = a² + b² - 2ab×0 = a² + b². The Law of Cosines becomes the Pythagorean theorem for right triangles.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the Law of Cosines give ambiguous results?</h4>
            <p className="text-sm text-muted-foreground">
              No! Unlike the Law of Sines (which can have the ambiguous SSA case), the Law of Cosines always gives a unique answer for SSS and SAS triangles.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if I get a negative cosine value?</h4>
            <p className="text-sm text-muted-foreground">
              Negative cosine means the angle is obtuse (greater than 90°). This is perfectly valid. arccos of a negative number gives an angle between 90° and 180°.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I know if three sides form a valid triangle?</h4>
            <p className="text-sm text-muted-foreground">
              Use the triangle inequality: the sum of any two sides must exceed the third side. If a + b ≤ c (or any similar combination), no triangle exists with those sides.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
