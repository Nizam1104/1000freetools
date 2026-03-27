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

export default function GoldenRatioCalculator() {
  const [value, setValue] = useState<string>("");
  const [mode, setMode] = useState<"a" | "b">("a");
  const [result, setResult] = useState<{ a: number; b: number; ratio: number } | null>(null);

  const PHI = (1 + Math.sqrt(5)) / 2; // 1.618...

  const calculate = () => {
    const val = parseFloat(value);
    
    if (!isNaN(val) && val > 0) {
      if (mode === "a") {
        // Given a, find b
        const b = val / PHI;
        setResult({ a: val, b, ratio: PHI });
      } else {
        // Given b, find a
        const a = val * PHI;
        setResult({ a, b: val, ratio: PHI });
      }
    }
  };

  const reset = () => {
    setValue("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-muted rounded-md text-center font-mono text-sm">
              a : b = φ ≈ 1.618
            </div>
            <div className="flex gap-2">
              <Button
                variant={mode === "a" ? "default" : "outline"}
                onClick={() => { setMode("a"); setResult(null); }}
              >
                Given a, find b
              </Button>
              <Button
                variant={mode === "b" ? "default" : "outline"}
                onClick={() => { setMode("b"); setResult(null); }}
              >
                Given b, find a
              </Button>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                {mode === "a" ? "Value of a" : "Value of b"}
              </label>
              <Input
                type="number"
                placeholder="e.g., 100"
                step="any"
                min="0"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>
            {result && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">a (larger)</p>
                    <p className="text-xl font-semibold">{result.a.toFixed(4)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">b (smaller)</p>
                    <p className="text-xl font-semibold">{result.b.toFixed(4)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ratio (a/b)</p>
                  <p className="text-lg">{result.ratio.toFixed(6)} (φ)</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Calculate Golden Ratio Proportions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            <strong>Step 1:</strong> Choose whether you know the larger value (a) or smaller value (b).
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 2:</strong> Enter your known value.
          </p>
          <p className="text-sm text-muted-foreground">
            <strong>Step 3:</strong> Click Calculate to find the missing value that creates golden ratio proportions.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding the Golden Ratio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">What Is the Golden Ratio</h4>
            <p className="text-sm text-muted-foreground">
              The golden ratio (φ, phi) equals approximately 1.618. Two quantities are in golden ratio when the ratio of their sum to the larger equals the ratio of the larger to the smaller: (a+b)/a = a/b = φ. This proportion appears throughout nature, art, and architecture.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Where the Golden Ratio Appears</h4>
            <p className="text-sm text-muted-foreground mb-3">
              The golden ratio shows up everywhere:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 ml-4">
              <li><strong>Nature:</strong> Sunflower seed spirals, nautilus shells, hurricane patterns</li>
              <li><strong>Human body:</strong> Finger bone ratios, face proportions, DNA helix dimensions</li>
              <li><strong>Art:</strong> Parthenon, Mona Lisa, modern logos (Apple, Twitter, Pepsi)</li>
              <li><strong>Music:</strong> Stradivarius violin proportions, musical composition structures</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm mb-2">Golden Ratio and Fibonacci</h4>
            <p className="text-sm text-muted-foreground">
              Divide consecutive Fibonacci numbers: 8/5 = 1.6, 13/8 = 1.625, 144/89 = 1.6179... As numbers get larger, the ratio approaches φ = 1.618034... This connection explains why Fibonacci spirals appear in sunflowers and pinecones.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Golden Ratio in Design Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Application</TableHead>
                <TableHead>Larger Value (a)</TableHead>
                <TableHead>Smaller Value (b)</TableHead>
                <TableHead>Ratio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Parthenon facade</TableCell>
                <TableCell className="font-mono">30.88 m</TableCell>
                <TableCell className="font-mono">19.08 m</TableCell>
                <TableCell className="font-mono">1.618</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Credit card</TableCell>
                <TableCell className="font-mono">85.60 mm</TableCell>
                <TableCell className="font-mono">53.98 mm</TableCell>
                <TableCell className="font-mono">1.586</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>16:9 screen (approx)</TableCell>
                <TableCell className="font-mono">1920 px</TableCell>
                <TableCell className="font-mono">1080 px</TableCell>
                <TableCell className="font-mono">1.778</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Golden rectangle</TableCell>
                <TableCell className="font-mono">161.8 mm</TableCell>
                <TableCell className="font-mono">100 mm</TableCell>
                <TableCell className="font-mono">1.618</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Human face (ideal)</TableCell>
                <TableCell className="font-mono">Face width</TableCell>
                <TableCell className="font-mono">Eye spacing</TableCell>
                <TableCell className="font-mono">~1.618</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Not all rectangles are golden rectangles. A true golden rectangle has sides in exactly 1.618:1 ratio. Credit cards and many photo prints approximate this ratio.
          </p>
        </CardContent>
      </Card>

      <section className="container mx-auto px-4 py-12 mb-12">
  <h2 className="text-3xl font-semibold mb-8 text-center">
    Frequently Asked Questions
  </h2>
  <Faqs faqs={[
{
    question: "What is the exact value of the golden ratio?",
    answer: "φ = (1 + √5) / 2 = 1.618033988749895... It's an irrational number, so the decimal never ends or repeats. For practical purposes, 1.618 is accurate enough.",
  },
{
    question: "How do I use the golden ratio in design?",
    answer: "Divide your layout using 1.618:1 proportions. For a 1000px wide page, make the main content 618px and sidebar 382px. Or use the golden spiral to place focal points. Many design tools have golden ratio guides built in.",
  },
{
    question: "Is the golden ratio really everywhere?",
    answer: "Sometimes it's overstated. Many claimed golden ratio appearances are coincidental or measured selectively. But genuine examples exist - sunflower seeds, nautilus shells, and classical architecture do use these proportions.",
  },
{
    question: "What is a golden rectangle?",
    answer: "A rectangle where the ratio of length to width equals φ. Cut off a square from a golden rectangle, and the remaining rectangle is also golden. This creates the golden spiral when you connect the corners.",
  },
{
    question: "How is the golden ratio related to the Fibonacci sequence?",
    answer: "The ratio of consecutive Fibonacci numbers converges to φ. F(10)/F(9) = 55/34 = 1.6176. F(20)/F(19) = 6765/4181 = 1.6180. This is why Fibonacci spirals in nature approximate golden spirals.",
  }
  ]} />
</section>
    </div>
  );
}
