"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Shape = "cube" | "cuboid" | "sphere" | "cylinder" | "cone" | "pyramid" | "hemisphere" | "triangularPrism";

interface ShapeConfig {
  name: string;
  inputs: { key: string; label: string; placeholder: string }[];
  formula: string;
  formulaDisplay: string;
}

const shapeConfigs: Record<Shape, ShapeConfig> = {
  cube: {
    name: "Cube",
    inputs: [
      { key: "side", label: "Side Length", placeholder: "e.g., 5" }
    ],
    formula: "SA = 6 × side²",
    formulaDisplay: "SA = 6s²"
  },
  cuboid: {
    name: "Cuboid (Rectangular Prism)",
    inputs: [
      { key: "length", label: "Length", placeholder: "e.g., 10" },
      { key: "width", label: "Width", placeholder: "e.g., 6" },
      { key: "height", label: "Height", placeholder: "e.g., 4" }
    ],
    formula: "SA = 2(lw + lh + wh)",
    formulaDisplay: "SA = 2(lw + lh + wh)"
  },
  sphere: {
    name: "Sphere",
    inputs: [
      { key: "radius", label: "Radius", placeholder: "e.g., 5" }
    ],
    formula: "SA = 4 × π × radius²",
    formulaDisplay: "SA = 4πr²"
  },
  cylinder: {
    name: "Cylinder",
    inputs: [
      { key: "radius", label: "Radius", placeholder: "e.g., 4" },
      { key: "height", label: "Height", placeholder: "e.g., 10" }
    ],
    formula: "SA = 2πr² + 2πrh",
    formulaDisplay: "SA = 2πr(r + h)"
  },
  cone: {
    name: "Cone",
    inputs: [
      { key: "radius", label: "Radius", placeholder: "e.g., 5" },
      { key: "height", label: "Height", placeholder: "e.g., 12" }
    ],
    formula: "SA = πr² + πrs (where s = slant height)",
    formulaDisplay: "SA = πr(r + s)"
  },
  pyramid: {
    name: "Square Pyramid",
    inputs: [
      { key: "base", label: "Base Side", placeholder: "e.g., 8" },
      { key: "height", label: "Height", placeholder: "e.g., 10" }
    ],
    formula: "SA = base² + 2 × base × slant height",
    formulaDisplay: "SA = b² + 2bs"
  },
  hemisphere: {
    name: "Hemisphere",
    inputs: [
      { key: "radius", label: "Radius", placeholder: "e.g., 5" }
    ],
    formula: "SA = 3 × π × radius²",
    formulaDisplay: "SA = 3πr²"
  },
  triangularPrism: {
    name: "Triangular Prism",
    inputs: [
      { key: "base", label: "Triangle Base", placeholder: "e.g., 6" },
      { key: "height", label: "Triangle Height", placeholder: "e.g., 4" },
      { key: "length", label: "Prism Length", placeholder: "e.g., 10" }
    ],
    formula: "SA = 2 × triangle area + perimeter × length",
    formulaDisplay: "SA = bh + (a+b+c)l"
  }
};

