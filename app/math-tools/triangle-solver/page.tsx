"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TriangleSolver() {
  const [method, setMethod] = useState<"sss" | "sas" | "asa" | "aas">("sss");
  
  // SSS inputs
  const [sideA, setSideA] = useState<string>("");
  const [sideB, setSideB] = useState<string>("");
  const [sideC, setSideC] = useState<string>("");
  
  // SAS inputs
  const [sasSide1, setSasSide1] = useState<string>("");
  const [sasAngle, setSasAngle] = useState<string>("");
  const [sasSide2, setSasSide2] = useState<string>("");
  
  // ASA inputs
  const [asaAngle1, setAsaAngle1] = useState<string>("");
  const [asaSide, setAsaSide] = useState<string>("");
  const [asaAngle2, setAsaAngle2] = useState<string>("");
  
  // AAS inputs
  const [aasAngle1, setAasAngle1] = useState<string>("");
  const [aasAngle2, setAasAngle2] = useState<string>("");
  const [aasSide, setAasSide] = useState<string>("");

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const calculateSSS = () => {
    const a = parseFloat(sideA);
    const b = parseFloat(sideB);
    const c = parseFloat(sideC);

    if (isNaN(a) || isNaN(b) || isNaN(c) || a <= 0 || b <= 0 || c <= 0) {
      setError("All sides must be positive numbers");
      return;
    }

    if (a + b <= c || a + c <= b || b + c <= a) {
      setError("These sides cannot form a triangle. The sum of any two sides must be greater than the third.");
      return;
    }

    setError("");
    
    const angleA = toDeg(Math.acos((b * b + c * c - a * a) / (2 * b * c)));
    const angleB = toDeg(Math.acos((a * a + c * c - b * b) / (2 * a * c)));
    const angleC = 180 - angleA - angleB;
    
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    const perimeter = a + b + c;

    setResult({
      sides: { a, b, c },
      angles: { A: angleA, B: angleB, C: angleC },
      area,
      perimeter,
      method: "SSS",
      steps: [
        `Given: a = ${a}, b = ${b}, c = ${c}`,
        `Using Law of Cosines for angle A:`,
        `  cos(A) = (b² + c² - a²) / (2bc)`,
        `  cos(A) = (${b}² + ${c}² - ${a}²) / (2 × ${b} × ${c})`,
        `  cos(A) = ${(b * b + c * c - a * a).toFixed(4)} / ${(2 * b * c).toFixed(4)}`,
        `  A = arccos(${((b * b + c * c - a * a) / (2 * b * c)).toFixed(4)}) = ${angleA.toFixed(2)}°`,
        ``,
        `For angle B:`,
        `  cos(B) = (a² + c² - b²) / (2ac)`,
        `  B = ${angleB.toFixed(2)}°`,
        ``,
        `For angle C:`,
        `  C = 180° - A - B = ${angleC.toFixed(2)}°`,
        ``,
        `Area using Heron's formula:`,
        `  s = (a + b + c) / 2 = ${s.toFixed(4)}`,
        `  Area = √[s(s-a)(s-b)(s-c)] = ${area.toFixed(4)}`
      ]
    });
  };

  const calculateSAS = () => {
    const side1 = parseFloat(sasSide1);
    const angle = parseFloat(sasAngle);
    const side2 = parseFloat(sasSide2);

    if (isNaN(side1) || isNaN(angle) || isNaN(side2) || side1 <= 0 || side2 <= 0 || angle <= 0 || angle >= 180) {
      setError("Sides must be positive, angle must be between 0° and 180°");
      return;
    }

    setError("");
    
    const angleRad = toRad(angle);
    const side3 = Math.sqrt(side1 * side1 + side2 * side2 - 2 * side1 * side2 * Math.cos(angleRad));
    
    const angle1 = toDeg(Math.acos((side2 * side2 + side3 * side3 - side1 * side1) / (2 * side2 * side3)));
    const angle2 = toDeg(Math.acos((side1 * side1 + side3 * side3 - side2 * side2) / (2 * side1 * side3)));
    const angle3 = angle;
    
    const s = (side1 + side2 + side3) / 2;
    const area = 0.5 * side1 * side2 * Math.sin(angleRad);
    const perimeter = side1 + side2 + side3;

    setResult({
      sides: { a: side3, b: side1, c: side2 },
      angles: { A: angle, B: angle1, C: angle2 },
      area,
      perimeter,
      method: "SAS",
      steps: [
        `Given: side b = ${side1}, angle A = ${angle}°, side c = ${side2}`,
        `Using Law of Cosines to find side a:`,
        `  a² = b² + c² - 2bc × cos(A)`,
        `  a² = ${side1}² + ${side2}² - 2 × ${side1} × ${side2} × cos(${angle}°)`,
        `  a² = ${side1 * side1} + ${side2 * side2} - ${2 * side1 * side2} × ${Math.cos(angleRad).toFixed(4)}`,
        `  a = √${(side1 * side1 + side2 * side2 - 2 * side1 * side2 * Math.cos(angleRad)).toFixed(4)} = ${side3.toFixed(4)}`,
        ``,
        `Using Law of Sines for angle B:`,
        `  sin(B)/b = sin(A)/a`,
        `  B = ${angle1.toFixed(2)}°`,
        ``,
        `For angle C:`,
        `  C = 180° - A - B = ${angle2.toFixed(2)}°`,
        ``,
        `Area:`,
        `  Area = ½ × b × c × sin(A) = ${area.toFixed(4)}`
      ]
    });
  };

  const calculateASA = () => {
    const angle1 = parseFloat(asaAngle1);
    const side = parseFloat(asaSide);
    const angle2 = parseFloat(asaAngle2);

    if (isNaN(angle1) || isNaN(side) || isNaN(angle2) || side <= 0 || angle1 <= 0 || angle2 <= 0 || angle1 + angle2 >= 180) {
      setError("Side must be positive, angles must be positive and sum < 180°");
      return;
    }

    setError("");
    
    const angle3 = 180 - angle1 - angle2;
    const angle1Rad = toRad(angle1);
    const angle2Rad = toRad(angle2);
    const angle3Rad = toRad(angle3);
    
    const side1 = (side * Math.sin(angle1Rad)) / Math.sin(angle3Rad);
    const side2 = (side * Math.sin(angle2Rad)) / Math.sin(angle3Rad);
    
    const s = (side1 + side2 + side) / 2;
    const area = 0.5 * side1 * side2 * Math.sin(angle3Rad);
    const perimeter = side1 + side2 + side;

    setResult({
      sides: { a: side, b: side1, c: side2 },
      angles: { A: angle3, B: angle1, C: angle2 },
      area,
      perimeter,
      method: "ASA",
      steps: [
        `Given: angle B = ${angle1}°, side c = ${side}, angle A = ${angle2}°`,
        `First, find angle C:`,
        `  C = 180° - ${angle1}° - ${angle2}° = ${angle3.toFixed(2)}°`,
        ``,
        `Using Law of Sines to find side a:`,
        `  a/sin(A) = c/sin(C)`,
        `  a = ${side} × sin(${angle2}°) / sin(${angle3}°)`,
        `  a = ${side1.toFixed(4)}`,
        ``,
        `Using Law of Sines to find side b:`,
        `  b/sin(B) = c/sin(C)`,
        `  b = ${side} × sin(${angle1}°) / sin(${angle3}°)`,
        `  b = ${side2.toFixed(4)}`,
        ``,
        `Area:`,
        `  Area = ½ × a × b × sin(C) = ${area.toFixed(4)}`
      ]
    });
  };

  const calculateAAS = () => {
    const angle1 = parseFloat(aasAngle1);
    const angle2 = parseFloat(aasAngle2);
    const side = parseFloat(aasSide);

    if (isNaN(angle1) || isNaN(angle2) || isNaN(side) || side <= 0 || angle1 <= 0 || angle2 <= 0 || angle1 + angle2 >= 180) {
      setError("Side must be positive, angles must be positive and sum < 180°");
      return;
    }

    setError("");
    
    const angle3 = 180 - angle1 - angle2;
    const angle1Rad = toRad(angle1);
    const angle2Rad = toRad(angle2);
    const angle3Rad = toRad(angle3);
    
    const side1 = (side * Math.sin(angle1Rad)) / Math.sin(angle3Rad);
    const side2 = (side * Math.sin(angle2Rad)) / Math.sin(angle3Rad);
    
    const s = (side1 + side2 + side) / 2;
    const area = 0.5 * side1 * side * Math.sin(angle2Rad);
    const perimeter = side1 + side2 + side;

    setResult({
      sides: { a: side1, b: side2, c: side },
      angles: { A: angle1, B: angle2, C: angle3 },
      area,
      perimeter,
      method: "AAS",
      steps: [
        `Given: angle A = ${angle1}°, angle B = ${angle2}°, side c = ${side}`,
        `First, find angle C:`,
        `  C = 180° - ${angle1}° - ${angle2}° = ${angle3.toFixed(2)}°`,
        ``,
        `Using Law of Sines to find side a:`,
        `  a/sin(A) = c/sin(C)`,
        `  a = ${side} × sin(${angle1}°) / sin(${angle3}°)`,
        `  a = ${side1.toFixed(4)}`,
        ``,
        `Using Law of Sines to find side b:`,
        `  b/sin(B) = c/sin(C)`,
        `  b = ${side} × sin(${angle2}°) / sin(${angle3}°)`,
        `  b = ${side2.toFixed(4)}`,
        ``,
        `Area:`,
        `  Area = ½ × a × c × sin(B) = ${area.toFixed(4)}`
      ]
    });
  };

  const calculate = () => {
    setResult(null);
    switch (method) {
      case "sss": calculateSSS(); break;
      case "sas": calculateSAS(); break;
      case "asa": calculateASA(); break;
      case "aas": calculateAAS(); break;
    }
  };

  const reset = () => {
    setSideA(""); setSideB(""); setSideC("");
    setSasSide1(""); setSasAngle(""); setSasSide2("");
    setAsaAngle1(""); setAsaSide(""); setAsaAngle2("");
    setAasAngle1(""); setAasAngle2(""); setAasSide("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Triangle Solver – Solve Any Triangle SSS SAS ASA AAS</h1>
        <p className="text-muted-foreground">
          Solve any triangle completely using SSS, SAS, ASA, or AAS methods with our free online triangle solver. Find all missing sides, angles, and area with step-by-step trigonometric solutions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Triangle Solver Calculator</CardTitle>
          <CardDescription>
            Select your known values and solve for all unknown sides and angles.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Tabs value={method} onValueChange={(v) => setMethod(v as typeof method)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="sss">SSS</TabsTrigger>
                <TabsTrigger value="sas">SAS</TabsTrigger>
                <TabsTrigger value="asa">ASA</TabsTrigger>
                <TabsTrigger value="aas">AAS</TabsTrigger>
              </TabsList>

              <TabsContent value="sss" className="space-y-4 mt-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>SSS (Side-Side-Side):</strong> You know all three sides of the triangle.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Side a</Label>
                    <Input type="number" placeholder="e.g., 5" value={sideA} onChange={(e) => setSideA(e.target.value)} />
                  </div>
                  <div>
                    <Label>Side b</Label>
                    <Input type="number" placeholder="e.g., 7" value={sideB} onChange={(e) => setSideB(e.target.value)} />
                  </div>
                  <div>
                    <Label>Side c</Label>
                    <Input type="number" placeholder="e.g., 8" value={sideC} onChange={(e) => setSideC(e.target.value)} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sas" className="space-y-4 mt-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>SAS (Side-Angle-Side):</strong> You know two sides and the included angle.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Side b</Label>
                    <Input type="number" placeholder="e.g., 5" value={sasSide1} onChange={(e) => setSasSide1(e.target.value)} />
                  </div>
                  <div>
                    <Label>Angle A (between)</Label>
                    <Input type="number" placeholder="e.g., 60" value={sasAngle} onChange={(e) => setSasAngle(e.target.value)} />
                  </div>
                  <div>
                    <Label>Side c</Label>
                    <Input type="number" placeholder="e.g., 7" value={sasSide2} onChange={(e) => setSasSide2(e.target.value)} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="asa" className="space-y-4 mt-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>ASA (Angle-Side-Angle):</strong> You know two angles and the included side.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Angle B</Label>
                    <Input type="number" placeholder="e.g., 45" value={asaAngle1} onChange={(e) => setAsaAngle1(e.target.value)} />
                  </div>
                  <div>
                    <Label>Side c (between)</Label>
                    <Input type="number" placeholder="e.g., 10" value={asaSide} onChange={(e) => setAsaSide(e.target.value)} />
                  </div>
                  <div>
                    <Label>Angle A</Label>
                    <Input type="number" placeholder="e.g., 60" value={asaAngle2} onChange={(e) => setAsaAngle2(e.target.value)} />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="aas" className="space-y-4 mt-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>AAS (Angle-Angle-Side):</strong> You know two angles and a non-included side.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Angle A</Label>
                    <Input type="number" placeholder="e.g., 50" value={aasAngle1} onChange={(e) => setAasAngle1(e.target.value)} />
                  </div>
                  <div>
                    <Label>Angle B</Label>
                    <Input type="number" placeholder="e.g., 60" value={aasAngle2} onChange={(e) => setAasAngle2(e.target.value)} />
                  </div>
                  <div>
                    <Label>Side c</Label>
                    <Input type="number" placeholder="e.g., 8" value={aasSide} onChange={(e) => setAasSide(e.target.value)} />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Solve Triangle</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-4">Sides</h4>
                    <div className="space-y-2 font-mono">
                      <div>a = {result.sides.a.toFixed(4)}</div>
                      <div>b = {result.sides.b.toFixed(4)}</div>
                      <div>c = {result.sides.c.toFixed(4)}</div>
                    </div>
                  </div>
                  <div className="p-6 bg-muted rounded-lg">
                    <h4 className="font-semibold text-sm mb-4">Angles</h4>
                    <div className="space-y-2 font-mono">
                      <div>A = {result.angles.A.toFixed(2)}°</div>
                      <div>B = {result.angles.B.toFixed(2)}°</div>
                      <div>C = {result.angles.C.toFixed(2)}°</div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Area</p>
                    <p className="text-2xl font-bold">{result.area.toFixed(4)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Perimeter</p>
                    <p className="text-2xl font-bold">{result.perimeter.toFixed(4)}</p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-1">Method</p>
                    <p className="text-2xl font-bold">{result.method}</p>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
                  <div className="space-y-2 text-sm font-mono">
                    {result.steps.map((step: string, i: number) => (
                      <div key={i} className={step === "" ? "h-4" : ""}>
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

      <Card>
        <CardHeader>
          <CardTitle>How to Solve a Triangle</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Solving a triangle means finding all three sides and all three angles when you're given partial information. The method you use depends on what you already know.
          </p>
          <p className="text-sm text-muted-foreground">
            SSS works when you have all three sides. The Law of Cosines finds each angle. SAS gives you two sides and the angle between them – use Law of Cosines to find the third side, then Law of Sines for the remaining angles. ASA provides two angles and the side between them. AAS gives two angles and any side. Both ASA and AAS use the Law of Sines after finding the third angle.
          </p>
          <p className="text-sm text-muted-foreground">
            Remember: the angles of any triangle always add up to 180°. This fact alone solves half your problems.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>When to Use Each Method</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">SSS (Side-Side-Side)</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Use when you know all three sides and need to find the angles.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                Given: a=5, b=7, c=8<br />
                Find: ∠A, ∠B, ∠C
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">SAS (Side-Angle-Side)</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Use when you know two sides and the angle between them.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                Given: b=5, ∠A=60°, c=7<br />
                Find: a, ∠B, ∠C
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">ASA (Angle-Side-Angle)</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Use when you know two angles and the side between them.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                Given: ∠B=45°, c=10, ∠A=60°<br />
                Find: a, b, ∠C
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">AAS (Angle-Angle-Side)</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Use when you know two angles and any side.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                Given: ∠A=50°, ∠B=60°, c=8<br />
                Find: a, b, ∠C
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Triangle Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">SSS Example: Sides 3, 4, 5</div>
              <div className="font-mono text-xs text-muted-foreground">
                This is a right triangle.<br />
                ∠C = arccos((9+16-25)/(2×3×4)) = 90°<br />
                ∠A = 36.87°, ∠B = 53.13°<br />
                Area = 6, Perimeter = 12
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">SAS Example: b=6, ∠A=45°, c=8</div>
              <div className="font-mono text-xs text-muted-foreground">
                a² = 36 + 64 - 96×cos(45°) = 32.12<br />
                a = 5.67<br />
                ∠B = 47.06°, ∠C = 87.94°<br />
                Area = 16.97
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">ASA Example: ∠B=30°, c=10, ∠A=60°</div>
              <div className="font-mono text-xs text-muted-foreground">
                ∠C = 180° - 30° - 60° = 90°<br />
                a = 10 × sin(60°)/sin(90°) = 8.66<br />
                b = 10 × sin(30°)/sin(90°) = 5<br />
                Area = 21.65
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">AAS Example: ∠A=40°, ∠B=70°, c=12</div>
              <div className="font-mono text-xs text-muted-foreground">
                ∠C = 180° - 40° - 70° = 70°<br />
                a = 12 × sin(40°)/sin(70°) = 8.21<br />
                b = 12 × sin(70°)/sin(70°) = 12<br />
                Area = 37.79
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Formulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Law of Cosines</h4>
              <div className="space-y-2 text-xs font-mono">
                <div>a² = b² + c² - 2bc × cos(A)</div>
                <div>b² = a² + c² - 2ac × cos(B)</div>
                <div>c² = a² + b² - 2ab × cos(C)</div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Use for SSS and SAS. Generalizes the Pythagorean theorem.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Law of Sines</h4>
              <div className="space-y-2 text-xs font-mono">
                <div>a/sin(A) = b/sin(B) = c/sin(C)</div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Use for ASA and AAS. Relates sides to their opposite angles.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Heron's Formula (Area)</h4>
              <div className="space-y-2 text-xs font-mono">
                <div>s = (a + b + c) / 2</div>
                <div>Area = √[s(s-a)(s-b)(s-c)]</div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Find area when you know all three sides.
              </p>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Trig Area Formula</h4>
              <div className="space-y-2 text-xs font-mono">
                <div>Area = ½ × b × c × sin(A)</div>
                <div>Area = ½ × a × c × sin(B)</div>
                <div>Area = ½ × a × b × sin(C)</div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Use when you know two sides and the included angle.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What does it mean to "solve" a triangle?</h4>
            <p className="text-xs text-muted-foreground">
              Solving a triangle means finding all unknown sides and angles. If you're given three pieces of information (with at least one side), you can determine everything else about the triangle.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I solve a triangle with only angles (AAA)?</h4>
            <p className="text-xs text-muted-foreground">
              No. Knowing all three angles only tells you the shape, not the size. You need at least one side length to determine the scale. Triangles with the same angles but different sizes are called similar triangles.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the ambiguous case (SSA)?</h4>
            <p className="text-xs text-muted-foreground">
              SSA (two sides and a non-included angle) can produce zero, one, or two possible triangles. This calculator doesn't handle SSA because it requires checking multiple cases. Use Law of Sines carefully when you encounter this.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why do my angles not add up to exactly 180°?</h4>
            <p className="text-xs text-muted-foreground">
              Rounding. The calculator shows rounded values for display, but uses full precision internally. If you add the displayed angles and get 179.99° or 180.01°, that's just rounding error.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When should I use Law of Sines vs Law of Cosines?</h4>
            <p className="text-xs text-muted-foreground">
              Law of Cosines works for SSS and SAS. Law of Sines works for ASA and AAS. Think of it this way: Law of Cosines finds angles from sides (or a side from two sides and an angle). Law of Sines finds sides from angles (or angles from sides).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can this calculator handle obtuse triangles?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. The Law of Cosines naturally handles obtuse angles (angles greater than 90°). The arccos function returns angles in the range 0° to 180°, covering both acute and obtuse cases.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Related Math Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            <a href="/math-tools/right-triangle-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Right Triangle Calculator</p>
              <p className="text-xs text-muted-foreground">Specialized for right triangles</p>
            </a>
            <a href="/math-tools/law-of-sines-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Law of Sines Calculator</p>
              <p className="text-xs text-muted-foreground">Solve using sine rule</p>
            </a>
            <a href="/math-tools/law-of-cosines-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Law of Cosines Calculator</p>
              <p className="text-xs text-muted-foreground">Solve using cosine rule</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
