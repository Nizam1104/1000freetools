"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type InputType = "radius" | "diameter" | "area" | "circumference";

export default function CircleCalculator() {
  const [inputType, setInputType] = useState<InputType>("radius");
  const [value, setValue] = useState<string>("");
  const [result, setResult] = useState<{
    radius: number;
    diameter: number;
    area: number;
    circumference: number;
    steps: string[];
  } | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    setError("");
    setResult(null);

    const val = parseFloat(value);

    if (isNaN(val) || val <= 0) {
      setError("Please enter a positive number");
      return;
    }

    let radius: number;
    const steps: string[] = [];

    switch (inputType) {
      case "radius":
        radius = val;
        steps.push("Given: radius (r) = " + val);
        steps.push("");
        steps.push("Diameter: d = 2r = 2 × " + val + " = " + (2 * val));
        steps.push("Area: A = πr² = π × " + val + "² = π × " + (val * val) + " ≈ " + (Math.PI * val * val).toFixed(4));
        steps.push("Circumference: C = 2πr = 2 × π × " + val + " ≈ " + (2 * Math.PI * val).toFixed(4));
        break;

      case "diameter":
        radius = val / 2;
        steps.push("Given: diameter (d) = " + val);
        steps.push("");
        steps.push("Radius: r = d/2 = " + val + "/2 = " + radius);
        steps.push("Area: A = πr² = π × " + radius + "² = π × " + (radius * radius) + " ≈ " + (Math.PI * radius * radius).toFixed(4));
        steps.push("Circumference: C = πd = π × " + val + " ≈ " + (Math.PI * val).toFixed(4));
        break;

      case "area":
        radius = Math.sqrt(val / Math.PI);
        steps.push("Given: area (A) = " + val);
        steps.push("");
        steps.push("Radius: r = √(A/π) = √(" + val + "/π) = √" + (val / Math.PI).toFixed(4) + " ≈ " + radius.toFixed(4));
        steps.push("Diameter: d = 2r = 2 × " + radius.toFixed(4) + " ≈ " + (2 * radius).toFixed(4));
        steps.push("Circumference: C = 2πr = 2 × π × " + radius.toFixed(4) + " ≈ " + (2 * Math.PI * radius).toFixed(4));
        break;

      case "circumference":
        radius = val / (2 * Math.PI);
        steps.push("Given: circumference (C) = " + val);
        steps.push("");
        steps.push("Radius: r = C/(2π) = " + val + "/(2π) ≈ " + radius.toFixed(4));
        steps.push("Diameter: d = 2r = 2 × " + radius.toFixed(4) + " ≈ " + (2 * radius).toFixed(4));
        steps.push("Area: A = πr² = π × " + radius.toFixed(4) + "² ≈ " + (Math.PI * radius * radius).toFixed(4));
        break;

      default:
        setError("Invalid input type");
        return;
    }

    setResult({
      radius,
      diameter: 2 * radius,
      area: Math.PI * radius * radius,
      circumference: 2 * Math.PI * radius,
      steps
    });
  };

  const reset = () => {
    setValue("");
    setResult(null);
    setError("");
  };

  const loadExample = (type: InputType, val: string) => {
    setInputType(type);
    setValue(val);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Circle Calculator – Find Radius, Diameter, Area & Circumference</h1>
        <p className="text-muted-foreground">
          Calculate any property of a circle instantly with our free online circle calculator. Enter radius, diameter, area, or circumference and find all other measurements with formulas shown.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <Label>I know the...</Label>
          <Select value={inputType} onValueChange={(v) => { setInputType(v as InputType); setValue(""); setResult(null); setError(""); }}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="radius">Radius</SelectItem>
              <SelectItem value="diameter">Diameter</SelectItem>
              <SelectItem value="area">Area</SelectItem>
              <SelectItem value="circumference">Circumference</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid sm:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Radius</div>
            <div className="font-mono text-sm">r</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Diameter</div>
            <div className="font-mono text-sm">d = 2r</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Area</div>
            <div className="font-mono text-sm">A = πr²</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Circumference</div>
            <div className="font-mono text-sm">C = 2πr</div>
          </div>
        </div>

        <div>
          <Label>
            {inputType === "radius" && "Radius (r)"}
            {inputType === "diameter" && "Diameter (d)"}
            {inputType === "area" && "Area (A)"}
            {inputType === "circumference" && "Circumference (C)"}
          </Label>
          <Input
            type="number"
            placeholder={
              inputType === "radius" ? "e.g., 5" :
              inputType === "diameter" ? "e.g., 10" :
              inputType === "area" ? "e.g., 78.54" :
              "e.g., 31.42"
            }
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && calculate()}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground self-center">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("radius", "5")}>r = 5</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("radius", "7")}>r = 7</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("diameter", "12")}>d = 12</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("diameter", "20")}>d = 20</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("area", "100")}>A = 100</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("area", "50")}>A = 50</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("circumference", "50")}>C = 50</Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("circumference", "31.42")}>C = 31.42</Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Radius</p>
                <p className="text-2xl font-bold">{result.radius.toFixed(4)}</p>
                <p className="text-xs text-muted-foreground mt-1">r</p>
              </div>
              <div className="p-5 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Diameter</p>
                <p className="text-2xl font-bold">{result.diameter.toFixed(4)}</p>
                <p className="text-xs text-muted-foreground mt-1">d = 2r</p>
              </div>
              <div className="p-5 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Area</p>
                <p className="text-2xl font-bold">{result.area.toFixed(4)}</p>
                <p className="text-xs text-muted-foreground mt-1">A = πr²</p>
              </div>
              <div className="p-5 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground mb-2">Circumference</p>
                <p className="text-2xl font-bold">{result.circumference.toFixed(4)}</p>
                <p className="text-xs text-muted-foreground mt-1">C = 2πr</p>
              </div>
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Understanding Circle Properties</h2>
        <p className="text-muted-foreground">
          A circle is defined by its center point and radius – the distance from center to any point on the edge. From just the radius, you can derive everything else: diameter (twice the radius), circumference (the distance around), and area (the space inside). All these properties are connected through π (pi).
        </p>
        <p className="text-muted-foreground">
          This circle calculator works backwards and forwards. Enter any one property – radius, diameter, area, or circumference – and it calculates all the others. The formulas are shown step by step so you see exactly how each value is derived.
        </p>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Circle Formulas</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Basic Relationships</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono text-sm">d = 2r</div>
                <div className="text-xs text-muted-foreground mt-1">Diameter equals twice the radius</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono text-sm">r = d/2</div>
                <div className="text-xs text-muted-foreground mt-1">Radius equals half the diameter</div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Circumference Formulas</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono text-sm">C = 2πr</div>
                <div className="text-xs text-muted-foreground mt-1">Using radius</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono text-sm">C = πd</div>
                <div className="text-xs text-muted-foreground mt-1">Using diameter</div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Area Formulas</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono text-sm">A = πr²</div>
                <div className="text-xs text-muted-foreground mt-1">Using radius</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono text-sm">A = πd²/4</div>
                <div className="text-xs text-muted-foreground mt-1">Using diameter</div>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Finding Radius from Other Properties</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono text-sm">r = d/2</div>
                <div className="text-xs text-muted-foreground mt-1">From diameter</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono text-sm">r = √(A/π)</div>
                <div className="text-xs text-muted-foreground mt-1">From area</div>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="font-mono text-sm">r = C/(2π)</div>
                <div className="text-xs text-muted-foreground mt-1">From circumference</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">What Is Pi (π)?</h2>
        <div className="p-6 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground mb-4">
            π (pi) is the ratio of a circle's circumference to its diameter. For any circle, no matter the size, C/d always equals the same number: approximately 3.14159. This constant appears in every circle formula.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold mb-2">3.14159...</div>
              <div className="text-xs text-muted-foreground">Decimal approximation</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold mb-2">22/7</div>
              <div className="text-xs text-muted-foreground">Common fraction</div>
            </div>
            <div className="p-4 border rounded-lg text-center">
              <div className="text-3xl font-bold mb-2">Irrational</div>
              <div className="text-xs text-muted-foreground">Never repeats, never ends</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Why π Appears in Circle Formulas</h3>
            <p className="text-sm text-muted-foreground">
              Since circumference = π × diameter, and diameter = 2 × radius, we get C = 2πr. For area, imagine cutting a circle into many thin wedges and rearranging them into a shape approaching a rectangle. The rectangle has height r and width πr, giving area = πr².
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Pi Day</h3>
            <p className="text-sm text-muted-foreground">
              March 14 (3/14) is Pi Day, celebrating the first three digits of π. The date also happens to be Albert Einstein's birthday. Some enthusiasts celebrate at 1:59 PM for 3.14159.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Worked Examples</h2>
        <div className="space-y-4">
          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 1: Given Radius</h3>
            <p className="text-sm text-muted-foreground mb-3">Find diameter, area, and circumference of a circle with radius 5</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Given: r = 5</div>
              <div>Diameter: d = 2r = 2 × 5 = 10</div>
              <div>Area: A = πr² = π × 25 ≈ 78.54</div>
              <div>Circumference: C = 2πr = 2π × 5 ≈ 31.42</div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 2: Given Diameter</h3>
            <p className="text-sm text-muted-foreground mb-3">Find radius, area, and circumference of a circle with diameter 14</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Given: d = 14</div>
              <div>Radius: r = d/2 = 14/2 = 7</div>
              <div>Area: A = πr² = π × 49 ≈ 153.94</div>
              <div>Circumference: C = πd = π × 14 ≈ 43.98</div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 3: Given Area</h3>
            <p className="text-sm text-muted-foreground mb-3">Find radius, diameter, and circumference of a circle with area 50</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Given: A = 50</div>
              <div>r = √(A/π) = √(50/π) ≈ √15.92 ≈ 3.99</div>
              <div>d = 2r ≈ 7.98</div>
              <div>C = 2πr ≈ 2π × 3.99 ≈ 25.06</div>
            </div>
          </div>

          <div className="p-6 border rounded-lg">
            <h3 className="font-semibold mb-3">Example 4: Given Circumference</h3>
            <p className="text-sm text-muted-foreground mb-3">Find radius, diameter, and area of a circle with circumference 100</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Given: C = 100</div>
              <div>r = C/(2π) = 100/(2π) ≈ 15.92</div>
              <div>d = 2r ≈ 31.83</div>
              <div>A = πr² ≈ π × 253.3 ≈ 795.77</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Real-World Applications</h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Wheels and Gears</h3>
            <p className="text-sm text-muted-foreground">
              The circumference tells you how far a wheel travels in one revolution. A bicycle wheel with 70 cm diameter has circumference about 220 cm – that's how far you move forward with each complete rotation. Gear ratios work the same way.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Pizza and Food</h3>
            <p className="text-sm text-muted-foreground">
              A 16-inch pizza has area π × 8² ≈ 201 square inches. A 12-inch pizza has area π × 6² ≈ 113 square inches. The larger pizza isn't 33% bigger (16 vs 12) – it's 78% bigger in actual food. Area scales with the square of the radius.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Pipes and Flow Rate</h3>
            <p className="text-sm text-muted-foreground">
              The cross-sectional area of a pipe determines how much fluid can flow through. Doubling the pipe diameter quadruples the area (and potential flow rate). This is why main water lines are much wider than branch lines.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Circular Gardens and Lawns</h3>
            <p className="text-sm text-muted-foreground">
              Planning a circular garden? The area tells you how much soil or mulch you need. A 10-foot diameter garden has area about 78.5 square feet. At 2 inches of mulch depth, you need about 13 cubic feet of material.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold text-sm mb-2">Clocks and Angles</h3>
            <p className="text-sm text-muted-foreground">
              The minute hand traces a circle. In 15 minutes, it covers 1/4 of the circumference. In 1 minute, it moves 6 degrees (360°/60). The relationship between time and circular motion is fundamental to how clocks work.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-2">What is the formula for the area of a circle?</h3>
            <p className="text-sm text-muted-foreground">
              Area = πr², where r is the radius. Square the radius and multiply by π. For a circle with radius 5, area = π × 25 ≈ 78.54 square units.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How do I find the circumference?</h3>
            <p className="text-sm text-muted-foreground">
              Circumference = 2πr or C = πd. Use whichever is convenient based on whether you know radius or diameter. Both give the same result since d = 2r.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">What's the difference between radius and diameter?</h3>
            <p className="text-sm text-muted-foreground">
              Radius is the distance from center to edge. Diameter is the distance across the circle through the center – exactly twice the radius. Diameter is the longest possible chord in a circle.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">How do I find radius from area?</h3>
            <p className="text-sm text-muted-foreground">
              Rearrange A = πr² to get r = √(A/π). Take the square root of (area divided by π). For area 100, radius = √(100/π) ≈ √31.83 ≈ 5.64.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Is circumference the same as perimeter?</h3>
            <p className="text-sm text-muted-foreground">
              Conceptually, yes – both measure the boundary length. "Perimeter" is used for polygons (straight sides). "Circumference" is specific to circles. The formulas are completely different.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-2">Why is π used in circle formulas?</h3>
            <p className="text-sm text-muted-foreground">
              π is the fundamental ratio of circumference to diameter for any circle. It's approximately 3.14159 but continues infinitely without repeating. This constant appears naturally whenever circles are involved.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Related Math Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/perimeter-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Perimeter Calculator</p>
            <p className="text-xs text-muted-foreground">2D perimeter</p>
          </a>
          <a href="/math-tools/area-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Area Calculator</p>
            <p className="text-xs text-muted-foreground">2D area calculations</p>
          </a>
          <a href="/math-tools/volume-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Volume Calculator</p>
            <p className="text-xs text-muted-foreground">3D volume (sphere, cylinder)</p>
          </a>
        </div>
      </section>
    </div>
  );
}
