"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Mode = "2d" | "3d";

export default function DistanceBetweenTwoPointsCalculator() {
  const [mode, setMode] = useState<Mode>("2d");
  const [x1, setX1] = useState<string>("");
  const [y1, setY1] = useState<string>("");
  const [z1, setZ1] = useState<string>("");
  const [x2, setX2] = useState<string>("");
  const [y2, setY2] = useState<string>("");
  const [z2, setZ2] = useState<string>("");
  const [result, setResult] = useState<{ distance: number; steps: string[] } | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    setError("");
    setResult(null);

    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);

    if (isNaN(x1Val) || isNaN(y1Val) || isNaN(x2Val) || isNaN(y2Val)) {
      setError("Please enter valid numbers for all coordinates");
      return;
    }

    const steps: string[] = [];
    
    if (mode === "2d") {
      const dx = x2Val - x1Val;
      const dy = y2Val - y1Val;
      const distance = Math.sqrt(dx * dx + dy * dy);

      steps.push("Distance Formula (2D): d = √[(x₂ - x₁)² + (y₂ - y₁)²]");
      steps.push("");
      steps.push(`Point 1: (x₁, y₁) = (${x1Val}, ${y1Val})`);
      steps.push(`Point 2: (x₂, y₂) = (${x2Val}, ${y2Val})`);
      steps.push("");
      steps.push(`Step 1: Find the differences`);
      steps.push(`  Δx = x₂ - x₁ = ${x2Val} - ${x1Val} = ${dx}`);
      steps.push(`  Δy = y₂ - y₁ = ${y2Val} - ${y1Val} = ${dy}`);
      steps.push("");
      steps.push(`Step 2: Square the differences`);
      steps.push(`  (Δx)² = ${dx}² = ${dx * dx}`);
      steps.push(`  (Δy)² = ${dy}² = ${dy * dy}`);
      steps.push("");
      steps.push(`Step 3: Add the squares`);
      steps.push(`  ${dx * dx} + ${dy * dy} = ${dx * dx + dy * dy}`);
      steps.push("");
      steps.push(`Step 4: Take the square root`);
      steps.push(`  d = √${dx * dx + dy * dy} ≈ ${distance.toFixed(4)}`);

      setResult({ distance, steps });
    } else {
      const z1Val = parseFloat(z1);
      const z2Val = parseFloat(z2);

      if (isNaN(z1Val) || isNaN(z2Val)) {
        setError("Please enter valid numbers for all z coordinates");
        return;
      }

      const dx = x2Val - x1Val;
      const dy = y2Val - y1Val;
      const dz = z2Val - z1Val;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      steps.push("Distance Formula (3D): d = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]");
      steps.push("");
      steps.push(`Point 1: (x₁, y₁, z₁) = (${x1Val}, ${y1Val}, ${z1Val})`);
      steps.push(`Point 2: (x₂, y₂, z₂) = (${x2Val}, ${y2Val}, ${z2Val})`);
      steps.push("");
      steps.push(`Step 1: Find the differences`);
      steps.push(`  Δx = x₂ - x₁ = ${x2Val} - ${x1Val} = ${dx}`);
      steps.push(`  Δy = y₂ - y₁ = ${y2Val} - ${y1Val} = ${dy}`);
      steps.push(`  Δz = z₂ - z₁ = ${z2Val} - ${z1Val} = ${dz}`);
      steps.push("");
      steps.push(`Step 2: Square the differences`);
      steps.push(`  (Δx)² = ${dx}² = ${dx * dx}`);
      steps.push(`  (Δy)² = ${dy}² = ${dy * dy}`);
      steps.push(`  (Δz)² = ${dz}² = ${dz * dz}`);
      steps.push("");
      steps.push(`Step 3: Add the squares`);
      steps.push(`  ${dx * dx} + ${dy * dy} + ${dz * dz} = ${dx * dx + dy * dy + dz * dz}`);
      steps.push("");
      steps.push(`Step 4: Take the square root`);
      steps.push(`  d = √${dx * dx + dy * dy + dz * dz} ≈ ${distance.toFixed(4)}`);

      setResult({ distance, steps });
    }
  };

  const reset = () => {
    setX1("");
    setY1("");
    setZ1("");
    setX2("");
    setY2("");
    setZ2("");
    setResult(null);
    setError("");
  };

  const loadExample = (example: { x1: string; y1: string; x2: string; y2: string; z1?: string; z2?: string; mode?: Mode }) => {
    setMode(example.mode || "2d");
    setX1(example.x1);
    setY1(example.y1);
    setX2(example.x2);
    setY2(example.y2);
    setZ1(example.z1 || "");
    setZ2(example.z2 || "");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Distance Between Two Points Calculator – Find Distance Online</h1>
        <p className="text-muted-foreground">
          Find the distance between any two points on a coordinate plane using our free online distance formula calculator. Supports 2D and 3D coordinates with instant accurate results.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Distance Between Two Points Calculator</CardTitle>
          <CardDescription>
            Enter coordinates to calculate the straight-line distance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <Label>Dimension</Label>
              <Select value={mode} onValueChange={(v) => { setMode(v as Mode); setResult(null); setError(""); }}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2d">2D (x, y)</SelectItem>
                  <SelectItem value="3d">3D (x, y, z)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-2">Formula</div>
              <div className="font-mono text-lg">
                {mode === "2d" ? "d = √[(x₂ - x₁)² + (y₂ - y₁)²]" : "d = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]"}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-4">Point 1</h4>
                <div className="space-y-3">
                  <div>
                    <Label>x₁</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 1"
                      step="any"
                      value={x1}
                      onChange={(e) => setX1(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>y₁</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 2"
                      step="any"
                      value={y1}
                      onChange={(e) => setY1(e.target.value)}
                    />
                  </div>
                  {mode === "3d" && (
                    <div>
                      <Label>z₁</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 3"
                        step="any"
                        value={z1}
                        onChange={(e) => setZ1(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-4">Point 2</h4>
                <div className="space-y-3">
                  <div>
                    <Label>x₂</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 4"
                      step="any"
                      value={x2}
                      onChange={(e) => setX2(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>y₂</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 6"
                      step="any"
                      value={y2}
                      onChange={(e) => setY2(e.target.value)}
                    />
                  </div>
                  {mode === "3d" && (
                    <div>
                      <Label>z₂</Label>
                      <Input
                        type="number"
                        placeholder="e.g., 9"
                        step="any"
                        value={z2}
                        onChange={(e) => setZ2(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Distance</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ x1: "1", y1: "2", x2: "4", y2: "6" })}>
                (1,2) to (4,6)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ x1: "-3", y1: "5", x2: "2", y2: "-1" })}>
                (-3,5) to (2,-1)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ x1: "0", y1: "0", x2: "3", y2: "4", mode: "2d" })}>
                (0,0) to (3,4)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ x1: "1", y1: "2", z1: "3", x2: "4", y2: "6", z2: "9", mode: "3d" })}>
                3D: (1,2,3) to (4,6,9)
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
                  <p className="text-sm text-muted-foreground mb-2">Distance</p>
                  <p className="text-5xl font-bold">{result.distance.toFixed(4)}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {Number.isInteger(result.distance) ? result.distance : `${result.distance.toFixed(2)} (rounded)`}
                  </p>
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
        </CardContent>
      </Card>

      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Understanding the Distance Formula</h2>
          <p className="text-muted-foreground">
            The distance formula calculates the straight-line distance between two points on a coordinate plane. It's a direct application of the Pythagorean theorem – imagine drawing a right triangle where the line connecting your points is the hypotenuse.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Whether you're working in 2D (flat plane with x and y coordinates) or 3D (space with x, y, and z), this calculator shows you exactly how the distance is computed. Enter your coordinates and see each step of the calculation.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Distance Formula Explained</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h4 className="font-semibold mb-3">2D Distance Formula</h4>
            <div className="p-4 bg-muted rounded-lg font-mono text-center mb-4">
              d = √[(x₂ - x₁)² + (y₂ - y₁)²]
            </div>
            <p className="text-sm text-muted-foreground">
              The distance equals the square root of the sum of squared differences in x and y coordinates.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h4 className="font-semibold mb-3">3D Distance Formula</h4>
            <div className="p-4 bg-muted rounded-lg font-mono text-center mb-4">
              d = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]
            </div>
            <p className="text-sm text-muted-foreground">
              In 3D space, add the squared difference in z coordinates to the 2D formula.
            </p>
          </div>
        </div>

        <div className="p-6 bg-muted rounded-lg">
          <h4 className="font-semibold mb-4">Why This Formula Works</h4>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              The distance formula comes directly from the Pythagorean theorem. When you have two points, you can draw a right triangle:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>The horizontal leg has length |x₂ - x₁|</li>
              <li>The vertical leg has length |y₂ - y₁|</li>
              <li>The hypotenuse is the distance d between the points</li>
            </ul>
            <p>
              By the Pythagorean theorem: d² = (x₂ - x₁)² + (y₂ - y₁)², so d = √[(x₂ - x₁)² + (y₂ - y₁)²]
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Step-by-Step Calculation Process</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-5 border rounded-lg">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-3">1</div>
            <h4 className="font-semibold text-sm mb-2">Find Differences</h4>
            <p className="text-sm text-muted-foreground">Subtract x coordinates and y coordinates separately: Δx = x₂ - x₁, Δy = y₂ - y₁</p>
          </div>
          <div className="p-5 border rounded-lg">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-3">2</div>
            <h4 className="font-semibold text-sm mb-2">Square Each</h4>
            <p className="text-sm text-muted-foreground">Square both differences: (Δx)² and (Δy)²</p>
          </div>
          <div className="p-5 border rounded-lg">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-3">3</div>
            <h4 className="font-semibold text-sm mb-2">Add Squares</h4>
            <p className="text-sm text-muted-foreground">Add the squared values together: (Δx)² + (Δy)²</p>
          </div>
          <div className="p-5 border rounded-lg">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-3">4</div>
            <h4 className="font-semibold text-sm mb-2">Square Root</h4>
            <p className="text-sm text-muted-foreground">Take the square root of the sum to get the distance</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Real-World Applications</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">GPS and Mapping</h4>
            <p className="text-sm text-muted-foreground">
              GPS systems use the 3D distance formula to calculate distances between your location and destinations. Your phone's coordinates (latitude, longitude, altitude) form one point, and your destination forms another. The straight-line distance helps estimate travel time.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Video Game Development</h4>
            <p className="text-sm text-muted-foreground">
              Games constantly calculate distances between objects – is the player in range to attack? Did the projectile hit the target? Is the camera too close? Every collision detection and proximity check uses the distance formula, often hundreds of times per frame.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Robotics and Automation</h4>
            <p className="text-sm text-muted-foreground">
              Robotic arms calculate distances to determine how far to move. Autonomous vehicles measure distances to obstacles. Drones navigate by computing distances between waypoints. The formula is fundamental to motion planning and obstacle avoidance.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Architecture and Engineering</h4>
            <p className="text-sm text-muted-foreground">
              Architects use the distance formula to calculate beam lengths, diagonal braces, and cable runs. When designing a roof truss or determining the length of a support cable, engineers apply the distance formula to 3D coordinates.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Physics Simulations</h4>
            <p className="text-sm text-muted-foreground">
              Physics engines calculate gravitational forces, electric fields, and magnetic interactions – all of which depend on the distance between objects. The inverse-square law (gravity, light intensity, sound) requires accurate distance calculations.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the distance formula?</h4>
            <p className="text-sm text-muted-foreground">
              The distance formula calculates the straight-line distance between two points. In 2D: d = √[(x₂ - x₁)² + (y₂ - y₁)²]. It's derived from the Pythagorean theorem and works for any two points on a coordinate plane.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can distance be negative?</h4>
            <p className="text-sm text-muted-foreground">
              No. Distance is always positive or zero (when points are identical). The squared terms in the formula ensure the result under the square root is non-negative, and square roots are defined as positive.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between distance and displacement?</h4>
            <p className="text-sm text-muted-foreground">
              Distance is the total length traveled (always positive). Displacement is the straight-line change in position from start to end (can be negative in one dimension). The distance formula gives you the magnitude of displacement.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I find distance in 3D space?</h4>
            <p className="text-sm text-muted-foreground">
              Add the z-coordinate difference to the 2D formula: d = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]. This extends the Pythagorean theorem into three dimensions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if coordinates are negative?</h4>
            <p className="text-sm text-muted-foreground">
              Negative coordinates work exactly the same way. The subtraction handles the signs automatically. For example, distance from (-3, 5) to (2, -1): Δx = 2 - (-3) = 5, Δy = -1 - 5 = -6, so d = √(25 + 36) = √61.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is the distance formula the same as the midpoint formula?</h4>
            <p className="text-sm text-muted-foreground">
              No. The distance formula finds how far apart two points are. The midpoint formula finds the point exactly halfway between them: ((x₁+x₂)/2, (y₁+y₂)/2). They're related but serve different purposes.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
