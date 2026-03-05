"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Shape = "cube" | "cuboid" | "sphere" | "cylinder" | "cone" | "pyramid" | "triangularPrism" | "hemisphere";

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
    formula: "V = side³",
    formulaDisplay: "V = s³"
  },
  cuboid: {
    name: "Cuboid (Rectangular Prism)",
    inputs: [
      { key: "length", label: "Length", placeholder: "e.g., 10" },
      { key: "width", label: "Width", placeholder: "e.g., 6" },
      { key: "height", label: "Height", placeholder: "e.g., 4" }
    ],
    formula: "V = length × width × height",
    formulaDisplay: "V = l × w × h"
  },
  sphere: {
    name: "Sphere",
    inputs: [
      { key: "radius", label: "Radius", placeholder: "e.g., 5" }
    ],
    formula: "V = (4/3) × π × radius³",
    formulaDisplay: "V = (4/3)πr³"
  },
  cylinder: {
    name: "Cylinder",
    inputs: [
      { key: "radius", label: "Radius", placeholder: "e.g., 4" },
      { key: "height", label: "Height", placeholder: "e.g., 10" }
    ],
    formula: "V = π × radius² × height",
    formulaDisplay: "V = πr²h"
  },
  cone: {
    name: "Cone",
    inputs: [
      { key: "radius", label: "Radius", placeholder: "e.g., 5" },
      { key: "height", label: "Height", placeholder: "e.g., 12" }
    ],
    formula: "V = (1/3) × π × radius² × height",
    formulaDisplay: "V = (1/3)πr²h"
  },
  pyramid: {
    name: "Rectangular Pyramid",
    inputs: [
      { key: "length", label: "Base Length", placeholder: "e.g., 8" },
      { key: "width", label: "Base Width", placeholder: "e.g., 6" },
      { key: "height", label: "Height", placeholder: "e.g., 10" }
    ],
    formula: "V = (1/3) × base area × height",
    formulaDisplay: "V = (1/3)lwh"
  },
  triangularPrism: {
    name: "Triangular Prism",
    inputs: [
      { key: "base", label: "Triangle Base", placeholder: "e.g., 6" },
      { key: "height", label: "Triangle Height", placeholder: "e.g., 4" },
      { key: "length", label: "Prism Length", placeholder: "e.g., 10" }
    ],
    formula: "V = (1/2) × base × triangle height × length",
    formulaDisplay: "V = (1/2)bhl"
  },
  hemisphere: {
    name: "Hemisphere",
    inputs: [
      { key: "radius", label: "Radius", placeholder: "e.g., 5" }
    ],
    formula: "V = (2/3) × π × radius³",
    formulaDisplay: "V = (2/3)πr³"
  }
};

