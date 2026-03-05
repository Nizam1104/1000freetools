"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Shape = "rectangle" | "square" | "triangle" | "circle" | "trapezoid" | "parallelogram" | "rhombus" | "kite" | "regularPolygon";

interface ShapeConfig {
  name: string;
  inputs: { key: string; label: string; placeholder: string }[];
  formula: string;
  formulaDisplay: string;
}

const shapeConfigs: Record<Shape, ShapeConfig> = {
  rectangle: {
    name: "Rectangle",
    inputs: [
      { key: "length", label: "Length", placeholder: "e.g., 10" },
      { key: "width", label: "Width", placeholder: "e.g., 5" }
    ],
    formula: "P = 2 × (length + width)",
    formulaDisplay: "P = 2(l + w)"
  },
  square: {
    name: "Square",
    inputs: [
      { key: "side", label: "Side Length", placeholder: "e.g., 6" }
    ],
    formula: "P = 4 × side",
    formulaDisplay: "P = 4s"
  },
  triangle: {
    name: "Triangle",
    inputs: [
      { key: "a", label: "Side a", placeholder: "e.g., 5" },
      { key: "b", label: "Side b", placeholder: "e.g., 7" },
      { key: "c", label: "Side c", placeholder: "e.g., 8" }
    ],
    formula: "P = a + b + c",
    formulaDisplay: "P = a + b + c"
  },
  circle: {
    name: "Circle (Circumference)",
    inputs: [
      { key: "radius", label: "Radius", placeholder: "e.g., 5" }
    ],
    formula: "P = 2 × π × radius",
    formulaDisplay: "P = 2πr"
  },
  trapezoid: {
    name: "Trapezoid",
    inputs: [
      { key: "a", label: "Base a", placeholder: "e.g., 8" },
      { key: "b", label: "Base b", placeholder: "e.g., 12" },
      { key: "c", label: "Side c", placeholder: "e.g., 5" },
      { key: "d", label: "Side d", placeholder: "e.g., 6" }
    ],
    formula: "P = a + b + c + d",
    formulaDisplay: "P = a + b + c + d"
  },
  parallelogram: {
    name: "Parallelogram",
    inputs: [
      { key: "a", label: "Side a", placeholder: "e.g., 10" },
      { key: "b", label: "Side b", placeholder: "e.g., 6" }
    ],
    formula: "P = 2 × (a + b)",
    formulaDisplay: "P = 2(a + b)"
  },
  rhombus: {
    name: "Rhombus",
    inputs: [
      { key: "side", label: "Side Length", placeholder: "e.g., 7" }
    ],
    formula: "P = 4 × side",
    formulaDisplay: "P = 4s"
  },
  kite: {
    name: "Kite",
    inputs: [
      { key: "a", label: "Side a", placeholder: "e.g., 6" },
      { key: "b", label: "Side b", placeholder: "e.g., 9" }
    ],
    formula: "P = 2 × (a + b)",
    formulaDisplay: "P = 2(a + b)"
  },
  regularPolygon: {
    name: "Regular Polygon",
    inputs: [
      { key: "sides", label: "Number of Sides", placeholder: "e.g., 6" },
      { key: "side", label: "Side Length", placeholder: "e.g., 5" }
    ],
    formula: "P = number of sides × side length",
    formulaDisplay: "P = n × s"
  }
};

