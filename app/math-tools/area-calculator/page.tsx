"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Shape = "rectangle" | "square" | "triangle" | "circle" | "trapezoid" | "parallelogram" | "rhombus" | "kite" | "ellipse";

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
    formula: "A = length × width",
    formulaDisplay: "A = l × w"
  },
  square: {
    name: "Square",
    inputs: [
      { key: "side", label: "Side Length", placeholder: "e.g., 6" }
    ],
    formula: "A = side²",
    formulaDisplay: "A = s²"
  },
  triangle: {
    name: "Triangle",
    inputs: [
      { key: "base", label: "Base", placeholder: "e.g., 8" },
      { key: "height", label: "Height", placeholder: "e.g., 5" }
    ],
    formula: "A = ½ × base × height",
    formulaDisplay: "A = ½ × b × h"
  },
  circle: {
    name: "Circle",
    inputs: [
      { key: "radius", label: "Radius", placeholder: "e.g., 5" }
    ],
    formula: "A = π × radius²",
    formulaDisplay: "A = πr²"
  },
  trapezoid: {
    name: "Trapezoid",
    inputs: [
      { key: "base1", label: "Base 1 (a)", placeholder: "e.g., 8" },
      { key: "base2", label: "Base 2 (b)", placeholder: "e.g., 12" },
      { key: "height", label: "Height", placeholder: "e.g., 5" }
    ],
    formula: "A = ½ × (base1 + base2) × height",
    formulaDisplay: "A = ½(a + b)h"
  },
  parallelogram: {
    name: "Parallelogram",
    inputs: [
      { key: "base", label: "Base", placeholder: "e.g., 10" },
      { key: "height", label: "Height", placeholder: "e.g., 6" }
    ],
    formula: "A = base × height",
    formulaDisplay: "A = b × h"
  },
  rhombus: {
    name: "Rhombus",
    inputs: [
      { key: "diagonal1", label: "Diagonal 1 (d₁)", placeholder: "e.g., 10" },
      { key: "diagonal2", label: "Diagonal 2 (d₂)", placeholder: "e.g., 8" }
    ],
    formula: "A = ½ × diagonal1 × diagonal2",
    formulaDisplay: "A = ½ × d₁ × d₂"
  },
  kite: {
    name: "Kite",
    inputs: [
      { key: "diagonal1", label: "Diagonal 1 (d₁)", placeholder: "e.g., 12" },
      { key: "diagonal2", label: "Diagonal 2 (d₂)", placeholder: "e.g., 8" }
    ],
    formula: "A = ½ × diagonal1 × diagonal2",
    formulaDisplay: "A = ½ × d₁ × d₂"
  },
  ellipse: {
    name: "Ellipse",
    inputs: [
      { key: "semiMajor", label: "Semi-major Axis (a)", placeholder: "e.g., 8" },
      { key: "semiMinor", label: "Semi-minor Axis (b)", placeholder: "e.g., 5" }
    ],
    formula: "A = π × semi-major × semi-minor",
    formulaDisplay: "A = πab"
  }
};