export default function VolumeCalculator() {
  const [shape, setShape] = useState<Shape>("cube");
  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ volume: number; steps: string[] } | null>(null);
  const [error, setError] = useState<string>("");

  const calculateVolume = () => {
    setError("");
    setResult(null);

    const config = shapeConfigs[shape];
    const steps: string[] = [];

    steps.push(`Shape: ${config.name}`);
    steps.push(`Formula: ${config.formula}`);
    steps.push("");

    let volume: number;

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
        volume = side * side * side;
        steps.push(`Side (s) = ${side}`);
        steps.push(`V = s³ = ${side}³`);
        steps.push(`V = ${side} × ${side} × ${side} = ${volume}`);
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
        volume = length * width * height;
        steps.push(`Length (l) = ${length}`);
        steps.push(`Width (w) = ${width}`);
        steps.push(`Height (h) = ${height}`);
        steps.push(`V = l × w × h = ${length} × ${width} × ${height} = ${volume}`);
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
        volume = (4/3) * Math.PI * Math.pow(radius, 3);
        steps.push(`Radius (r) = ${radius}`);
        steps.push(`V = (4/3)πr³ = (4/3) × π × ${radius}³`);
        steps.push(`V = (4/3) × π × ${Math.pow(radius, 3)} ≈ ${volume}`);
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
        volume = Math.PI * radius * radius * height;
        steps.push(`Radius (r) = ${radius}`);
        steps.push(`Height (h) = ${height}`);
        steps.push(`V = πr²h = π × ${radius}² × ${height}`);
        steps.push(`V = π × ${radius * radius} × ${height} ≈ ${volume}`);
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
        volume = (1/3) * Math.PI * radius * radius * height;
        steps.push(`Radius (r) = ${radius}`);
        steps.push(`Height (h) = ${height}`);
        steps.push(`V = (1/3)πr²h = (1/3) × π × ${radius}² × ${height}`);
        steps.push(`V = (1/3) × π × ${radius * radius} × ${height} ≈ ${volume}`);
        break;
      }

      case "pyramid": {
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
        volume = (1/3) * length * width * height;
        steps.push(`Base Length (l) = ${length}`);
        steps.push(`Base Width (w) = ${width}`);
        steps.push(`Height (h) = ${height}`);
        steps.push(`Base Area = l × w = ${length} × ${width} = ${length * width}`);
        steps.push(`V = (1/3) × Base Area × h = (1/3) × ${length * width} × ${height} = ${volume}`);
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
        volume = 0.5 * base * triangleHeight * length;
        steps.push(`Triangle Base (b) = ${base}`);
        steps.push(`Triangle Height (h) = ${triangleHeight}`);
        steps.push(`Prism Length (l) = ${length}`);
        steps.push(`Triangle Area = (1/2) × b × h = (1/2) × ${base} × ${triangleHeight} = ${0.5 * base * triangleHeight}`);
        steps.push(`V = Triangle Area × Length = ${0.5 * base * triangleHeight} × ${length} = ${volume}`);
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
        volume = (2/3) * Math.PI * Math.pow(radius, 3);
        steps.push(`Radius (r) = ${radius}`);
        steps.push(`V = (2/3)πr³ = (2/3) × π × ${radius}³`);
        steps.push(`V = (2/3) × π × ${Math.pow(radius, 3)} ≈ ${volume}`);
        break;
      }

      default:
        setError("Unknown shape");
        return;
    }

    setResult({ volume, steps });
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
        <h1 className="text-3xl font-semibold mb-2">Volume Calculator – Compute Volume of 3D Shapes Online</h1>
        <p className="text-muted-foreground">
          Calculate the volume of any 3D shape with our free online volume calculator. Supports cube, sphere, cylinder, cone, pyramid, and more with formula references and instant results.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Volume Calculator</CardTitle>
          <CardDescription>
            Select a 3D shape and enter dimensions to calculate volume.
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
                  <SelectItem value="pyramid">Rectangular Pyramid</SelectItem>
                  <SelectItem value="triangularPrism">Triangular Prism</SelectItem>
                  <SelectItem value="hemisphere">Hemisphere</SelectItem>
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
                    onKeyDown={(e) => e.key === "Enter" && calculateVolume()}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={calculateVolume}>Calculate Volume</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample("cube", { side: "6" })}>
                Cube s=6
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("cuboid", { length: "10", width: "5", height: "3" })}>
                Cuboid 10×5×3
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("sphere", { radius: "4" })}>
                Sphere r=4
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("cylinder", { radius: "5", height: "8" })}>
                Cylinder r=5, h=8
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample("cone", { radius: "6", height: "10" })}>
                Cone r=6, h=10
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
                  <p className="text-sm text-muted-foreground mb-2">Volume</p>
                  <p className="text-5xl font-bold">{result.volume.toFixed(4)}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {Number.isInteger(result.volume) ? result.volume : `${result.volume.toFixed(2)} (rounded)`}
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
          <h2 className="text-2xl font-semibold mb-3">Understanding Volume</h2>
          <p className="text-muted-foreground">
            Volume measures how much space a 3D object occupies. Think of it as the amount of water a container can hold, or the capacity of a box. Volume is measured in cubic units – cubic inches, cubic feet, cubic meters, and so on.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Whether you're sizing a water tank, calculating concrete for a cylindrical pillar, or figuring out how much ice cream fits in a cone, this volume calculator covers the essential 3D shapes. Each formula is shown clearly, with step-by-step working so you understand exactly how the result is derived.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Volume Formulas for 3D Shapes</h3>
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
        <h3 className="text-xl font-semibold">How Volume Works for Each Shape</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cube</h4>
            <p className="text-sm text-muted-foreground">
              All six faces are equal squares. Volume is simply the side length cubed. A cube with 5-inch sides holds 125 cubic inches – whether that's water, sand, or air.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cuboid (Rectangular Prism)</h4>
            <p className="text-sm text-muted-foreground">
              Think of a shoebox or a brick. Multiply length, width, and height. This is the 3D equivalent of a rectangle's area. A 10×6×4 box has volume 240 cubic units.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Sphere</h4>
            <p className="text-sm text-muted-foreground">
              Perfectly round like a basketball. The formula (4/3)πr³ might look intimidating, but it's just scaling the radius cubed by a constant. A sphere with radius 4 has volume about 268 cubic units.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cylinder</h4>
            <p className="text-sm text-muted-foreground">
              A circular prism – like a can or pipe. Base area (πr²) times height. A cylinder with radius 4 and height 10 holds about 503 cubic units.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Cone</h4>
            <p className="text-sm text-muted-foreground">
              Like an ice cream cone or traffic cone. Volume is exactly one-third of a cylinder with the same base and height. That 1/3 factor appears because the cone tapers to a point.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Rectangular Pyramid</h4>
            <p className="text-sm text-muted-foreground">
              Think of the Egyptian pyramids. Square or rectangular base, triangular faces meeting at the apex. Same 1/3 rule as the cone: one-third of base area times height.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Triangular Prism</h4>
            <p className="text-sm text-muted-foreground">
              A triangular tube – like a Toblerone box. Find the triangle's area (½ × base × height), then multiply by the prism length. The cross-section stays constant throughout.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Hemisphere</h4>
            <p className="text-sm text-muted-foreground">
              Half a sphere – like a dome or a bowl. Volume is exactly half of a full sphere: (2/3)πr³. A hemisphere with radius 5 holds about 262 cubic units.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Real-World Volume Calculations</h3>
        <div className="space-y-3">
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Fish tank capacity</div>
            <div className="text-sm text-muted-foreground">
              Rectangular tank: 24" × 12" × 16" = 4,608 cubic inches. Divide by 231 to get gallons: about 20 gallons of water.
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Concrete for a column</div>
            <div className="text-sm text-muted-foreground">
              Cylindrical column, radius 0.3m, height 3m. Volume = π × 0.09 × 3 ≈ 0.85 cubic meters of concrete per column.
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Storage tank volume</div>
            <div className="text-sm text-muted-foreground">
              Spherical tank, radius 2 meters. Volume = (4/3)π × 8 ≈ 33.5 cubic meters. At 1000 L per m³, that's 33,500 liters.
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Ice cream cone</div>
            <div className="text-sm text-muted-foreground">
              Cone with radius 3 cm, height 12 cm. Volume = (1/3)π × 9 × 12 ≈ 113 cubic centimeters (about 113 ml of ice cream).
            </div>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold text-sm mb-1">Moving box capacity</div>
            <div className="text-sm text-muted-foreground">
              Cube box, 18-inch sides. Volume = 18³ = 5,832 cubic inches. Divide by 1,728 for cubic feet: about 3.4 cubic feet.
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What units should I use for volume?</h4>
            <p className="text-sm text-muted-foreground">
              Use consistent linear units for all dimensions. If you enter centimeters, volume will be in cubic centimeters (cm³). Convert to liters (1000 cm³ = 1 L) or other units as needed.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why does the cone formula have 1/3?</h4>
            <p className="text-sm text-muted-foreground">
              A cone occupies exactly one-third the volume of a cylinder with the same base and height. This was proven by Archimedes. You can verify it experimentally by filling a cone with water and pouring it into a matching cylinder – it takes exactly three cones to fill the cylinder.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I convert volume to capacity?</h4>
            <p className="text-sm text-muted-foreground">
              For liquids: 1 cubic centimeter = 1 milliliter, 1000 cm³ = 1 liter. For gallons: 1 cubic inch ≈ 0.00433 gallons, or 231 cubic inches = 1 US gallon. For cubic feet: 1 ft³ ≈ 7.48 gallons.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I find volume from surface area?</h4>
            <p className="text-sm text-muted-foreground">
              For a cube, yes – take the square root of (surface area ÷ 6) to get the side, then cube it. For other shapes, you need more information. Different shapes can have the same surface area but different volumes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between volume and capacity?</h4>
            <p className="text-sm text-muted-foreground">
              Volume measures the space an object occupies. Capacity measures how much a container can hold. A thick-walled box has a certain volume (including the walls) but a smaller capacity (the empty space inside).
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Related Math Tools</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          <a href="/math-tools/surface-area-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Surface Area Calculator</p>
            <p className="text-xs text-muted-foreground">3D surface area</p>
          </a>
          <a href="/math-tools/perimeter-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Perimeter Calculator</p>
            <p className="text-xs text-muted-foreground">2D perimeter</p>
          </a>
          <a href="/unit-converters/volume-converter" className="p-4 rounded-lg border hover:bg-muted transition-colors">
            <p className="font-semibold text-sm">Volume Converter</p>
            <p className="text-xs text-muted-foreground">Unit conversion</p>
          </a>
        </div>
      </section>
    </div>
  );
}