export default function PerimeterCalculator() {
  const [shape, setShape] = useState<Shape>("rectangle");
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ perimeter: number; steps: string[] } | null>(null);
  const [error, setError] = useState<string>("");

  const calculatePerimeter = () => {
    setError("");
    setResult(null);

    const config = shapeConfigs[shape];
    const steps: string[] = [];

    steps.push(`Shape: ${config.name}`);
    steps.push(`Formula: ${config.formula}`);
    steps.push("");

    let perimeter: number;

    switch (shape) {
      case "rectangle": {
        const length = parseFloat(values.length);
        const width = parseFloat(values.width);
        if (isNaN(length) || isNaN(width)) {
          setError("Please enter valid numbers for length and width");
          return;
        }
        if (length <= 0 || width <= 0) {
          setError("Length and width must be positive");
          return;
        }
        perimeter = 2 * (length + width);
        steps.push(`Length (l) = ${length}`);
        steps.push(`Width (w) = ${width}`);
        steps.push(`P = 2(l + w) = 2(${length} + ${width})`);
        steps.push(`P = 2(${length + width}) = ${perimeter}`);
        break;
      }

      case "square": {
        const side = parseFloat(values.side);
        if (isNaN(side)) {
          setError("Please enter a valid side length");
          return;
        }
        if (side <= 0) {
          setError("Side length must be positive");
          return;
        }
        perimeter = 4 * side;
        steps.push(`Side (s) = ${side}`);
        steps.push(`P = 4s = 4 × ${side} = ${perimeter}`);
        break;
      }

      case "triangle": {
        const a = parseFloat(values.a);
        const b = parseFloat(values.b);
        const c = parseFloat(values.c);
        if (isNaN(a) || isNaN(b) || isNaN(c)) {
          setError("Please enter valid numbers for all three sides");
          return;
        }
        if (a <= 0 || b <= 0 || c <= 0) {
          setError("All sides must be positive");
          return;
        }
        if (a + b <= c || a + c <= b || b + c <= a) {
          setError("These sides do not form a valid triangle");
          return;
        }
        perimeter = a + b + c;
        steps.push(`Side a = ${a}`);
        steps.push(`Side b = ${b}`);
        steps.push(`Side c = ${c}`);
        steps.push(`P = a + b + c = ${a} + ${b} + ${c} = ${perimeter}`);
        break;
      }

      case "circle": {
        const radius = parseFloat(values.radius);
        if (isNaN(radius)) {
          setError("Please enter a valid radius");
          return;
        }
        if (radius <= 0) {
          setError("Radius must be positive");
          return;
        }
        perimeter = 2 * Math.PI * radius;
        steps.push(`Radius (r) = ${radius}`);
        steps.push(`P = 2πr = 2 × π × ${radius}`);
        steps.push(`P = 2π × ${radius} ≈ ${perimeter}`);
        break;
      }

      case "trapezoid": {
        const a = parseFloat(values.a);
        const b = parseFloat(values.b);
        const c = parseFloat(values.c);
        const d = parseFloat(values.d);
        if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
          setError("Please enter valid numbers for all four sides");
          return;
        }
        if (a <= 0 || b <= 0 || c <= 0 || d <= 0) {
          setError("All sides must be positive");
          return;
        }
        perimeter = a + b + c + d;
        steps.push(`Base a = ${a}`);
        steps.push(`Base b = ${b}`);
        steps.push(`Side c = ${c}`);
        steps.push(`Side d = ${d}`);
        steps.push(`P = a + b + c + d = ${a} + ${b} + ${c} + ${d} = ${perimeter}`);
        break;
      }

      case "parallelogram": {
        const a = parseFloat(values.a);
        const b = parseFloat(values.b);
        if (isNaN(a) || isNaN(b)) {
          setError("Please enter valid numbers for both sides");
          return;
        }
        if (a <= 0 || b <= 0) {
          setError("Sides must be positive");
          return;
        }
        perimeter = 2 * (a + b);
        steps.push(`Side a = ${a}`);
        steps.push(`Side b = ${b}`);
        steps.push(`P = 2(a + b) = 2(${a} + ${b})`);
        steps.push(`P = 2(${a + b}) = ${perimeter}`);
        break;
      }

      case "rhombus": {
        const side = parseFloat(values.side);
        if (isNaN(side)) {
          setError("Please enter a valid side length");
          return;
        }
        if (side <= 0) {
          setError("Side length must be positive");
          return;
        }
        perimeter = 4 * side;
        steps.push(`Side (s) = ${side}`);
        steps.push(`P = 4s = 4 × ${side} = ${perimeter}`);
        break;
      }

      case "kite": {
        const a = parseFloat(values.a);
        const b = parseFloat(values.b);
        if (isNaN(a) || isNaN(b)) {
          setError("Please enter valid numbers for both sides");
          return;
        }
        if (a <= 0 || b <= 0) {
          setError("Sides must be positive");
          return;
        }
        perimeter = 2 * (a + b);
        steps.push(`Side a = ${a}`);
        steps.push(`Side b = ${b}`);
        steps.push(`P = 2(a + b) = 2(${a} + ${b})`);
        steps.push(`P = 2(${a + b}) = ${perimeter}`);
        break;
      }

      case "regularPolygon": {
        const n = parseFloat(values.sides);
        const side = parseFloat(values.side);
        if (isNaN(n) || isNaN(side)) {
          setError("Please enter valid numbers");
          return;
        }
        if (n < 3 || !Number.isInteger(n)) {
          setError("Number of sides must be 3 or greater (whole number)");
          return;
        }
        if (side <= 0) {
          setError("Side length must be positive");
          return;
        }
        perimeter = n * side;
        steps.push(`Number of sides (n) = ${n}`);
        steps.push(`Side length (s) = ${side}`);
        steps.push(`P = n × s = ${n} × ${side} = ${perimeter}`);
        break;
      }

      default:
        setError("Unknown shape");
        return;
    }

    setResult({ perimeter, steps });
  };

  const reset = () => {
    setValues({});
    setResult(null);
    setError("");
  };

  const loadExample = (s: Shape, vals: Record<string, string>) => {
    setShape(s);
    setValues(vals);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Perimeter Calculator – Find Perimeter of Any Shape Online</h1>
        <p className="text-muted-foreground">
          Calculate the perimeter of any 2D shape with our free online perimeter calculator. Covers rectangles, triangles, circles, polygons, and more with step-by-step solutions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Perimeter Calculator</CardTitle>
          <CardDescription>
            Select a shape and enter dimensions to calculate perimeter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Shape</Label>
              <Select value={shape} onValueChange={(v) => { setShape(v as Shape); setValues({}); setResult(null); setError(""); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rectangle">Rectangle</SelectItem>
                  <SelectItem value="square">Square</SelectItem>
                  <SelectItem value="triangle">Triangle</SelectItem>
                  <SelectItem value="circle">Circle (Circumference)</SelectItem>
                  <SelectItem value="trapezoid">Trapezoid</SelectItem>
                  <SelectItem value="parallelogram">Parallelogram</SelectItem>
                  <SelectItem value="rhombus">Rhombus</SelectItem>
                  <SelectItem value="kite">Kite</SelectItem>
                  <SelectItem value="regularPolygon">Regular Polygon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-2">Formula</div>
              <div className="font-mono text-lg">{shapeConfigs[shape].formulaDisplay}</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {shapeConfigs[shape].inputs.map((input) => (
                <div key={input.key}>
                  <Label>{input.label}</Label>
                  <Input
                    type="number"
                    placeholder={input.placeholder}
                    value={values[input.key] || ""}
                    onChange={(e) => setValues({ ...values, [input.key]: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && calculatePerimeter()}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculatePerimeter}>Calculate Perimeter</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("rectangle", { length: "12", width: "8" })}>
                Rectangle 12×8
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("square", { side: "7" })}>
                Square s=7
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("triangle", { a: "5", b: "7", c: "9" })}>
                Triangle 5-7-9
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("circle", { radius: "6" })}>
                Circle r=6
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
                  <p className="text-sm text-muted-foreground mb-2">Perimeter</p>
                  <p className="text-5xl font-bold">{result.perimeter.toFixed(4)}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {Number.isInteger(result.perimeter) ? result.perimeter : `${result.perimeter.toFixed(2)} (rounded)`}
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Calculation Steps</h4>
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
          <h2 className="text-2xl font-semibold mb-3">What Is Perimeter?</h2>
          <p className="text-muted-foreground">
            Perimeter measures the total distance around the outside of a 2D shape. Think of it as the length of fence needed to enclose a yard, or the trim required to frame a picture. Unlike area which measures the space inside, perimeter traces the boundary itself.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            This perimeter calculator handles the shapes you'll encounter most often – from basic rectangles and triangles to circles (where perimeter is called circumference) and regular polygons. Enter your dimensions, get instant results, and see exactly how each formula works step by step.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Perimeter Formulas Reference</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(shapeConfigs).map(([key, config]) => (
            <div key={key} className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-2">{config.name}</h4>
              <div className="font-mono text-xs bg-muted p-2 rounded mb-2">{config.formulaDisplay}</div>
              <div className="text-xs text-muted-foreground">{config.formula}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Shape-by-Shape Breakdown</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Rectangle</h4>
            <p className="text-sm text-muted-foreground">
              Opposite sides are equal. Add length and width, then double it. A 12 ft by 8 ft room needs 40 ft of baseboard (2 × (12 + 8) = 40).
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Square</h4>
            <p className="text-sm text-muted-foreground">
              All four sides equal. Multiply one side by 4. A square garden with 7-meter sides requires 28 meters of fencing.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Triangle</h4>
            <p className="text-sm text-muted-foreground">
              Add all three sides. Works for any triangle – equilateral, isosceles, or scalene. The triangle inequality must hold: any two sides combined must exceed the third.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Circle (Circumference)</h4>
            <p className="text-sm text-muted-foreground">
              For circles, perimeter is called circumference. Formula is 2πr. A circle with radius 6 has circumference about 37.7 units. π (pi) ≈ 3.14159.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Trapezoid</h4>
            <p className="text-sm text-muted-foreground">
              Four sides with one pair parallel. Add all four side lengths. Unlike area, you don't need the height – just the actual side measurements.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Parallelogram</h4>
            <p className="text-sm text-muted-foreground">
              Opposite sides are equal and parallel. Double the sum of adjacent sides. Think of it as a "pushed" rectangle – perimeter stays the same even when slanted.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Rhombus</h4>
            <p className="text-sm text-muted-foreground">
              All four sides equal (like a square that's been tilted). Same formula as square: 4 times one side. Diagonals cross at right angles but aren't needed for perimeter.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Kite</h4>
            <p className="text-sm text-muted-foreground">
              Two pairs of adjacent equal sides. Double the sum of the two different side lengths. Kites have one pair of equal angles where the unequal sides meet.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Regular Polygon</h4>
            <p className="text-sm text-muted-foreground">
              All sides and angles equal. Multiply the number of sides by one side length. A regular hexagon with 5-unit sides has perimeter 30 units.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Practical Examples</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Fencing a rectangular yard</div>
            <div className="text-sm text-muted-foreground">
              Yard is 25 ft × 15 ft. Perimeter = 2(25 + 15) = 80 ft of fencing needed. Add 10% for gate and waste: 88 ft total.
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Picture frame trim</div>
            <div className="text-sm text-muted-foreground">
              Square frame, 16-inch sides. Perimeter = 4 × 16 = 64 inches of trim. At $2 per inch, trim costs $128.
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Running track distance</div>
            <div className="text-sm text-muted-foreground">
              Circular track, radius 50 meters. One lap = 2π × 50 ≈ 314 meters. About 3.2 laps per kilometer.
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Hexagonal garden bed</div>
            <div className="text-sm text-muted-foreground">
              Regular hexagon, each side 4 feet. Perimeter = 6 × 4 = 24 feet of edging material.
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Kite framing</div>
            <div className="text-sm text-muted-foreground">
              Kite with sides 30 cm and 45 cm. Perimeter = 2(30 + 45) = 150 cm of border ribbon.
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between perimeter and area?</h4>
            <p className="text-sm text-muted-foreground">
              Perimeter measures the boundary (linear units like feet or meters). Area measures the space inside (square units like sq ft or m²). A 4×4 square has perimeter 16 units and area 16 sq units – same number, completely different meaning.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is circle perimeter called circumference?</h4>
            <p className="text-sm text-muted-foreground">
              "Circumference" comes from Latin meaning "to carry around." It's the same concept as perimeter but specifically for circles. The formula uses π because the ratio of circumference to diameter is always π for any circle.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can perimeter be used for irregular shapes?</h4>
            <p className="text-sm text-muted-foreground">
              Yes – add up all the side lengths. For irregular shapes without straight sides, you may need to measure or approximate. This calculator handles regular geometric shapes with defined formulas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What units should I use?</h4>
            <p className="text-sm text-muted-foreground">
              Any consistent linear units work – inches, feet, centimeters, meters. The perimeter will be in the same units you entered. Don't mix units (e.g., don't enter length in feet and width in inches).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find perimeter if I only know area?</h4>
            <p className="text-sm text-muted-foreground">
              For squares, take the square root of area to get side, then multiply by 4. For other shapes, you need more information. A rectangle with area 100 could be 10×10 (perimeter 40) or 5×20 (perimeter 50) – same area, different perimeters.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/area-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Area Calculator</p>
            <p className="text-xs text-muted-foreground">Calculate area of 2D shapes</p>
          </a>
          <a href="/calculators/volume-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Volume Calculator</p>
            <p className="text-xs text-muted-foreground">3D shape volume</p>
          </a>
          <a href="/unit-converters/length-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Length Converter</p>
            <p className="text-xs text-muted-foreground">Unit conversion</p>
          </a>
        </div>
      </section>
    </div>
  );
}
