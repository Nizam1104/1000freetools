"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DistanceFormulaCalculator() {
  const [x1, setX1] = useState<string>("");
  const [y1, setY1] = useState<string>("");
  const [x2, setX2] = useState<string>("");
  const [y2, setY2] = useState<string>("");
  const [result, setResult] = useState<{ distance: number; midpoint: { x: number; y: number } } | null>(null);

  const calculate = () => {
    const x1Val = parseFloat(x1);
    const y1Val = parseFloat(y1);
    const x2Val = parseFloat(x2);
    const y2Val = parseFloat(y2);

    if (!isNaN(x1Val) && !isNaN(y1Val) && !isNaN(x2Val) && !isNaN(y2Val)) {
      const distance = Math.sqrt(Math.pow(x2Val - x1Val, 2) + Math.pow(y2Val - y1Val, 2));
      const midpoint = {
        x: (x1Val + x2Val) / 2,
        y: (y1Val + y2Val) / 2
      };
      setResult({ distance, midpoint });
    }
  };

  const reset = () => {
    setX1("");
    setY1("");
    setX2("");
    setY2("");
    setResult(null);
  };

  const exampleProblems = [
    { p1: "(0, 0)", p2: "(3, 4)", x1: "0", y1: "0", x2: "3", y2: "4", distance: "5.0000", midpoint: "(1.5, 2)" },
    { p1: "(1, 2)", p2: "(5, 6)", x1: "1", y1: "2", x2: "5", y2: "6", distance: "5.6569", midpoint: "(3, 4)" },
    { p1: "(-2, -3)", p2: "(2, 3)", x1: "-2", y1: "-3", x2: "2", y2: "3", distance: "7.2111", midpoint: "(0, 0)" },
    { p1: "(5, -1)", p2: "(-3, 4)", x1: "5", y1: "-1", x2: "-3", y2: "4", distance: "9.4340", midpoint: "(1, 1.5)" },
  ];

  const loadExample = (ex: typeof exampleProblems[0]) => {
    setX1(ex.x1);
    setY1(ex.y1);
    setX2(ex.x2);
    setY2(ex.y2);
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono text-sm">
              d = √[(x₂-x₁)² + (y₂-y₁)²]
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
                <div>
                  <p className="text-sm text-muted-foreground">Distance</p>
                  <p className="text-2xl font-semibold">{result.distance.toFixed(4)}</p>
                </div>
                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">Midpoint</p>
                  <p className="text-lg">({result.midpoint.x.toFixed(4)}, {result.midpoint.y.toFixed(4)})</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Enter the coordinates of your first point (x₁, y₁) in the input fields.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Enter the coordinates of your second point (x₂, y₂).
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Click Calculate to see the distance and the midpoint between the two points.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Why Use the Distance Formula</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-semibold text-sm mb-2">Geometry and Coordinate Systems</h4>
            <p className="text-xs text-muted-foreground">
              The distance formula comes directly from the Pythagorean theorem. It gives you the straight-line distance between any two points on a plane, which is fundamental to geometry, navigation, and physics.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Real-World Applications</h4>
            <p className="text-xs text-muted-foreground">
              Map applications use this formula to calculate distances between locations. Game developers use it for collision detection. Surveyors use it to measure property boundaries. It's everywhere once you start looking.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Midpoint Calculation</h4>
            <p className="text-xs text-muted-foreground">
              The midpoint formula finds the exact center point between two coordinates. This is useful for finding meeting points, dividing segments equally, or locating the center of geometric shapes.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">No Manual Calculation Needed</h4>
            <p className="text-xs text-muted-foreground">
              Square roots and squaring can get messy with decimals or negative numbers. This calculator handles all the arithmetic, so you can focus on understanding the concepts instead of crunching numbers.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Distance Formula Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-md">
            <h4 className="font-semibold text-sm mb-3">The Formula</h4>
            <p className="font-mono text-sm mb-2">d = √[(x₂ - x₁)² + (y₂ - y₁)²]</p>
            <p className="text-xs text-muted-foreground">
              Where (x₁, y₁) is the first point and (x₂, y₂) is the second point.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Worked Example</h4>
            <p className="text-xs text-muted-foreground mb-2">
              Find the distance between (1, 2) and (5, 6):
            </p>
            <div className="bg-background border rounded p-3 font-mono text-xs space-y-1">
              <p>d = √[(5 - 1)² + (6 - 2)²]</p>
              <p>d = √[4² + 4²]</p>
              <p>d = √[16 + 16]</p>
              <p>d = √32</p>
              <p>d ≈ 5.6569</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-3">Midpoint Formula</h4>
            <p className="font-mono text-sm mb-2">M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</p>
            <p className="text-xs text-muted-foreground">
              The midpoint is simply the average of the x-coordinates and the average of the y-coordinates.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Practice Problems</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Point 1</TableHead>
                <TableHead>Point 2</TableHead>
                <TableHead>Distance</TableHead>
                <TableHead>Midpoint</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {exampleProblems.map((ex, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-mono text-xs">{ex.p1}</TableCell>
                  <TableCell className="font-mono text-xs">{ex.p2}</TableCell>
                  <TableCell className="font-mono text-xs">{ex.distance}</TableCell>
                  <TableCell className="font-mono text-xs">{ex.midpoint}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => loadExample(ex)}>Load</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Click "Load" to try any example in the calculator above.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What is the distance formula?</h4>
            <p className="text-xs text-muted-foreground">
              The distance formula calculates the straight-line distance between two points on a coordinate plane: d = √[(x₂-x₁)² + (y₂-y₁)²]. It's derived from the Pythagorean theorem (a² + b² = c²).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can the distance be negative?</h4>
            <p className="text-xs text-muted-foreground">
              No. Distance is always positive or zero. The formula squares the differences, which makes negative values positive. The square root of a positive number is always positive.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do you find the midpoint?</h4>
            <p className="text-xs text-muted-foreground">
              The midpoint formula is M = ((x₁+x₂)/2, (y₁+y₂)/2). You average the x-coordinates to get the x-coordinate of the midpoint, and average the y-coordinates to get the y-coordinate.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Does this work in 3D space?</h4>
            <p className="text-xs text-muted-foreground">
              This calculator handles 2D coordinates. For 3D, add the z-term: d = √[(x₂-x₁)² + (y₂-y₁)² + (z₂-z₁)²]. The midpoint formula also extends to three dimensions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Why is the distance formula useful?</h4>
            <p className="text-xs text-muted-foreground">
              It's fundamental to geometry, physics, computer graphics, GPS navigation, and game development. Any time you need to measure how far apart two things are on a plane, this is the formula.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
