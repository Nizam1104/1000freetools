"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Faqs from "@/components/utils/Faqs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function VolumeOfCubeCalculator() {
  const [side, setSide] = useState<string>("");
  const [result, setResult] = useState<{ volume: number; surfaceArea: number; spaceDiagonal: number; faceDiagonal: number } | null>(null);

  const calculate = () => {
    const s = parseFloat(side);
    if (!isNaN(s) && s > 0) {
      setResult({
        volume: s * s * s,
        surfaceArea: 6 * s * s,
        spaceDiagonal: s * Math.sqrt(3),
        faceDiagonal: s * Math.sqrt(2)
      });
    }
  };

  const reset = () => {
    setSide("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Side length (s)</label>
              <Input
                type="number"
                placeholder="e.g., 4"
                step="any"
                min="0"
                value={side}
                onChange={(e) => setSide(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Volume (s³)</p>
                  <p className="text-2xl font-semibold">{result.volume.toFixed(4)}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-2 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Surface Area</p>
                    <p className="text-lg">{result.surfaceArea.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Space Diagonal</p>
                    <p className="text-lg">{result.spaceDiagonal.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Face Diagonal</p>
                    <p className="text-lg">{result.faceDiagonal.toFixed(4)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How Cube Volume Calculation Works</CardTitle>
          <CardDescription>Understanding cube geometry formulas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h4 className="font-semibold">Measure the Side Length</h4>
                <p className="text-sm text-muted-foreground">
                  A cube has all edges equal. Measure any side – length, width, and height are identical. This single measurement determines all cube properties.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h4 className="font-semibold">Calculate Volume as s³</h4>
                <p className="text-sm text-muted-foreground">
                  Volume equals side length cubed (s × s × s). This represents the 3D space inside the cube. Doubling the side increases volume by 8 times (2³ = 8).
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h4 className="font-semibold">Find Surface Area and Diagonals</h4>
                <p className="text-sm text-muted-foreground">
                  Surface area is 6s² (six square faces). Face diagonal is s√2. Space diagonal (corner to opposite corner) is s√3, using the 3D Pythagorean theorem.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cube Properties and Formulas</CardTitle>
          <CardDescription>Complete reference for cube calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Volume Formula**</h4>
              <p className="text-xs text-muted-foreground">
                V = s³ where s is the side length. A cube with 5 cm sides has volume 125 cm³. Volume scales with the cube of linear dimension – small changes in side cause large volume changes.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Surface Area Formula**</h4>
              <p className="text-xs text-muted-foreground">
                A = 6s² because a cube has 6 identical square faces. Each face has area s². Total surface area is useful for painting, wrapping, or heat transfer calculations.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Space Diagonal**</h4>
              <p className="text-xs text-muted-foreground">
                d = s√3 connects opposite corners through the cube interior. Derived from 3D Pythagorean theorem: d² = s² + s² + s². Important for fitting objects inside cubic spaces.
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm mb-2">**Face Diagonal**</h4>
              <p className="text-xs text-muted-foreground">
                f = s√2 runs across each square face corner to corner. This is the 2D Pythagorean theorem applied to one face. Face diagonals help in structural bracing calculations.
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-3">Cube Measurements Reference Table</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Side Length</TableHead>
                  <TableHead>Volume (s³)</TableHead>
                  <TableHead>Surface Area (6s²)</TableHead>
                  <TableHead>Space Diagonal (s√3)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1 unit</TableCell>
                  <TableCell className="font-mono">1</TableCell>
                  <TableCell className="font-mono">6</TableCell>
                  <TableCell className="font-mono">1.732</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">2 units</TableCell>
                  <TableCell className="font-mono">8</TableCell>
                  <TableCell className="font-mono">24</TableCell>
                  <TableCell className="font-mono">3.464</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">3 units</TableCell>
                  <TableCell className="font-mono">27</TableCell>
                  <TableCell className="font-mono">54</TableCell>
                  <TableCell className="font-mono">5.196</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">4 units</TableCell>
                  <TableCell className="font-mono">64</TableCell>
                  <TableCell className="font-mono">96</TableCell>
                  <TableCell className="font-mono">6.928</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">5 units</TableCell>
                  <TableCell className="font-mono">125</TableCell>
                  <TableCell className="font-mono">150</TableCell>
                  <TableCell className="font-mono">8.660</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">10 units</TableCell>
                  <TableCell className="font-mono">1000</TableCell>
                  <TableCell className="font-mono">600</TableCell>
                  <TableCell className="font-mono">17.321</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is the formula for volume of a cube?",
    answer: "Volume = s³ (side length cubed). Multiply the side by itself three times. For a cube with 4 cm sides: 4 × 4 × 4 = 64 cm³. All three dimensions are equal in a cube.",
  },
{
    question: "How do you find the side length from volume?",
    answer: "Take the cube root of the volume: s = ∛V. If volume is 27 cm³, the side is ∛27 = 3 cm. Most calculators have a cube root function, or use V^(1/3).",
  },
{
    question: "What is the difference between a cube and a cuboid?",
    answer: "A cube has all sides equal. A cuboid (rectangular prism) has different length, width, and height. Cube formulas are simpler because there is only one dimension to measure.",
  },
{
    question: "Why is the space diagonal s√3?",
    answer: "Using 3D Pythagorean theorem: diagonal² = length² + width² + height². For a cube, all three equal s, so d² = s² + s² + s² = 3s². Therefore d = s√3.",
  },
{
    question: "How does doubling the side affect volume?",
    answer: "Doubling the side multiplies volume by 8 (2³ = 8). Tripling multiplies by 27 (3³ = 27). This cubic relationship means small size changes create large volume differences.",
  }
  ]} />
</section>
    </div>
  );
}
