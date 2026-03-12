"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function MidpointCalculator() {
  const [x1, setX1] = useState<string>("");
  const [y1, setY1] = useState<string>("");
  const [x2, setX2] = useState<string>("");
  const [y2, setY2] = useState<string>("");
  const [result, setResult] = useState<{ midpoint: { x: number; y: number }; steps: string[] } | null>(null);
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

    const midX = (x1Val + x2Val) / 2;
    const midY = (y1Val + y2Val) / 2;

    const steps: string[] = [];
    steps.push("Midpoint Formula: M = ((x₁ + x₂)/2, (y₁ + y₂)/2)");
    steps.push("");
    steps.push(`Point 1: (x₁, y₁) = (${x1Val}, ${y1Val})`);
    steps.push(`Point 2: (x₂, y₂) = (${x2Val}, ${y2Val})`);
    steps.push("");
    steps.push("Step 1: Add the x-coordinates");
    steps.push(`  x₁ + x₂ = ${x1Val} + ${x2Val} = ${x1Val + x2Val}`);
    steps.push("");
    steps.push("Step 2: Divide by 2 to find midpoint x");
    steps.push(`  (x₁ + x₂)/2 = ${x1Val + x2Val}/2 = ${midX}`);
    steps.push("");
    steps.push("Step 3: Add the y-coordinates");
    steps.push(`  y₁ + y₂ = ${y1Val} + ${y2Val} = ${y1Val + y2Val}`);
    steps.push("");
    steps.push("Step 4: Divide by 2 to find midpoint y");
    steps.push(`  (y₁ + y₂)/2 = ${y1Val + y2Val}/2 = ${midY}`);
    steps.push("");
    steps.push(`Midpoint M = (${midX}, ${midY})`);

    setResult({ midpoint: { x: midX, y: midY }, steps });
  };

  const reset = () => {
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setResult(null);
    setError("");
  };

  const loadExample = (example: { x1: string; y1: string; x2: string; y2: string }) => {
    setX1(example.x1);
    setY1(example.y1);
    setX2(example.x2);
    setY2(example.y2);
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Midpoint Calculator – Find the Midpoint of a Line Segment</h1>
        <p className="text-muted-foreground">
          Calculate the midpoint between any two coordinate points with our free online midpoint calculator. Get the exact midpoint coordinates with the midpoint formula shown clearly.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Midpoint Calculator</CardTitle>
          <CardDescription>
            Enter two endpoints to find the midpoint of the line segment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-2">Formula</div>
              <div className="font-mono text-lg">M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-4">Point 1 (x₁, y₁)</h4>
                <div className="space-y-3">
                  <div>
                    <Label>x₁</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 2"
                      step="any"
                      value={x1}
                      onChange={(e) => setX1(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>y₁</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 4"
                      step="any"
                      value={y1}
                      onChange={(e) => setY1(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-4">Point 2 (x₂, y₂)</h4>
                <div className="space-y-3">
                  <div>
                    <Label>x₂</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 8"
                      step="any"
                      value={x2}
                      onChange={(e) => setX2(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>y₂</Label>
                    <Input
                      type="number"
                      placeholder="e.g., 10"
                      step="any"
                      value={y2}
                      onChange={(e) => setY2(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Midpoint</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ x1: "2", y1: "4", x2: "8", y2: "10" })}>
                (2,4) and (8,10)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ x1: "-5", y1: "3", x2: "7", y2: "-1" })}>
                (-5,3) and (7,-1)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ x1: "0", y1: "0", x2: "10", y2: "6" })}>
                (0,0) and (10,6)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ x1: "-4", y1: "-2", x2: "4", y2: "2" })}>
                (-4,-2) and (4,2)
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
                  <p className="text-sm text-muted-foreground mb-2">Midpoint Coordinates</p>
                  <p className="text-5xl font-bold font-mono">({result.midpoint.x}, {result.midpoint.y})</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    M = ({Number.isInteger(result.midpoint.x) ? result.midpoint.x : result.midpoint.x.toFixed(2)}, {Number.isInteger(result.midpoint.y) ? result.midpoint.y : result.midpoint.y.toFixed(2)})
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
          <h2 className="text-2xl font-semibold mb-3">What Is a Midpoint?</h2>
          <p className="text-muted-foreground">
            The midpoint is the exact center of a line segment – the point that divides the segment into two equal halves. It sits precisely halfway between the endpoints, equidistant from both. Think of it as the balance point if the line were a physical rod.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            Finding the midpoint is straightforward: average the x-coordinates and average the y-coordinates. This calculator shows you each step, so you understand exactly how the midpoint coordinates are derived from your endpoints.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">The Midpoint Formula</h3>

        <div className="p-6 bg-muted rounded-lg">
          <div className="font-mono text-2xl text-center mb-4">M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</div>
          <p className="text-sm text-muted-foreground text-center">
            The midpoint M has coordinates that are the averages of the corresponding endpoint coordinates.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-3">X-Coordinate of Midpoint</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-3">x = (x₁ + x₂)/2</div>
            <p className="text-sm text-muted-foreground">
              Add the x-coordinates of both endpoints, then divide by 2. This gives you the horizontal position exactly halfway between them.
            </p>
          </div>

          <div className="p-5 border rounded-lg">
            <h4 className="font-semibold mb-3">Y-Coordinate of Midpoint</h4>
            <div className="font-mono text-sm bg-muted p-3 rounded mb-3">y = (y₁ + y₂)/2</div>
            <p className="text-sm text-muted-foreground">
              Add the y-coordinates of both endpoints, then divide by 2. This gives you the vertical position exactly halfway between them.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">How to Find the Midpoint</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-5 border rounded-lg">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-3">1</div>
            <h4 className="font-semibold text-sm mb-2">Identify Coordinates</h4>
            <p className="text-sm text-muted-foreground">Write down the coordinates of both endpoints: (x₁, y₁) and (x₂, y₂)</p>
          </div>
          <div className="p-5 border rounded-lg">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-3">2</div>
            <h4 className="font-semibold text-sm mb-2">Average X Values</h4>
            <p className="text-sm text-muted-foreground">Add x₁ and x₂, then divide by 2 to get the midpoint's x-coordinate</p>
          </div>
          <div className="p-5 border rounded-lg">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-3">3</div>
            <h4 className="font-semibold text-sm mb-2">Average Y Values</h4>
            <p className="text-sm text-muted-foreground">Add y₁ and y₂, then divide by 2 to get the midpoint's y-coordinate</p>
          </div>
          <div className="p-5 border rounded-lg">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-3">4</div>
            <h4 className="font-semibold text-sm mb-2">Write the Point</h4>
            <p className="text-sm text-muted-foreground">Combine the results as an ordered pair: M = (x, y)</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Basic Midpoint</h4>
            <p className="text-sm text-muted-foreground mb-3">Find the midpoint between A(2, 4) and B(8, 10)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>x = (2 + 8)/2 = 10/2 = 5</div>
              <div>y = (4 + 10)/2 = 14/2 = 7</div>
              <div className="pt-2 font-semibold">Midpoint M = (5, 7)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Negative Coordinates</h4>
            <p className="text-sm text-muted-foreground mb-3">Find the midpoint between P(-5, 3) and Q(7, -1)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>x = (-5 + 7)/2 = 2/2 = 1</div>
              <div>y = (3 + (-1))/2 = 2/2 = 1</div>
              <div className="pt-2 font-semibold">Midpoint M = (1, 1)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Decimal Result</h4>
            <p className="text-sm text-muted-foreground mb-3">Find the midpoint between R(1, 2) and S(4, 7)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>x = (1 + 4)/2 = 5/2 = 2.5</div>
              <div>y = (2 + 7)/2 = 9/2 = 4.5</div>
              <div className="pt-2 font-semibold">Midpoint M = (2.5, 4.5)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Same X or Y</h4>
            <p className="text-sm text-muted-foreground mb-3">Find the midpoint between U(3, 1) and V(3, 9) – vertical line</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>x = (3 + 3)/2 = 6/2 = 3</div>
              <div>y = (1 + 9)/2 = 10/2 = 5</div>
              <div className="pt-2 font-semibold">Midpoint M = (3, 5)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Real-World Applications</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Finding Center Points</h4>
            <p className="text-sm text-muted-foreground">
              Architects and engineers use the midpoint formula to locate the center of beams, walls, or structural elements. When placing a support column exactly between two others, or centering a window in a wall, the midpoint formula gives precise coordinates.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Computer Graphics and Animation</h4>
            <p className="text-sm text-muted-foreground">
              Animation software calculates midpoints for smooth transitions. When an object moves from point A to point B, the midpoint represents the halfway position. This is essential for interpolation, morphing, and creating fluid motion paths.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Navigation and Mapping</h4>
            <p className="text-sm text-muted-foreground">
              GPS systems use midpoint calculations to find meeting points between two locations. Ride-sharing apps calculate pickup points. Delivery services optimize routes by finding central locations between multiple stops.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Geometry Constructions</h4>
            <p className="text-sm text-muted-foreground">
              The midpoint is fundamental to geometric constructions. It's used to find the center of circles, construct perpendicular bisectors, locate centroids of triangles, and divide segments into equal parts. Many geometric proofs rely on midpoint properties.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Physics and Motion</h4>
            <p className="text-sm text-muted-foreground">
              In physics, the midpoint represents the average position of an object moving at constant velocity. If you know the starting and ending positions, the midpoint tells you where the object was at the halfway time point.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the midpoint formula?</h4>
            <p className="text-sm text-muted-foreground">
              The midpoint formula finds the center point of a line segment: M = ((x₁ + x₂)/2, (y₁ + y₂)/2). You average the x-coordinates and average the y-coordinates to get the midpoint's coordinates.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can a midpoint have decimal coordinates?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. When the sum of coordinates is odd, dividing by 2 gives a decimal or fraction. For example, the midpoint of (1, 2) and (4, 7) is (2.5, 4.5). This is perfectly valid.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if both points have the same x or y coordinate?</h4>
            <p className="text-sm text-muted-foreground">
              The formula still works. For a vertical line (same x), the midpoint has that same x-coordinate. For a horizontal line (same y), the midpoint has that same y-coordinate. The midpoint lies on the line segment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Is the midpoint always equidistant from both endpoints?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. By definition, the midpoint divides the segment into two equal parts. The distance from the midpoint to each endpoint is exactly half the total length of the segment.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How is the midpoint different from the distance formula?</h4>
            <p className="text-sm text-muted-foreground">
              The midpoint formula finds a point (coordinates). The distance formula finds a length (a number). Midpoint tells you where the center is; distance tells you how far apart the points are.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I find the midpoint in 3D space?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Extend the formula to include z-coordinates: M = ((x₁ + x₂)/2, (y₁ + y₂)/2, (z₁ + z₂)/2). The same averaging principle applies in three dimensions.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