export default function AreaCalculator() {
  const [shape, setShape] = useState<Shape>("rectangle");
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ area: number; steps: string[] } | null>(null);
  const [error, setError] = useState<string>("");

  const calculateArea = () => {
    setError("");
    setResult(null);

    const config = shapeConfigs[shape];
    const steps: string[] = [];

    steps.push(`Shape: ${config.name}`);
    steps.push(`Formula: ${config.formula}`);
    steps.push("");

    let area: number;

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
        area = length * width;
        steps.push(`Length (l) = ${length}`);
        steps.push(`Width (w) = ${width}`);
        steps.push(`A = l × w = ${length} × ${width} = ${area}`);
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
        area = side * side;
        steps.push(`Side (s) = ${side}`);
        steps.push(`A = s² = ${side}² = ${area}`);
        break;
      }

      case "triangle": {
        const base = parseFloat(values.base);
        const height = parseFloat(values.height);
        if (isNaN(base) || isNaN(height)) {
          setError("Please enter valid numbers for base and height");
          return;
        }
        if (base <= 0 || height <= 0) {
          setError("Base and height must be positive");
          return;
        }
        area = 0.5 * base * height;
        steps.push(`Base (b) = ${base}`);
        steps.push(`Height (h) = ${height}`);
        steps.push(`A = ½ × b × h = ½ × ${base} × ${height} = ${area}`);
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
        area = Math.PI * radius * radius;
        steps.push(`Radius (r) = ${radius}`);
        steps.push(`A = π × r² = π × ${radius}²`);
        steps.push(`A = π × ${radius * radius} ≈ ${area}`);
        break;
      }

      case "trapezoid": {
        const base1 = parseFloat(values.base1);
        const base2 = parseFloat(values.base2);
        const height = parseFloat(values.height);
        if (isNaN(base1) || isNaN(base2) || isNaN(height)) {
          setError("Please enter valid numbers for both bases and height");
          return;
        }
        if (base1 <= 0 || base2 <= 0 || height <= 0) {
          setError("All dimensions must be positive");
          return;
        }
        area = 0.5 * (base1 + base2) * height;
        steps.push(`Base 1 (a) = ${base1}`);
        steps.push(`Base 2 (b) = ${base2}`);
        steps.push(`Height (h) = ${height}`);
        steps.push(`A = ½(a + b)h = ½(${base1} + ${base2}) × ${height}`);
        steps.push(`A = ½(${base1 + base2}) × ${height} = ${area}`);
        break;
      }

      case "parallelogram": {
        const base = parseFloat(values.base);
        const height = parseFloat(values.height);
        if (isNaN(base) || isNaN(height)) {
          setError("Please enter valid numbers for base and height");
          return;
        }
        if (base <= 0 || height <= 0) {
          setError("Base and height must be positive");
          return;
        }
        area = base * height;
        steps.push(`Base (b) = ${base}`);
        steps.push(`Height (h) = ${height}`);
        steps.push(`A = b × h = ${base} × ${height} = ${area}`);
        break;
      }

      case "rhombus": {
        const d1 = parseFloat(values.diagonal1);
        const d2 = parseFloat(values.diagonal2);
        if (isNaN(d1) || isNaN(d2)) {
          setError("Please enter valid numbers for both diagonals");
          return;
        }
        if (d1 <= 0 || d2 <= 0) {
          setError("Diagonals must be positive");
          return;
        }
        area = 0.5 * d1 * d2;
        steps.push(`Diagonal 1 (d₁) = ${d1}`);
        steps.push(`Diagonal 2 (d₂) = ${d2}`);
        steps.push(`A = ½ × d₁ × d₂ = ½ × ${d1} × ${d2} = ${area}`);
        break;
      }

      case "kite": {
        const d1 = parseFloat(values.diagonal1);
        const d2 = parseFloat(values.diagonal2);
        if (isNaN(d1) || isNaN(d2)) {
          setError("Please enter valid numbers for both diagonals");
          return;
        }
        if (d1 <= 0 || d2 <= 0) {
          setError("Diagonals must be positive");
          return;
        }
        area = 0.5 * d1 * d2;
        steps.push(`Diagonal 1 (d₁) = ${d1}`);
        steps.push(`Diagonal 2 (d₂) = ${d2}`);
        steps.push(`A = ½ × d₁ × d₂ = ½ × ${d1} × ${d2} = ${area}`);
        break;
      }

      case "ellipse": {
        const a = parseFloat(values.semiMajor);
        const b = parseFloat(values.semiMinor);
        if (isNaN(a) || isNaN(b)) {
          setError("Please enter valid numbers for both axes");
          return;
        }
        if (a <= 0 || b <= 0) {
          setError("Axes must be positive");
          return;
        }
        area = Math.PI * a * b;
        steps.push(`Semi-major axis (a) = ${a}`);
        steps.push(`Semi-minor axis (b) = ${b}`);
        steps.push(`A = πab = π × ${a} × ${b}`);
        steps.push(`A = π × ${a * b} ≈ ${area}`);
        break;
      }

      default:
        setError("Unknown shape");
        return;
    }

    setResult({ area, steps });
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
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Area Calculator – Find Area of Any 2D Shape Online</h1>
        <p className="text-muted-foreground">
          Calculate the area of any 2D shape with our free online area calculator. Supports circle, rectangle, triangle, trapezoid, parallelogram, and more with formula explanations.
        </p>
      </div>

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
              <SelectItem value="circle">Circle</SelectItem>
              <SelectItem value="trapezoid">Trapezoid</SelectItem>
              <SelectItem value="parallelogram">Parallelogram</SelectItem>
              <SelectItem value="rhombus">Rhombus</SelectItem>
              <SelectItem value="kite">Kite</SelectItem>
              <SelectItem value="ellipse">Ellipse</SelectItem>
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
                onKeyDown={(e) => e.key === "Enter" && calculateArea()}
              />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={calculateArea}>Calculate Area</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-muted-foreground">Examples:</span>
          <Button variant="ghost" size="sm" onClick={() => loadExample("rectangle", { length: "10", width: "5" })}>
            Rectangle 10×5
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("circle", { radius: "7" })}>
            Circle r=7
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("triangle", { base: "8", height: "6" })}>
            Triangle b=8, h=6
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("trapezoid", { base1: "8", base2: "12", height: "5" })}>
            Trapezoid
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("square", { side: "9" })}>
            Square s=9
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("parallelogram", { base: "15", height: "8" })}>
            Parallelogram
          </Button>
          <Button variant="ghost" size="sm" onClick={() => loadExample("ellipse", { semiMajor: "10", semiMinor: "6" })}>
            Ellipse
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
              <p className="text-sm text-muted-foreground mb-2">Area</p>
              <p className="text-5xl font-bold">{result.area.toFixed(4)}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {Number.isInteger(result.area) ? result.area : `${result.area.toFixed(2)} (rounded)`}
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

      <section className="border-t pt-8 space-y-6">
        <h2 className="text-2xl font-semibold">Area Calculator – Find Area of Any 2D Shape Online</h2>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Area measures the space inside a 2D shape. Whether you're calculating floor space for new carpet, figuring out how much paint you need, or solving geometry homework, this calculator handles the most common shapes with clear formulas and step-by-step solutions.
          </p>
          <p className="text-muted-foreground">
            Pick your shape, enter the required dimensions, and get instant results. Each shape uses its specific formula – rectangles multiply length by width, circles use πr², triangles take half the base times height. The calculator shows the formula and walks through each step.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Area Formulas Reference</h3>
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
        <h3 className="text-xl font-semibold">Shape Descriptions</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Rectangle</h4>
            <p className="text-sm text-muted-foreground">
              A four-sided shape with opposite sides equal and all angles 90°. Multiply length by width. A 10 ft by 12 ft room has an area of 120 square feet.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Square</h4>
            <p className="text-sm text-muted-foreground">
              A special rectangle where all four sides are equal. Side squared gives the area. A 6-inch square tile covers 36 square inches.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Triangle</h4>
            <p className="text-sm text-muted-foreground">
              Half of a parallelogram with the same base and height. The height must be perpendicular to the base. Works for any triangle type – right, acute, or obtuse.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Circle</h4>
            <p className="text-sm text-muted-foreground">
              Uses π (pi, approximately 3.14159). The radius is the distance from center to edge. A circle with radius 5 has area π × 25 ≈ 78.54 square units.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Trapezoid</h4>
            <p className="text-sm text-muted-foreground">
              A four-sided shape with one pair of parallel sides (the bases). Average the two bases, then multiply by height. Common in architecture and engineering.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Parallelogram</h4>
            <p className="text-sm text-muted-foreground">
              Opposite sides are parallel and equal. The height is the perpendicular distance between bases, not the slanted side length. Think of it as a "slanted rectangle."
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Rhombus</h4>
            <p className="text-sm text-muted-foreground">
              All four sides equal (like a tilted square). Use the diagonals: half their product gives the area. The diagonals always cross at right angles.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Kite</h4>
            <p className="text-sm text-muted-foreground">
              Two pairs of adjacent equal sides. Same formula as rhombus – half the product of diagonals. Kites have one diagonal that bisects the other at 90°.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Ellipse</h4>
            <p className="text-sm text-muted-foreground">
              An oval or "stretched circle." Uses the semi-major axis (longest radius) and semi-minor axis (shortest radius). Formula is π times both axes.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Rectangle Area</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Find the area of a rectangular garden that is 24 feet long and 15 feet wide.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Length = 24 ft, Width = 15 ft</div>
              <div>A = l × w</div>
              <div>A = 24 × 15</div>
              <div>A = 360 square feet</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Circle Area</h4>
            <p className="text-sm text-muted-foreground mb-2">
              Calculate the area of a circular pizza with a 14-inch diameter.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Diameter = 14 in, so Radius = 7 in</div>
              <div>A = πr²</div>
              <div>A = π × 7²</div>
              <div>A = π × 49</div>
              <div>A ≈ 3.14159 × 49 = 153.94 square inches</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Triangle Area</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A triangular sail has a base of 12 feet and a height of 18 feet. What's its area?
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Base = 12 ft, Height = 18 ft</div>
              <div>A = ½ × b × h</div>
              <div>A = ½ × 12 × 18</div>
              <div>A = 6 × 18 = 108 square feet</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Trapezoid Area</h4>
            <p className="text-sm text-muted-foreground mb-2">
              A trapezoidal table has parallel sides of 36 inches and 48 inches, with a height of 24 inches.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>Base₁ = 36 in, Base₂ = 48 in, Height = 24 in</div>
              <div>A = ½(a + b)h</div>
              <div>A = ½(36 + 48) × 24</div>
              <div>A = ½(84) × 24</div>
              <div>A = 42 × 24 = 1,008 square inches</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 5: Ellipse Area</h4>
            <p className="text-sm text-muted-foreground mb-2">
              An elliptical pool table has a semi-major axis of 5 feet and semi-minor axis of 3 feet.
            </p>
            <div className="font-mono text-xs bg-muted p-3 rounded space-y-1">
              <div>a = 5 ft, b = 3 ft</div>
              <div>A = πab</div>
              <div>A = π × 5 × 3</div>
              <div>A = π × 15 ≈ 47.12 square feet</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <div className="p-4 bg-muted rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Quick Fact</h3>
          <p className="text-sm text-muted-foreground">
            The formula for circle area (A = πr²) was first rigorously proven by Archimedes around 250 BCE. He used the "method of exhaustion," inscribing and circumscribing polygons with increasing numbers of sides around a circle. His approach anticipated calculus by nearly 2,000 years.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What units should I use?</h4>
            <p className="text-sm text-muted-foreground">
              Any consistent units work – inches, feet, meters, centimeters. The area will be in square units (sq in, sq ft, m², etc.). Convert all dimensions to the same unit before calculating.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find the height of a triangle?</h4>
            <p className="text-sm text-muted-foreground">
              The height is the perpendicular distance from the base to the opposite vertex. For right triangles, it's one of the legs. For other triangles, you may need to measure or calculate it separately.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is π used for circles and ellipses?</h4>
            <p className="text-sm text-muted-foreground">
              π (pi) is the ratio of a circle's circumference to its diameter. It appears in circle area because the relationship between radius and area is fundamental to circular geometry. π ≈ 3.14159...
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I calculate irregular shapes?</h4>
            <p className="text-sm text-muted-foreground">
              Break irregular shapes into regular pieces (rectangles, triangles, etc.), calculate each area separately, then add them together. This calculator handles the regular component shapes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between area and perimeter?</h4>
            <p className="text-sm text-muted-foreground">
              Area measures the space inside a shape (square units). Perimeter measures the distance around the outside (linear units). A 4×4 square has area 16 sq units and perimeter 16 units – same number, different meaning.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I calculate the area of a rhombus without diagonals?</h4>
            <p className="text-sm text-muted-foreground">
              If you know the side length and any interior angle, use A = s² × sin(angle). If you know the side and height (perpendicular distance between opposite sides), use A = base × height, same as a parallelogram.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is a square a rectangle?</h4>
            <p className="text-sm text-muted-foreground">
              Yes, a square is a special type of rectangle where all four sides are equal. Both formulas work: you can use length × width (where length = width) or side² – they give the same result.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
