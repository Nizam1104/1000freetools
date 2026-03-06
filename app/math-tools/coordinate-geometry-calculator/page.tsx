"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CoordinateGeometryCalculator() {
  const [calculation, setCalculation] = useState<"distance" | "midpoint" | "slope" | "line-equation">("distance");
  
  const [x1, setX1] = useState<string>("");
  const [y1, setY1] = useState<string>("");
  const [x2, setX2] = useState<string>("");
  const [y2, setY2] = useState<string>("");

  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const calculateDistance = () => {
    const x1Num = parseFloat(x1);
    const y1Num = parseFloat(y1);
    const x2Num = parseFloat(x2);
    const y2Num = parseFloat(y2);

    if (isNaN(x1Num) || isNaN(y1Num) || isNaN(x2Num) || isNaN(y2Num)) {
      setError("Please enter valid numbers for all coordinates");
      return;
    }

    setError("");
    const distance = Math.sqrt(Math.pow(x2Num - x1Num, 2) + Math.pow(y2Num - y1Num, 2));
    
    setResult({
      distance: distance.toFixed(4),
      exact: `√(${Math.pow(x2Num - x1Num, 2)} + ${Math.pow(y2Num - y1Num, 2)})`,
      steps: [
        `Given points: P₁(${x1Num}, ${y1Num}) and P₂(${x2Num}, ${y2Num})`,
        ``,
        `Distance formula:`,
        `  d = √[(x₂ - x₁)² + (y₂ - y₁)²]`,
        ``,
        `Substitute values:`,
        `  d = √[(${x2Num} - ${x1Num})² + (${y2Num} - ${y1Num})²]`,
        `  d = √[${(x2Num - x1Num).toFixed(2)}² + ${(y2Num - y1Num).toFixed(2)}²]`,
        `  d = √[${Math.pow(x2Num - x1Num, 2).toFixed(4)} + ${Math.pow(y2Num - y1Num, 2).toFixed(4)}]`,
        `  d = √${(Math.pow(x2Num - x1Num, 2) + Math.pow(y2Num - y1Num, 2)).toFixed(4)}`,
        `  d = ${distance.toFixed(4)}`
      ]
    });
  };

  const calculateMidpoint = () => {
    const x1Num = parseFloat(x1);
    const y1Num = parseFloat(y1);
    const x2Num = parseFloat(x2);
    const y2Num = parseFloat(y2);

    if (isNaN(x1Num) || isNaN(y1Num) || isNaN(x2Num) || isNaN(y2Num)) {
      setError("Please enter valid numbers for all coordinates");
      return;
    }

    setError("");
    const midX = (x1Num + x2Num) / 2;
    const midY = (y1Num + y2Num) / 2;
    
    setResult({
      midpoint: { x: midX.toFixed(4), y: midY.toFixed(4) },
      steps: [
        `Given points: P₁(${x1Num}, ${y1Num}) and P₂(${x2Num}, ${y2Num})`,
        ``,
        `Midpoint formula:`,
        `  M = ((x₁ + x₂)/2, (y₁ + y₂)/2)`,
        ``,
        `Calculate x-coordinate:`,
        `  xₘ = (${x1Num} + ${x2Num}) / 2`,
        `  xₘ = ${x1Num + x2Num} / 2`,
        `  xₘ = ${midX.toFixed(4)}`,
        ``,
        `Calculate y-coordinate:`,
        `  yₘ = (${y1Num} + ${y2Num}) / 2`,
        `  yₘ = ${y1Num + y2Num} / 2`,
        `  yₘ = ${midY.toFixed(4)}`,
        ``,
        `Midpoint: M(${midX.toFixed(4)}, ${midY.toFixed(4)})`
      ]
    });
  };

  const calculateSlope = () => {
    const x1Num = parseFloat(x1);
    const y1Num = parseFloat(y1);
    const x2Num = parseFloat(x2);
    const y2Num = parseFloat(y2);

    if (isNaN(x1Num) || isNaN(y1Num) || isNaN(x2Num) || isNaN(y2Num)) {
      setError("Please enter valid numbers for all coordinates");
      return;
    }

    if (x2Num === x1Num) {
      setError("Slope is undefined for vertical lines (x₁ = x₂)");
      return;
    }

    setError("");
    const slope = (y2Num - y1Num) / (x2Num - x1Num);
    const angle = Math.atan(slope) * (180 / Math.PI);
    
    setResult({
      slope: slope.toFixed(4),
      fraction: getSimplifiedFraction(y2Num - y1Num, x2Num - x1Num),
      angle: angle.toFixed(2),
      steps: [
        `Given points: P₁(${x1Num}, ${y1Num}) and P₂(${x2Num}, ${y2Num})`,
        ``,
        `Slope formula:`,
        `  m = (y₂ - y₁) / (x₂ - x₁)`,
        ``,
        `Substitute values:`,
        `  m = (${y2Num} - ${y1Num}) / (${x2Num} - ${x1Num})`,
        `  m = ${y2Num - y1Num} / ${x2Num - x1Num}`,
        `  m = ${slope.toFixed(4)}`,
        ``,
        `Angle of inclination:`,
        `  θ = arctan(m) = arctan(${slope.toFixed(4)})`,
        `  θ = ${angle.toFixed(2)}°`
      ]
    });
  };

  const calculateLineEquation = () => {
    const x1Num = parseFloat(x1);
    const y1Num = parseFloat(y1);
    const x2Num = parseFloat(x2);
    const y2Num = parseFloat(y2);

    if (isNaN(x1Num) || isNaN(y1Num) || isNaN(x2Num) || isNaN(y2Num)) {
      setError("Please enter valid numbers for all coordinates");
      return;
    }

    if (x2Num === x1Num) {
      setResult({
        type: "Vertical Line",
        equation: `x = ${x1Num}`,
        steps: [
          `Given points: P₁(${x1Num}, ${y1Num}) and P₂(${x2Num}, ${y2Num})`,
          ``,
          `Since x₁ = x₂ = ${x1Num}, this is a vertical line.`,
          ``,
          `Equation of vertical line:`,
          `  x = ${x1Num}`,
          ``,
          `Note: Vertical lines have undefined slope.`
        ]
      });
      setError("");
      return;
    }

    setError("");
    const slope = (y2Num - y1Num) / (x2Num - x1Num);
    const yIntercept = y1Num - slope * x1Num;
    const xIntercept = -yIntercept / slope;
    
    setResult({
      type: "Non-vertical Line",
      slopeIntercept: `y = ${slope.toFixed(4)}x + ${yIntercept.toFixed(4)}`,
      pointSlope: `y - ${y1Num} = ${slope.toFixed(4)}(x - ${x1Num})`,
      standard: getSimplifiedStandardForm(slope, yIntercept),
      slope: slope.toFixed(4),
      yIntercept: yIntercept.toFixed(4),
      xIntercept: xIntercept.toFixed(4),
      steps: [
        `Given points: P₁(${x1Num}, ${y1Num}) and P₂(${x2Num}, ${y2Num})`,
        ``,
        `Step 1: Find the slope`,
        `  m = (y₂ - y₁) / (x₂ - x₁)`,
        `  m = (${y2Num} - ${y1Num}) / (${x2Num} - ${x1Num})`,
        `  m = ${slope.toFixed(4)}`,
        ``,
        `Step 2: Use point-slope form`,
        `  y - y₁ = m(x - x₁)`,
        `  y - ${y1Num} = ${slope.toFixed(4)}(x - ${x1Num})`,
        ``,
        `Step 3: Convert to slope-intercept form`,
        `  y = mx + b`,
        `  b = y₁ - mx₁ = ${y1Num} - ${slope.toFixed(4)} × ${x1Num}`,
        `  b = ${yIntercept.toFixed(4)}`,
        `  y = ${slope.toFixed(4)}x + ${yIntercept.toFixed(4)}`,
        ``,
        `Step 4: Find intercepts`,
        `  y-intercept: (0, ${yIntercept.toFixed(4)})`,
        `  x-intercept: (${xIntercept.toFixed(4)}, 0)`
      ]
    });
  };

  const getSimplifiedFraction = (num: number, den: number): string => {
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
    return `${simpNum}/${simpDen}`;
  };

  const getSimplifiedStandardForm = (m: number, b: number): string => {
    const tolerance = 0.0001;
    
    if (Math.abs(m - Math.round(m)) < tolerance && Math.abs(b - Math.round(b)) < tolerance) {
      const a = Math.round(-m);
      const c = Math.round(b);
      if (c >= 0) {
        return `${a}x + y = ${c}`;
      } else {
        return `${a}x + y - ${Math.abs(c)} = 0`;
      }
    }
    
    const a = -m;
    const c = b;
    return `${a.toFixed(2)}x + y = ${c.toFixed(2)}`;
  };

  const calculate = () => {
    setResult(null);
    switch (calculation) {
      case "distance": calculateDistance(); break;
      case "midpoint": calculateMidpoint(); break;
      case "slope": calculateSlope(); break;
      case "line-equation": calculateLineEquation(); break;
    }
  };

  const reset = () => {
    setX1(""); setY1(""); setX2(""); setY2("");
    setResult(null);
    setError("");
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Coordinate Geometry Calculator – Distance, Slope, Midpoint Online</h1>
        <p className="text-muted-foreground">
          Perform all coordinate geometry calculations with our free online calculator. Find distance, midpoint, slope, and line equations for any pair of coordinate points instantly.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coordinate Geometry Calculator</CardTitle>
          <CardDescription>
            Enter two points to calculate distance, midpoint, slope, and line equation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Tabs value={calculation} onValueChange={(v) => setCalculation(v as typeof calculation)}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="distance">Distance</TabsTrigger>
                <TabsTrigger value="midpoint">Midpoint</TabsTrigger>
                <TabsTrigger value="slope">Slope</TabsTrigger>
                <TabsTrigger value="line-equation">Line Equation</TabsTrigger>
              </TabsList>

              <div className="mt-6 space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Point 1:</strong> (x₁, y₁)
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>x₁</Label>
                    <Input type="number" placeholder="e.g., 3" value={x1} onChange={(e) => setX1(e.target.value)} />
                  </div>
                  <div>
                    <Label>y₁</Label>
                    <Input type="number" placeholder="e.g., 4" value={y1} onChange={(e) => setY1(e.target.value)} />
                  </div>
                </div>

                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Point 2:</strong> (x₂, y₂)
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>x₂</Label>
                    <Input type="number" placeholder="e.g., 7" value={x2} onChange={(e) => setX2(e.target.value)} />
                  </div>
                  <div>
                    <Label>y₂</Label>
                    <Input type="number" placeholder="e.g., 1" value={y2} onChange={(e) => setY2(e.target.value)} />
                  </div>
                </div>
              </div>
            </Tabs>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                {error}
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="space-y-6">
                {calculation === "distance" && (
                  <div className="p-6 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Distance</p>
                    <p className="text-4xl font-bold">{result.distance}</p>
                    <p className="text-sm text-muted-foreground mt-2">{result.exact}</p>
                  </div>
                )}

                {calculation === "midpoint" && (
                  <div className="p-6 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Midpoint</p>
                    <p className="text-4xl font-bold">({result.midpoint.x}, {result.midpoint.y})</p>
                  </div>
                )}

                {calculation === "slope" && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-6 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">Slope (m)</p>
                      <p className="text-4xl font-bold">{result.slope}</p>
                      <p className="text-sm text-muted-foreground mt-2">{result.fraction}</p>
                    </div>
                    <div className="p-6 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">Angle</p>
                      <p className="text-4xl font-bold">{result.angle}°</p>
                    </div>
                  </div>
                )}

                {calculation === "line-equation" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Type</p>
                      <p className="text-xl font-semibold">{result.type}</p>
                    </div>
                    {result.slopeIntercept && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Slope-Intercept Form</p>
                        <p className="text-xl font-mono">{result.slopeIntercept}</p>
                      </div>
                    )}
                    {result.pointSlope && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Point-Slope Form</p>
                        <p className="text-xl font-mono">{result.pointSlope}</p>
                      </div>
                    )}
                    {result.standard && (
                      <div className="p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground mb-1">Standard Form</p>
                        <p className="text-xl font-mono">{result.standard}</p>
                      </div>
                    )}
                    {result.xIntercept && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-muted rounded-lg text-center">
                          <p className="text-sm text-muted-foreground mb-1">X-intercept</p>
                          <p className="text-lg font-mono">({result.xIntercept}, 0)</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg text-center">
                          <p className="text-sm text-muted-foreground mb-1">Y-intercept</p>
                          <p className="text-lg font-mono">(0, {result.yIntercept})</p>
                        </div>
                      </div>
                    )}
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
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Coordinate Geometry</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Coordinate geometry connects algebra and geometry. Every point on a plane gets an address: (x, y). The x-coordinate tells you how far left or right. The y-coordinate tells you how far up or down.
          </p>
          <p className="text-sm text-muted-foreground">
            Once you have two points, you can figure out everything about the line connecting them. How far apart are they? That's distance. What's the exact middle? That's the midpoint. How steep is the line? That's the slope. And you can write an equation that describes every single point on that line.
          </p>
          <p className="text-sm text-muted-foreground">
            These calculations show up everywhere. Finding the shortest path between two locations. Determining if a road is steep enough to require warning signs. Programming graphics in video games. Coordinate geometry is the math behind mapping anything in two dimensions.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Formulas at a Glance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Distance Formula</h4>
              <div className="text-sm font-mono bg-muted p-3 rounded mb-2">
                d = √[(x₂ - x₁)² + (y₂ - y₁)²]
              </div>
              <p className="text-xs text-muted-foreground">
                This is just the Pythagorean theorem in disguise. The horizontal and vertical differences form the legs of a right triangle.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Midpoint Formula</h4>
              <div className="text-sm font-mono bg-muted p-3 rounded mb-2">
                M = ((x₁ + x₂)/2, (y₁ + y₂)/2)
              </div>
              <p className="text-xs text-muted-foreground">
                Average the x-coordinates and y-coordinates separately. The midpoint sits exactly halfway between both points.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Slope Formula</h4>
              <div className="text-sm font-mono bg-muted p-3 rounded mb-2">
                m = (y₂ - y₁) / (x₂ - x₁)
              </div>
              <p className="text-xs text-muted-foreground">
                Slope measures steepness. Rise over run. Positive slopes go uphill, negative slopes go downhill. Zero slope means horizontal. Undefined slope means vertical.
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Line Equations</h4>
              <div className="space-y-2 text-sm font-mono bg-muted p-3 rounded mb-2">
                <div>Slope-intercept: y = mx + b</div>
                <div>Point-slope: y - y₁ = m(x - x₁)</div>
                <div>Standard: Ax + By = C</div>
              </div>
              <p className="text-xs text-muted-foreground">
                Different forms for different purposes. Slope-intercept shows the y-intercept directly. Point-slope works when you know one point and the slope.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Worked Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Distance: (1, 2) to (5, 6)</div>
              <div className="font-mono text-xs text-muted-foreground">
                d = √[(5-1)² + (6-2)²]<br />
                d = √[16 + 16] = √32<br />
                d ≈ 5.6569
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Midpoint: (-3, 4) and (7, -2)</div>
              <div className="font-mono text-xs text-muted-foreground">
                M = ((-3+7)/2, (4+(-2))/2)<br />
                M = (4/2, 2/2)<br />
                M = (2, 1)
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Slope: (2, 3) to (8, 9)</div>
              <div className="font-mono text-xs text-muted-foreground">
                m = (9 - 3) / (8 - 2)<br />
                m = 6/6 = 1<br />
                θ = arctan(1) = 45°
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Line through (1, 5) and (3, 9)</div>
              <div className="font-mono text-xs text-muted-foreground">
                m = (9-5)/(3-1) = 4/2 = 2<br />
                b = 5 - 2(1) = 3<br />
                y = 2x + 3
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Vertical line: (4, 1) and (4, 7)</div>
              <div className="font-mono text-xs text-muted-foreground">
                x₁ = x₂ = 4<br />
                Slope is undefined<br />
                Equation: x = 4
              </div>
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
            <h4 className="font-semibold text-sm mb-2">Why is the distance formula related to the Pythagorean theorem?</h4>
            <p className="text-xs text-muted-foreground">
              Draw a right triangle where your two points are at opposite corners. The horizontal leg has length |x₂ - x₁| and the vertical leg has length |y₂ - y₁|. The distance is the hypotenuse. That's exactly what a² + b² = c² calculates.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does a negative slope mean?</h4>
            <p className="text-xs text-muted-foreground">
              Negative slope means the line goes downhill as you move from left to right. For every unit you move right, you go down by the slope amount. A slope of -2 means "down 2 for every 1 right."
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">When is slope undefined?</h4>
            <p className="text-xs text-muted-foreground">
              Vertical lines have undefined slope. The formula divides by (x₂ - x₁), which equals zero for vertical lines. Division by zero is undefined. Think about it: a vertical line is infinitely steep.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Which line equation form should I use?</h4>
            <p className="text-xs text-muted-foreground">
              Slope-intercept (y = mx + b) is best for graphing – you immediately see the slope and where it crosses the y-axis. Point-slope works when you know a point and the slope. Standard form (Ax + By = C) is useful for finding both intercepts.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the midpoint have decimal coordinates?</h4>
            <p className="text-xs text-muted-foreground">
              Absolutely. If you're finding the midpoint of (1, 2) and (4, 7), you get (2.5, 4.5). The midpoint formula just averages the coordinates – averages often produce decimals.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I verify my line equation is correct?</h4>
            <p className="text-xs text-muted-foreground">
              Plug both original points into your equation. If you get y = 2x + 3 and your points were (1, 5) and (3, 9), check: 5 = 2(1) + 3 ✓ and 9 = 2(3) + 3 ✓. Both should satisfy the equation.
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
            <a href="/math-tools/distance-formula-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Distance Formula Calculator</p>
              <p className="text-xs text-muted-foreground">Calculate distance between points</p>
            </a>
            <a href="/math-tools/slope-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Slope Calculator</p>
              <p className="text-xs text-muted-foreground">Find slope and angle</p>
            </a>
            <a href="/math-tools/midpoint-calculator" className="p-4 rounded-lg border hover:bg-muted transition-colors">
              <p className="font-semibold text-sm">Midpoint Calculator</p>
              <p className="text-xs text-muted-foreground">Find the middle point</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
