"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  } | null>(null);

  const calculate = () => {
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);
    
    if (!isNaN(x1Val) && !isNaN(y1Val) && !isNaN(x2Val) && !isNaN(y2Val) && x2Val !== x1Val) {
      const slope = (y2Val - y1Val) / (x2Val - x1Val);
      const angle = Math.atan(slope) * (180 / Math.PI);
      const yIntercept = y1Val - slope * x1Val;
      const equation = `y = ${slope.toFixed(4)}x ${yIntercept >= 0 ? '+' : ''}${yIntercept.toFixed(4)}`;
      
      setResult({ slope, angle, equation, yIntercept });
    }
  };

  const reset = () => {
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Slope Calculator</CardTitle>
          <CardDescription>Calculate slope and line equation from two points</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono text-sm">
              m = (y₂ - y₁) / (x₂ - x₁)
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Point 1 (x₁, y₁)</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="x₁"
                    step="any"
                    value={x1}
                    onChange={(e) => setX1(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="y₁"
                    step="any"
                    value={y1}
                    onChange={(e) => setY1(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Point 2 (x₂, y₂)</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="x₂"
                    step="any"
                    value={x2}
                    onChange={(e) => setX2(e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="y₂"
                    step="any"
                    value={y2}
                    onChange={(e) => setY2(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Slope (m)</p>
                    <p className="text-xl font-semibold">{result.slope.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Angle</p>
                    <p className="text-xl font-semibold">{result.angle.toFixed(2)}°</p>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Line Equation</p>
                  <p className="text-lg font-mono">{result.equation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Y-Intercept</p>
                  <p className="text-lg">(0, {result.yIntercept.toFixed(4)})</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How to Calculate Slope</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
              <h3 className="font-semibold mb-2">Enter First Point</h3>
              <p className="text-sm text-muted-foreground">Input the x and y coordinates of your first point (x₁, y₁).</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
              <h3 className="font-semibold mb-2">Enter Second Point</h3>
              <p className="text-sm text-muted-foreground">Input the x and y coordinates of your second point (x₂, y₂).</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
              <h3 className="font-semibold mb-2">Get Slope and Equation</h3>
              <p className="text-sm text-muted-foreground">View the slope value, angle, y-intercept, and complete line equation.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Features of This Slope Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Complete Slope Analysis
              </h3>
              <p className="text-sm text-muted-foreground">Calculates slope value, angle of inclination, and y-intercept from any two points.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Line Equation Display
              </h3>
              <p className="text-sm text-muted-foreground">Shows the complete slope-intercept form equation (y = mx + b) for your line.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Angle Calculation
              </h3>
              <p className="text-sm text-muted-foreground">Converts slope to degrees showing the angle of inclination from horizontal.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Step-by-Step Formula
              </h3>
              <p className="text-sm text-muted-foreground">Displays the slope formula m = (y₂ - y₁) / (x₂ - x₁) for reference and learning.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">✓</span>
                Decimal Precision
              </h3>
              <p className="text-sm text-muted-foreground">Results shown to 4 decimal places for accuracy in mathematical applications.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Frequently Asked Questions About Slope</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is the formula for slope?</h3>
              <p className="text-sm text-muted-foreground">Slope = (y₂ - y₁) / (x₂ - x₁), also written as rise over run. It measures the steepness of a line by comparing vertical change to horizontal change between two points.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What does a positive vs negative slope mean?</h3>
              <p className="text-sm text-muted-foreground">Positive slope means the line goes up from left to right (increasing). Negative slope means the line goes down from left to right (decreasing). Zero slope is a horizontal line.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is an undefined slope?</h3>
              <p className="text-sm text-muted-foreground">Undefined slope occurs when x₂ = x₁ (vertical line). Division by zero makes the slope undefined. A vertical line has equation x = constant with no y-intercept.</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">How do you find the y-intercept?</h3>
              <p className="text-sm text-muted-foreground">Use the formula b = y₁ - m × x₁, where m is the slope and (x₁, y₁) is any point on the line. The y-intercept is where the line crosses the y-axis (x = 0).</p>
            </div>
            <div className="p-5 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2">What is slope-intercept form?</h3>
              <p className="text-sm text-muted-foreground">Slope-intercept form is y = mx + b, where m is the slope and b is the y-intercept. This form makes it easy to graph a line and understand its behavior.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Tools Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Related Math Calculators</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/distance-formula-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
              <h3 className="font-semibold mb-2">Distance Formula Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate the distance between two points on a coordinate plane.</p>
            </a>
            <a href="/calculators/midpoint-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
              <h3 className="font-semibold mb-2">Midpoint Calculator</h3>
              <p className="text-sm text-muted-foreground">Find the midpoint between two coordinates on a graph.</p>
            </a>
            <a href="/calculators/pythagorean-theorem-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
              <h3 className="font-semibold mb-2">Pythagorean Theorem Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate the sides of a right triangle using a² + b² = c².</p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
