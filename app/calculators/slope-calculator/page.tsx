"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SlopeCalculator() {
  const [x1, setX1] = useState<string>("");
  const [y1, setY1] = useState<string>("");
  const [x2, setX2] = useState<string>("");
  const [y2, setY2] = useState<string>("");
  const [result, setResult] = useState<{
    slope: number;
    angle: number;
    equation: string;
    yIntercept: number;
    steps: string[];
  } | null>(null);
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

    if (x2Val === x1Val) {
      setError("Vertical line: slope is undefined (division by zero). The line equation is x = " + x1Val);
      return;
    }

    const slope = (y2Val - y1Val) / (x2Val - x1Val);
    const angle = Math.atan(slope) * (180 / Math.PI);
    const yIntercept = y1Val - slope * x1Val;
    
    const slopeDisplay = Number.isFinite(slope) ? slope.toFixed(4) : "undefined";
    const equation = `y = ${slopeDisplay}x ${yIntercept >= 0 ? '+ ' : ''}${yIntercept.toFixed(4)}`;

    const steps: string[] = [];
    steps.push("Slope Formula: m = (y₂ - y₁) / (x₂ - x₁)");
    steps.push("");
    steps.push(`Point 1: (x₁, y₁) = (${x1Val}, ${y1Val})`);
    steps.push(`Point 2: (x₂, y₂) = (${x2Val}, ${y2Val})`);
    steps.push("");
    steps.push("Step 1: Find the change in y (rise)");
    steps.push(`  Δy = y₂ - y₁ = ${y2Val} - ${y1Val} = ${y2Val - y1Val}`);
    steps.push("");
    steps.push("Step 2: Find the change in x (run)");
    steps.push(`  Δx = x₂ - x₁ = ${x2Val} - ${x1Val} = ${x2Val - x1Val}`);
    steps.push("");
    steps.push("Step 3: Calculate slope (rise over run)");
    steps.push(`  m = Δy / Δx = ${y2Val - y1Val} / ${x2Val - x1Val} = ${slopeDisplay}`);
    steps.push("");
    steps.push("Step 4: Find the y-intercept using y = mx + b");
    steps.push(`  b = y₁ - m × x₁ = ${y1Val} - ${slopeDisplay} × ${x1Val} = ${yIntercept.toFixed(4)}`);
    steps.push("");
    steps.push(`Step 5: Write the slope-intercept equation`);
    steps.push(`  y = ${slopeDisplay}x ${yIntercept >= 0 ? '+ ' : ''}${yIntercept.toFixed(4)}`);

    setResult({ slope, angle, equation, yIntercept, steps });
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
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Slope Calculator – Find the Slope of a Line Online</h1>
        <p className="text-muted-foreground">
          Calculate the slope or gradient of any line using two points or a linear equation with our free online slope calculator. Find slope, intercepts, and line equations easily.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Slope Calculator</CardTitle>
          <CardDescription>
            Enter two points to calculate the slope and line equation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="font-semibold text-sm mb-2">Slope Formula</div>
              <div className="font-mono text-lg">m = (y₂ - y₁) / (x₂ - x₁)</div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-4">Point 1 (x₁, y₁)</h4>
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
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-sm mb-4">Point 2 (x₂, y₂)</h4>
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
                      placeholder="e.g., 8"
                      step="any"
                      value={y2}
                      onChange={(e) => setY2(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate Slope</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Examples:</span>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ x1: "1", y1: "2", x2: "4", y2: "8" })}>
                (1,2) and (4,8)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ x1: "-2", y1: "5", x2: "3", y2: "-1" })}>
                (-2,5) and (3,-1)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ x1: "0", y1: "0", x2: "5", y2: "3" })}>
                (0,0) and (5,3)
              </Button>
              <Button variant="ghost" size="sm" onClick={() => loadExample({ x1: "-3", y1: "-1", x2: "2", y2: "4" })}>
                (-3,-1) and (2,4)
              </Button>
            </div>

            {error && (
              <div className="p-4 bg-destructive/10 text-destructive rounded-lg text-sm">
                {error}
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-6 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Slope (m)</p>
                    <p className="text-4xl font-bold">{result.slope.toFixed(4)}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {result.slope > 0 ? "Positive (rising)" : result.slope < 0 ? "Negative (falling)" : "Zero (horizontal)"}
                    </p>
                  </div>
                  <div className="p-6 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Angle</p>
                    <p className="text-4xl font-bold">{result.angle.toFixed(2)}°</p>
                    <p className="text-xs text-muted-foreground mt-2">from horizontal</p>
                  </div>
                </div>

                <div className="p-6 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Line Equation (Slope-Intercept Form)</p>
                  <p className="text-2xl font-bold font-mono">{result.equation}</p>
                  <p className="text-xs text-muted-foreground mt-2">Y-intercept: (0, {result.yIntercept.toFixed(4)})</p>
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
          <h2 className="text-2xl font-semibold mb-3">Understanding Slope</h2>
          <p className="text-muted-foreground">
            Slope measures how steep a line is. It tells you how much the line rises (or falls) for every unit it runs horizontally. A positive slope climbs from left to right; a negative slope descends. Zero slope means a horizontal line; undefined slope means vertical.
          </p>
        </div>

        <div>
          <p className="text-muted-foreground">
            This slope calculator finds the slope from two points, calculates the angle of inclination, and gives you the complete line equation in slope-intercept form (y = mx + b). Enter your coordinates and see each step of the calculation.
          </p>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Slope Formula and Line Equation</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-lg">
            <h4 className="font-semibold mb-3">Slope Formula</h4>
            <div className="p-4 bg-muted rounded-lg font-mono text-center mb-4">
              m = (y₂ - y₁) / (x₂ - x₁)
            </div>
            <p className="text-sm text-muted-foreground">
              Slope equals rise over run – the change in y divided by the change in x between any two points on the line.
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h4 className="font-semibold mb-3">Slope-Intercept Form</h4>
            <div className="p-4 bg-muted rounded-lg font-mono text-center mb-4">
              y = mx + b
            </div>
            <p className="text-sm text-muted-foreground">
              Where m is the slope and b is the y-intercept (where the line crosses the y-axis).
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-5 border rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">m &gt; 0</div>
            <h4 className="font-semibold text-sm mb-2">Positive Slope</h4>
            <p className="text-sm text-muted-foreground">Line rises from left to right. As x increases, y increases.</p>
          </div>
          <div className="p-5 border rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">m &lt; 0</div>
            <h4 className="font-semibold text-sm mb-2">Negative Slope</h4>
            <p className="text-sm text-muted-foreground">Line falls from left to right. As x increases, y decreases.</p>
          </div>
          <div className="p-5 border rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">m = 0</div>
            <h4 className="font-semibold text-sm mb-2">Zero Slope</h4>
            <p className="text-sm text-muted-foreground">Horizontal line. y stays constant regardless of x.</p>
          </div>
          <div className="p-5 border rounded-lg">
            <div className="text-3xl font-bold text-primary mb-2">undefined</div>
            <h4 className="font-semibold text-sm mb-2">Undefined Slope</h4>
            <p className="text-sm text-muted-foreground">Vertical line. x stays constant; slope calculation divides by zero.</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Step-by-Step Calculation</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="p-5 border rounded-lg">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-3">1</div>
            <h4 className="font-semibold text-sm mb-2">Find Rise (Δy)</h4>
            <p className="text-sm text-muted-foreground">Subtract y-coordinates: Δy = y₂ - y₁</p>
          </div>
          <div className="p-5 border rounded-lg">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-3">2</div>
            <h4 className="font-semibold text-sm mb-2">Find Run (Δx)</h4>
            <p className="text-sm text-muted-foreground">Subtract x-coordinates: Δx = x₂ - x₁</p>
          </div>
          <div className="p-5 border rounded-lg">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-3">3</div>
            <h4 className="font-semibold text-sm mb-2">Calculate Slope</h4>
            <p className="text-sm text-muted-foreground">Divide rise by run: m = Δy / Δx</p>
          </div>
          <div className="p-5 border rounded-lg">
            <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mb-3">4</div>
            <h4 className="font-semibold text-sm mb-2">Find Y-Intercept</h4>
            <p className="text-sm text-muted-foreground">Use b = y₁ - m × x₁ to find where line crosses y-axis</p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Worked Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 1: Positive Slope</h4>
            <p className="text-sm text-muted-foreground mb-3">Find the slope between (1, 2) and (4, 8)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Δy = 8 - 2 = 6</div>
              <div>Δx = 4 - 1 = 3</div>
              <div>m = 6/3 = 2</div>
              <div>b = 2 - 2(1) = 0</div>
              <div className="pt-2 font-semibold">Equation: y = 2x</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 2: Negative Slope</h4>
            <p className="text-sm text-muted-foreground mb-3">Find the slope between (-2, 5) and (3, -1)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Δy = -1 - 5 = -6</div>
              <div>Δx = 3 - (-2) = 5</div>
              <div>m = -6/5 = -1.2</div>
              <div>b = 5 - (-1.2)(-2) = 5 - 2.4 = 2.6</div>
              <div className="pt-2 font-semibold">Equation: y = -1.2x + 2.6</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 3: Zero Slope</h4>
            <p className="text-sm text-muted-foreground mb-3">Find the slope between (2, 4) and (7, 4)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Δy = 4 - 4 = 0</div>
              <div>Δx = 7 - 2 = 5</div>
              <div>m = 0/5 = 0</div>
              <div className="pt-2 font-semibold">Equation: y = 4 (horizontal line)</div>
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Example 4: Undefined Slope</h4>
            <p className="text-sm text-muted-foreground mb-3">Find the slope between (3, 1) and (3, 6)</p>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              <div>Δy = 6 - 1 = 5</div>
              <div>Δx = 3 - 3 = 0</div>
              <div className="text-destructive">m = 5/0 → undefined</div>
              <div className="pt-2 font-semibold">Equation: x = 3 (vertical line)</div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Real-World Applications</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Road Grade and Construction</h4>
            <p className="text-sm text-muted-foreground">
              Road signs showing "6% grade" describe slope. A 6% grade means the road rises 6 feet for every 100 feet horizontally. Engineers calculate slope to ensure roads are safe – too steep and vehicles struggle; too flat and water doesn't drain.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Roof Pitch</h4>
            <p className="text-sm text-muted-foreground">
              Roofers express slope as "rise over run" – a 6/12 roof rises 6 inches for every 12 inches horizontally. Steeper roofs shed water and snow better but require more materials and are harder to work on.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Economics and Trends</h4>
            <p className="text-sm text-muted-foreground">
              In graphs showing price over time, slope represents the rate of change. A positive slope means prices are rising; negative means falling. The steeper the slope, the faster the change. Analysts use slope to identify trends.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Physics and Motion</h4>
            <p className="text-sm text-muted-foreground">
              On a position-time graph, slope equals velocity. On a velocity-time graph, slope equals acceleration. Understanding slope is fundamental to analyzing motion in physics.
            </p>
          </div>

          <div className="p-4 border rounded-lg">
            <h4 className="font-semibold text-sm mb-2">Accessibility Ramps</h4>
            <p className="text-sm text-muted-foreground">
              The ADA requires wheelchair ramps to have a maximum slope of 1:12 – one inch of rise for every 12 inches of run. This ensures ramps are usable by people with limited strength or mobility.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t pt-8 space-y-6">
        <h3 className="text-xl font-semibold">Frequently Asked Questions</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the formula for slope?</h4>
            <p className="text-sm text-muted-foreground">
              Slope = (y₂ - y₁) / (x₂ - x₁), also written as rise over run. It measures the steepness of a line by comparing vertical change to horizontal change between two points.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does a positive vs negative slope mean?</h4>
            <p className="text-sm text-muted-foreground">
              Positive slope means the line goes up from left to right (increasing). Negative slope means the line goes down from left to right (decreasing). Zero slope is a horizontal line.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is an undefined slope?</h4>
            <p className="text-sm text-muted-foreground">
              Undefined slope occurs when x₂ = x₁ (vertical line). Division by zero makes the slope undefined. A vertical line has equation x = constant with no y-intercept.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do you find the y-intercept?</h4>
            <p className="text-sm text-muted-foreground">
              Use the formula b = y₁ - m × x₁, where m is the slope and (x₁, y₁) is any point on the line. The y-intercept is where the line crosses the y-axis (x = 0).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What is slope-intercept form?</h4>
            <p className="text-sm text-muted-foreground">
              Slope-intercept form is y = mx + b, where m is the slope and b is the y-intercept. This form makes it easy to graph a line and understand its behavior.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can slope be a fraction or decimal?</h4>
            <p className="text-sm text-muted-foreground">
              Yes. Slope can be any real number – whole numbers, fractions, decimals, positive, negative, or zero. A slope of 2/3 means the line rises 2 units for every 3 units it runs.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