export default function SurfaceAreaCalculator() {
  const [shape, setShape] = useState<Shape>("cube");
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ surfaceArea: number; steps: string[] } | null>(null);
  const [error, setError] = useState<string>("");

  const calculateSurfaceArea = () => {
    setError("");
    setResult(null);

    const config = shapeConfigs[shape];
    const steps: string[] = [];

    steps.push(`Shape: ${config.name}`);
    steps.push(`Formula: ${config.formula}`);
    steps.push("");

    let surfaceArea: number;

    switch (shape) {
      case "cube": {
        const side = parseFloat(values.side);
        if (isNaN(side)) {
          setError("Please enter a valid side length");
          return;
        }
        if (side <= 0) {
          setError("Side length must be positive");
          return;
        }
        surfaceArea = 6 * side * side;
        steps.push(`Side (s) = ${side}`);
        steps.push(`SA = 6s² = 6 × ${side}²`);
        steps.push(`SA = 6 × ${side * side} = ${surfaceArea}`);
        break;
      }

      case "cuboid": {
        const length = parseFloat(values.length);
        const width = parseFloat(values.width);
        const height = parseFloat(values.height);
        if (isNaN(length) || isNaN(width) || isNaN(height)) {
          setError("Please enter valid numbers for all dimensions");
          return;
        }
        if (length <= 0 || width <= 0 || height <= 0) {
          setError("All dimensions must be positive");
          return;
        }
        surfaceArea = 2 * (length * width + length * height + width * height);
        steps.push(`Length (l) = ${length}`);
        steps.push(`Width (w) = ${width}`);
        steps.push(`Height (h) = ${height}`);
        steps.push(`SA = 2(lw + lh + wh)`);
        steps.push(`SA = 2(${length}×${width} + ${length}×${height} + ${width}×${height})`);
        steps.push(`SA = 2(${length*width} + ${length*height} + ${width*height}) = ${surfaceArea}`);
        break;
      }

      case "sphere": {
        const radius = parseFloat(values.radius);
        if (isNaN(radius)) {
          setError("Please enter a valid radius");
          return;
        }
        if (radius <= 0) {
          setError("Radius must be positive");
          return;
        }
        surfaceArea = 4 * Math.PI * radius * radius;
        steps.push(`Radius (r) = ${radius}`);
        steps.push(`SA = 4πr² = 4 × π × ${radius}²`);
        steps.push(`SA = 4π × ${radius * radius} ≈ ${surfaceArea}`);
        break;
      }

      case "cylinder": {
        const radius = parseFloat(values.radius);
        const height = parseFloat(values.height);
        if (isNaN(radius) || isNaN(height)) {
          setError("Please enter valid numbers for radius and height");
          return;
        }
        if (radius <= 0 || height <= 0) {
          setError("Radius and height must be positive");
          return;
        }
        const topArea = Math.PI * radius * radius;
        const sideArea = 2 * Math.PI * radius * height;
        surfaceArea = 2 * topArea + sideArea;
        steps.push(`Radius (r) = ${radius}`);
        steps.push(`Height (h) = ${height}`);
        steps.push(`SA = 2πr² + 2πrh`);
        steps.push(`Top + Bottom = 2 × π × ${radius}² = ${2 * topArea}`);
        steps.push(`Side = 2π × ${radius} × ${height} = ${sideArea}`);
        steps.push(`SA = ${2 * topArea} + ${sideArea} ≈ ${surfaceArea}`);
        break;
      }

      case "cone": {
        const radius = parseFloat(values.radius);
        const height = parseFloat(values.height);
        if (isNaN(radius) || isNaN(height)) {
          setError("Please enter valid numbers for radius and height");
          return;
        }
        if (radius <= 0 || height <= 0) {
          setError("Radius and height must be positive");
          return;
        }
        const slantHeight = Math.sqrt(radius * radius + height * height);
        const baseArea = Math.PI * radius * radius;
        const lateralArea = Math.PI * radius * slantHeight;
        surfaceArea = baseArea + lateralArea;
        steps.push(`Radius (r) = ${radius}`);
        steps.push(`Height (h) = ${height}`);
        steps.push(`Slant height (s) = √(r² + h²) = √(${radius}² + ${height}²) = ${slantHeight.toFixed(4)}`);
        steps.push(`Base area = πr² = π × ${radius}² = ${baseArea.toFixed(4)}`);
        steps.push(`Lateral area = πrs = π × ${radius} × ${slantHeight.toFixed(4)} = ${lateralArea.toFixed(4)}`);
        steps.push(`SA = ${baseArea.toFixed(4)} + ${lateralArea.toFixed(4)} ≈ ${surfaceArea}`);
        break;
      }

      case "pyramid": {
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
        const slantHeight = Math.sqrt(height * height + Math.pow(base / 2, 2));
        const baseArea = base * base;
        const lateralArea = 2 * base * slantHeight;
        surfaceArea = baseArea + lateralArea;
        steps.push(`Base side (b) = ${base}`);
        steps.push(`Height (h) = ${height}`);
        steps.push(`Slant height (s) = √(h² + (b/2)²) = √(${height}² + ${base/2}²) = ${slantHeight.toFixed(4)}`);
        steps.push(`Base area = b² = ${base}² = ${baseArea}`);
        steps.push(`Lateral area = 2bs = 2 × ${base} × ${slantHeight.toFixed(4)} = ${lateralArea.toFixed(4)}`);
        steps.push(`SA = ${baseArea} + ${lateralArea.toFixed(4)} ≈ ${surfaceArea}`);
        break;
      }

      case "hemisphere": {
        const radius = parseFloat(values.radius);
        if (isNaN(radius)) {
          setError("Please enter a valid radius");
          return;
        }
        if (radius <= 0) {
          setError("Radius must be positive");
          return;
        }
        surfaceArea = 3 * Math.PI * radius * radius;
        steps.push(`Radius (r) = ${radius}`);
        steps.push(`SA = 3πr² (curved surface + base)`);
        steps.push(`SA = 3 × π × ${radius}²`);
        steps.push(`SA = 3π × ${radius * radius} ≈ ${surfaceArea}`);
        break;
      }

      case "triangularPrism": {
        const base = parseFloat(values.base);
        const triangleHeight = parseFloat(values.height);
        const length = parseFloat(values.length);
        if (isNaN(base) || isNaN(triangleHeight) || isNaN(length)) {
          setError("Please enter valid numbers for all dimensions");
          return;
        }
        if (base <= 0 || triangleHeight <= 0 || length <= 0) {
          setError("All dimensions must be positive");
          return;
        }
        const triangleArea = 0.5 * base * triangleHeight;
        const sideA = Math.sqrt(Math.pow(base / 2, 2) + Math.pow(triangleHeight, 2));
        const perimeter = base + 2 * sideA;
        surfaceArea = 2 * triangleArea + perimeter * length;
        steps.push(`Triangle base (b) = ${base}`);
        steps.push(`Triangle height (h) = ${triangleHeight}`);
        steps.push(`Prism length (l) = ${length}`);
        steps.push(`Triangle area = ½ × b × h = ½ × ${base} × ${triangleHeight} = ${triangleArea}`);
        steps.push(`Two triangles = 2 × ${triangleArea} = ${2 * triangleArea}`);
        steps.push(`Perimeter = b + 2 × √((b/2)² + h²) ≈ ${perimeter.toFixed(4)}`);
        steps.push(`Rectangular sides = perimeter × length = ${perimeter.toFixed(4)} × ${length} = ${(perimeter * length).toFixed(4)}`);
        steps.push(`SA = ${2 * triangleArea} + ${(perimeter * length).toFixed(4)} ≈ ${surfaceArea}`);
        break;
      }

      default:
        setError("Unknown shape");
        return;
    }

    setResult({ surfaceArea, steps });
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
        <h1 className="text-3xl font-semibold mb-2">Surface Area Calculator – Find Surface Area of Any 3D Shape</h1>
        <p className="text-muted-foreground">
          Calculate the surface area of any 3D geometric shape with our free online surface area calculator. Covers cube, sphere, cylinder, cone, pyramid, and prisms with full formula details.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Surface Area Calculator</CardTitle>
          <CardDescription>
            Select a 3D shape and enter dimensions to calculate total surface area.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>3D Shape</Label>
              <Select value={shape} onValueChange={(v) => { setShape(v as Shape); setValues({}); setResult(null); setError(""); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cube">Cube</SelectItem>
                  <SelectItem value="cuboid">Cuboid (Rectangular Prism)</SelectItem>
                  <SelectItem value="sphere">Sphere</SelectItem>
                  <SelectItem value="cylinder">Cylinder</SelectItem>
                  <SelectItem value="cone">Cone</SelectItem>
                  <SelectItem value="pyramid">Square Pyramid</SelectItem>
                  <SelectItem value="hemisphere">Hemisphere</SelectItem>
                  <SelectItem value="triangularPrism">Triangular Prism</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-2">Formula</div>
              <div className="font-mono text-lg">{shapeConfigs[shape].formulaDisplay}</div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {shapeConfigs[shape].inputs.map((input) => (
                <div key={input.key}>
                  <Label>{input.label}</Label>
                  <Input
                    type="number"
                    placeholder={input.placeholder}
                    value={values[input.key] || ""}
                    onChange={(e) => setValues({ ...values, [input.key]: e.target.value })}
                    onKeyDown={(e) => e.key === "Enter" && calculateSurfaceArea()}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateSurfaceArea}>Calculate Surface Area</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("cube", { side: "6" })}>
                Cube s=6
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("cuboid", { length: "8", width: "5", height: "4" })}>
                Cuboid 8×5×4
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("sphere", { radius: "5" })}>
                Sphere r=5
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("cylinder", { radius: "4", height: "10" })}>
                Cylinder r=4, h=10
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("cone", { radius: "6", height: "8" })}>
                Cone r=6, h=8
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
                  <p className="text-sm text-muted-foreground mb-2">Surface Area</p>
                  <p className="text-5xl font-bold">{result.surfaceArea.toFixed(4)}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {Number.isInteger(result.surfaceArea) ? result.surfaceArea : `${result.surfaceArea.toFixed(2)} (rounded)`}
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
          <h2 className="text-2xl font-semibold mb-3">What Is Surface Area?</h2>
          <p className="text-muted-foreground">
            Surface area measures the total area covering the outside of a 3D object. Think of it as the amount of wrapping paper needed to cover a gift box, or the paint required to coat a sphere. Unlike volume which measures capacity, surface area measures the exposed outer surface.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            This surface area calculator handles common 3D shapes – from basic cubes and spheres to cylinders, cones, and pyramids. Each shape has its own formula based on how its faces are arranged. Enter your dimensions and see the complete breakdown of how each part contributes to the total.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Surface Area Formulas Reference</h3>
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
        <h3 className="text-xl font-semibold">Breaking Down Each Shape</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cube</h4>
            <p className="text-sm text-muted-foreground">
              Six identical square faces. Each face has area s², so total is 6s². A cube with side 5 has surface area 6 × 25 = 150 square units.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cuboid (Rectangular Prism)</h4>
            <p className="text-sm text-muted-foreground">
              Six rectangular faces – three pairs of opposite faces. Add the areas: front/back (lh), left/right (wh), top/bottom (lw), then double. A 10×6×4 box has SA = 2(60 + 40 + 24) = 248 square units.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Sphere</h4>
            <p className="text-sm text-muted-foreground">
              Perfectly round with no edges. Formula is 4πr² – exactly four times the area of a circle with the same radius. A sphere with radius 5 has surface area about 314 square units.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cylinder</h4>
            <p className="text-sm text-muted-foreground">
              Two circular bases plus the curved side. The side "unrolls" into a rectangle with height h and width 2πr (the circumference). Total: 2πr² + 2πrh.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cone</h4>
            <p className="text-sm text-muted-foreground">
              Circular base plus the curved lateral surface. The lateral area uses slant height (s), found via Pythagorean theorem: s = √(r² + h²). Total: πr² + πrs.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Square Pyramid</h4>
            <p className="text-sm text-muted-foreground">
              Square base plus four triangular faces. Each triangle has base b and slant height s. Base area is b², lateral area is 2bs (four triangles, each with area ½bs).
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Hemisphere</h4>
            <p className="text-sm text-muted-foreground">
              Half a sphere plus the circular base. Curved surface is 2πr² (half of 4πr²), base is πr². Total: 3πr². Think of a dome or a bowl.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Triangular Prism</h4>
            <p className="text-sm text-muted-foreground">
              Two triangular bases plus three rectangular sides. Find triangle area, double it, then add the perimeter times length. Works for any triangular cross-section.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Practical Surface Area Examples</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Gift box wrapping</div>
            <div className="text-sm text-muted-foreground">
              Cuboid box: 12" × 8" × 4". SA = 2(96 + 48 + 32) = 352 sq in. Add 10% for overlap: about 387 sq in of wrapping paper.
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Paint for a water tank</div>
            <div className="text-sm text-muted-foreground">
              Spherical tank, radius 1.5m. SA = 4π × 2.25 ≈ 28.3 m². At 10 m² per liter, need about 3 liters of paint for one coat.
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Label for a can</div>
            <div className="text-sm text-muted-foreground">
              Cylinder can, radius 4cm, height 12cm. Lateral area only (no top/bottom): 2π × 4 × 12 ≈ 302 cm² label area.
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Tent fabric needed</div>
            <div className="text-sm text-muted-foreground">
              Square pyramid tent, base 6ft, slant height 5ft. Lateral area = 2 × 6 × 5 = 60 sq ft of fabric (floor not included).
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Dome surface coating</div>
            <div className="text-sm text-muted-foreground">
              Hemispherical dome, radius 3m. SA = 3π × 9 ≈ 85 m². For curved surface only (no base): 2πr² ≈ 57 m².
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between surface area and volume?</h4>
            <p className="text-sm text-muted-foreground">
              Surface area measures the outer covering (square units). Volume measures the space inside (cubic units). A cube with side 4 has SA = 96 sq units and V = 64 cubic units – they measure completely different things.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does a sphere have surface area 4πr²?</h4>
            <p className="text-sm text-muted-foreground">
              Archimedes proved that a sphere's surface area equals four times the area of a great circle (a circle with the same radius). This relationship is unique to spheres and reflects their perfect symmetry.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do I include the base when calculating surface area?</h4>
            <p className="text-sm text-muted-foreground">
              Total surface area includes all faces – bases and lateral surfaces. For some applications (like a tent or open container), you might want lateral area only. This calculator gives total surface area.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find slant height?</h4>
            <p className="text-sm text-muted-foreground">
              For cones and pyramids, slant height is the hypotenuse of a right triangle. For cones: s = √(r² + h²). For square pyramids: s = √(h² + (base/2)²). Use the Pythagorean theorem.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What units should I use?</h4>
            <p className="text-sm text-muted-foreground">
              Any consistent linear units work – inches, feet, centimeters, meters. Surface area will be in square units (sq in, sq ft, m², etc.). Don't mix units within the same calculation.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <a href="/math-tools/volume-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Volume Calculator</p>
            <p className="text-xs text-muted-foreground">3D volume calculations</p>
          </a>
          <a href="/math-tools/perimeter-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Perimeter Calculator</p>
            <p className="text-xs text-muted-foreground">2D perimeter</p>
          </a>
        </div>
      </section>
    </div>
  );
}
