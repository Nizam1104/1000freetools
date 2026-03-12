"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DegreesRadiansConverter() {
  const [mode, setMode] = useState<"to-radians" | "to-degrees">("to-radians");
  const [inputValue, setInputValue] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const toDeg = (rad: number) => (rad * 180) / Math.PI;

  const simplifyFraction = (num: number, den: number): string => {
    const gcd = (a: number, b: number): number => {
      a = Math.abs(a);
      b = Math.abs(b);
      while (b) {
        [a, b] = [b, a % b];
      }
      return a;
    };

    const common = gcd(num, den);
    const simpNum = num / common;
    const simpDen = den / common;

    if (simpDen === 1) return simpNum.toString();
    if (simpNum === 1) return `π/${simpDen}`;
    if (simpNum === -1) return `-π/${simpDen}`;
    return `${simpNum}π/${simpDen}`;
  };

  const getExactForm = (deg: number): string => {
    const commonAngles: Record<number, string> = {
      0: "0",
      30: "π/6",
      45: "π/4",
      60: "π/3",
      90: "π/2",
      120: "2π/3",
      135: "3π/4",
      150: "5π/6",
      180: "π",
      210: "7π/6",
      225: "5π/4",
      240: "4π/3",
      270: "3π/2",
      300: "5π/3",
      315: "7π/4",
      330: "11π/6",
      360: "2π"
    };

    const normalized = ((deg % 360) + 360) % 360;
    if (commonAngles[normalized]) {
      const multiples = Math.floor(deg / 360);
      if (multiples === 0) return commonAngles[normalized];
      if (multiples > 0) return `${multiples}×2π + ${commonAngles[normalized]}`;
      return `${multiples}×2π + ${commonAngles[normalized]}`;
    }

    const rad = toRad(deg);
    const piMultiple = rad / Math.PI;

    for (let den = 1; den <= 12; den++) {
      const num = piMultiple * den;
      if (Math.abs(num - Math.round(num)) < 0.001) {
        return simplifyFraction(Math.round(num), den);
      }
    }

    return `${piMultiple.toFixed(4)}π`;
  };

  const getExactDegForm = (rad: number): string => {
    const commonRad: Record<string, number> = {
      "0": 0,
      "π/6": 30,
      "π/4": 45,
      "π/3": 60,
      "π/2": 90,
      "2π/3": 120,
      "3π/4": 135,
      "5π/6": 150,
      "π": 180,
      "7π/6": 210,
      "5π/4": 225,
      "4π/3": 240,
      "3π/2": 270,
      "5π/3": 300,
      "7π/4": 315,
      "11π/6": 330,
      "2π": 360
    };

    const normalized = ((rad % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const piMultiple = normalized / Math.PI;

    for (let den = 1; den <= 6; den++) {
      const num = piMultiple * den;
      if (Math.abs(num - Math.round(num)) < 0.01) {
        const key = `${Math.round(num)}π/${den}`;
        if (commonRad[key]) return `${commonRad[key]}°`;
        const simplified = `${Math.round(num) === 1 ? '' : Math.round(num)}π/${den}`;
        for (const [k, v] of Object.entries(commonRad)) {
          if (k.includes(simplified) || simplified.includes(k)) {
            return `${v}°`;
          }
        }
      }
    }

    return `${toDeg(rad).toFixed(2)}°`;
  };

  const calculate = () => {
    const val = parseFloat(inputValue);

    if (isNaN(val)) {
      return;
    }

    if (mode === "to-radians") {
      const radians = toRad(val);
      const exactForm = getExactForm(val);

      setResult({
        input: val,
        inputUnit: "degrees",
        output: radians.toFixed(6),
        outputUnit: "radians",
        exactForm,
        formula: `radians = degrees × π/180`,
        steps: [
          `Given: ${val}°`,
          ``,
          `Conversion formula:`,
          `  radians = degrees × π/180`,
          ``,
          `Substitute:`,
          `  radians = ${val} × π/180`,
          `  radians = ${val}π/180`,
          ``,
          `Simplify:`,
          `  ${exactForm}`,
          ``,
          `Decimal approximation:`,
          `  ${radians.toFixed(6)} rad`
        ]
      });
    } else {
      const degrees = toDeg(val);
      const exactForm = getExactDegForm(val);

      setResult({
        input: val,
        inputUnit: "radians",
        output: degrees.toFixed(4),
        outputUnit: "degrees",
        exactForm,
        formula: `degrees = radians × 180/π`,
        steps: [
          `Given: ${val} rad`,
          ``,
          `Conversion formula:`,
          `  degrees = radians × 180/π`,
          ``,
          `Substitute:`,
          `  degrees = ${val} × 180/π`,
          ``,
          `Calculate:`,
          `  ${exactForm}`,
          ``,
          `Decimal approximation:`,
          `  ${degrees.toFixed(4)}°`
        ]
      });
    }
  };

  const reset = () => {
    setInputValue("");
    setResult(null);
  };

  const quickConversions = [
    { deg: 0, rad: "0" },
    { deg: 30, rad: "π/6" },
    { deg: 45, rad: "π/4" },
    { deg: 60, rad: "π/3" },
    { deg: 90, rad: "π/2" },
    { deg: 180, rad: "π" },
    { deg: 270, rad: "3π/2" },
    { deg: 360, rad: "2π" }
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Degrees to Radians Converter – Convert Angles Online</h1>
        <p className="text-muted-foreground">
          Convert any angle from degrees to radians or radians to degrees with our free online converter. Instant and accurate angle conversions using π-based formulas.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Angle Conversion Calculator</CardTitle>
          <CardDescription>
            Convert between degrees and radians instantly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Tabs value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="to-radians">Degrees → Radians</TabsTrigger>
                <TabsTrigger value="to-degrees">Radians → Degrees</TabsTrigger>
              </TabsList>

              <TabsContent value="to-radians" className="space-y-4 mt-6">
                <div>
                  <Label>Angle in Degrees</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="e.g., 45"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
              </TabsContent>

              <TabsContent value="to-degrees" className="space-y-4 mt-6">
                <div>
                  <Label>Angle in Radians</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="e.g., 1.57 or π/2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Enter decimal values (e.g., 1.57). For π fractions, calculate the decimal first.
                  </p>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex gap-2">
              <Button onClick={calculate}>Convert</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-6 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Input</p>
                    <p className="text-3xl font-bold">
                      {result.input}{result.inputUnit === "degrees" ? "°" : " rad"}
                    </p>
                  </div>
                  <div className="p-6 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Result</p>
                    <p className="text-3xl font-bold">
                      {result.output}{result.outputUnit === "degrees" ? "°" : " rad"}
                    </p>
                  </div>
                </div>

                {result.exactForm && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">Exact Form</p>
                    <p className="text-xl font-mono">{result.exactForm}</p>
                  </div>
                )}

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

                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">Formula Used</h4>
                  <p className="text-sm font-mono">{result.formula}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Reference: Common Angle Conversions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickConversions.map((conv) => (
              <div key={conv.deg} className="p-3 bg-muted rounded-lg text-center">
                <p className="text-lg font-bold">{conv.deg}°</p>
                <p className="text-sm text-muted-foreground">=</p>
                <p className="text-lg font-mono">{conv.rad}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Degrees and Radians</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Degrees and radians are two ways to measure angles. Degrees split a circle into 360 equal parts. Radians use the radius of a circle – one radian is the angle you get when you wrap the radius around the circumference.
          </p>
          <p className="text-sm text-muted-foreground">
            A full circle is 360° or 2π radians. That means 180° = π radians. This relationship gives us the conversion formulas: multiply by π/180 to go from degrees to radians, multiply by 180/π to go from radians to degrees.
          </p>
          <p className="text-sm text-muted-foreground">
            Radians are the natural unit for math. Calculus formulas work cleanly with radians. Degrees are more intuitive for everyday use – we're used to thinking in 90° angles and 360° circles.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Formulas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Degrees to Radians</h4>
              <div className="text-lg font-mono bg-muted p-3 rounded mb-3 text-center">
                radians = degrees × π/180
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-muted-foreground">Examples:</p>
                <div className="font-mono">30° × π/180 = π/6</div>
                <div className="font-mono">45° × π/180 = π/4</div>
                <div className="font-mono">90° × π/180 = π/2</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Radians to Degrees</h4>
              <div className="text-lg font-mono bg-muted p-3 rounded mb-3 text-center">
                degrees = radians × 180/π
              </div>
              <div className="space-y-2 text-xs">
                <p className="text-muted-foreground">Examples:</p>
                <div className="font-mono">π/6 × 180/π = 30°</div>
                <div className="font-mono">π/4 × 180/π = 45°</div>
                <div className="font-mono">π/2 × 180/π = 90°</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Use Radians?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Calculus Works Better</h4>
              <p className="text-sm text-muted-foreground">
                The derivative of sin(x) is cos(x) only when x is in radians. With degrees, you'd need an extra factor of π/180. Same for integrals. Radians make the math cleaner.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Arc Length Formula</h4>
              <p className="text-sm text-muted-foreground mb-2">
                Arc length s = rθ is simple with radians. With degrees, it becomes s = rθ × π/180.
              </p>
              <div className="text-xs font-mono bg-muted p-2 rounded">
                Radians: s = rθ<br />
                Degrees: s = rθ × π/180
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Natural Unit</h4>
              <p className="text-sm text-muted-foreground">
                Radians come from the geometry of circles, not an arbitrary choice of 360. One radian is about 57.3° – that's not random, it's the angle where arc length equals radius.
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
            <h4 className="font-semibold text-sm mb-2">How do I convert degrees to radians without a calculator?</h4>
            <p className="text-xs text-muted-foreground">
              Multiply by π/180. For common angles, memorize the pattern: 30° = π/6, 45° = π/4, 60° = π/3, 90° = π/2. The denominator decreases as the angle increases (6, 4, 3, 2).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is 1 radian in degrees?</h4>
            <p className="text-xs text-muted-foreground">
              1 radian = 180/π ≈ 57.296°. It's not a nice round number because radians aren't based on dividing a circle into convenient chunks – they're based on the radius.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Should I leave my answer in terms of π?</h4>
            <p className="text-xs text-muted-foreground">
              In math classes, yes – exact answers with π are preferred. In physics or engineering, decimal approximations are often more useful. This calculator shows both.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is a full circle 2π radians?</h4>
            <p className="text-xs text-muted-foreground">
              Circumference = 2πr. One radian is the angle where arc length = r. So a full circle (arc length = circumference) is 2πr/r = 2π radians.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I convert negative angles?</h4>
            <p className="text-xs text-muted-foreground">
              Absolutely. Negative angles just mean rotation in the opposite direction. -90° = -π/2 rad. The conversion formulas work the same way.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between π and 180°?</h4>
            <p className="text-xs text-muted-foreground">
              They're the same angle in different units. π radians = 180°. It's like asking the difference between 1 kilometer and 1000 meters – same distance, different units.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
