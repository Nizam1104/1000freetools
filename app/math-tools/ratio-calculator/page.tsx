"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function RatioCalculator() {
  const [mode, setMode] = useState<"simplify" | "solve" | "equivalent">("simplify");
  const [ratioA, setRatioA] = useState<string>("");
  const [ratioB, setRatioB] = useState<string>("");
  const [knownValue, setKnownValue] = useState<string>("");
  const [unknownPosition, setUnknownPosition] = useState<"a" | "b" | "c" | "d">("d");
  const [equivalentMultiplier, setEquivalentMultiplier] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const gcd = (a: number, b: number): number => {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  const calculate = () => {
    if (mode === "simplify") {
      const a = parseFloat(ratioA);
      const b = parseFloat(ratioB);
      if (!isNaN(a) && !isNaN(b) && b !== 0) {
        const common = gcd(a, b);
        const simplifiedA = a / common;
        const simplifiedB = b / common;
        const decimal = a / b;
        setResult({
          original: `${a} : ${b}`,
          simplified: `${simplifiedA} : ${simplifiedB}`,
          gcd: common,
          decimal: decimal,
          percentage: (decimal * 100).toFixed(2),
          steps: [
            `Original ratio: ${a} : ${b}`,
            `Find GCD of ${a} and ${b}: GCD = ${common}`,
            `Divide both terms by ${common}`,
            `${a} ÷ ${common} = ${simplifiedA}`,
            `${b} ÷ ${common} = ${simplifiedB}`,
            `Simplified ratio: ${simplifiedA} : ${simplifiedB}`,
            `As a decimal: ${decimal.toFixed(4)}`,
            `As a percentage: ${(decimal * 100).toFixed(2)}%`
          ]
        });
      }
    } else if (mode === "solve") {
      const a = ratioA ? parseFloat(ratioA) : null;
      const b = ratioB ? parseFloat(ratioB) : null;
      const c = knownValue ? parseFloat(knownValue) : null;

      if (unknownPosition === "d" && a !== null && b !== null && c !== null && a !== 0) {
        const d = (b * c) / a;
        setResult({
          answer: d,
          proportion: `${a} : ${b} = ${c} : ${d}`,
          steps: [
            `Set up proportion: ${a}/${b} = ${c}/x`,
            `Cross multiply: ${a} × x = ${b} × ${c}`,
            `Solve for x: x = (${b} × ${c}) / ${a}`,
            `x = ${d}`
          ]
        });
      } else if (unknownPosition === "c" && a !== null && b !== null && c !== null && b !== 0) {
        const resultC = (a * c) / b;
        setResult({
          answer: resultC,
          proportion: `${a} : ${b} = ${resultC} : ${c}`,
          steps: [
            `Set up proportion: ${a}/${b} = x/${c}`,
            `Cross multiply: ${b} × x = ${a} × ${c}`,
            `Solve for x: x = (${a} × ${c}) / ${b}`,
            `x = ${resultC}`
          ]
        });
      } else if (unknownPosition === "b" && a !== null && c !== null && knownValue !== null && c !== 0) {
        const resultB = (a * c) / parseFloat(knownValue);
        setResult({
          answer: resultB,
          proportion: `${a} : ${resultB} = ${parseFloat(knownValue)} : ${c}`,
          steps: [
            `Set up proportion: ${a}/x = ${parseFloat(knownValue)}/${c}`,
            `Cross multiply: ${a} × ${c} = x × ${parseFloat(knownValue)}`,
            `Solve for x: x = (${a} × ${c}) / ${parseFloat(knownValue)}`,
            `x = ${resultB}`
          ]
        });
      } else if (unknownPosition === "a" && b !== null && c !== null && knownValue !== null && b !== 0) {
        const resultA = (b * parseFloat(knownValue)) / c;
        setResult({
          answer: resultA,
          proportion: `${resultA} : ${b} = ${parseFloat(knownValue)} : ${c}`,
          steps: [
            `Set up proportion: x/${b} = ${parseFloat(knownValue)}/${c}`,
            `Cross multiply: x × ${c} = ${b} × ${parseFloat(knownValue)}`,
            `Solve for x: x = (${b} × ${parseFloat(knownValue)}) / ${c}`,
            `x = ${resultA}`
          ]
        });
      }
    } else if (mode === "equivalent") {
      const a = parseFloat(ratioA);
      const b = parseFloat(ratioB);
      const multiplier = parseFloat(equivalentMultiplier);
      if (!isNaN(a) && !isNaN(b) && !isNaN(multiplier)) {
        setResult({
          original: `${a} : ${b}`,
          equivalent: `${a * multiplier} : ${b * multiplier}`,
          multiplier: multiplier,
          steps: [
            `Original ratio: ${a} : ${b}`,
            `Multiply both terms by ${multiplier}`,
            `${a} × ${multiplier} = ${a * multiplier}`,
            `${b} × ${multiplier} = ${b * multiplier}`,
            `Equivalent ratio: ${a * multiplier} : ${b * multiplier}`
          ]
        });
      }
    }
  };

  const reset = () => {
    setRatioA("");
    setRatioB("");
    setKnownValue("");
    setEquivalentMultiplier("");
    setResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Ratio Calculator – Simplify & Solve Ratios Online</h1>
        <p className="text-muted-foreground">
          Simplify ratios and solve ratio problems instantly with our free online ratio calculator. Solve for missing values in proportions and reduce ratios to their simplest form.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Ratio Calculator</CardTitle>
          <CardDescription>
            Simplify ratios, solve proportions, and find equivalent ratios.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Mode</Label>
              <Select value={mode} onValueChange={(v) => setMode(v as typeof mode)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simplify">Simplify a Ratio</SelectItem>
                  <SelectItem value="solve">Solve for Missing Value</SelectItem>
                  <SelectItem value="equivalent">Find Equivalent Ratio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {mode === "simplify" && (
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label>First Term (A)</Label>
                  <Input type="number" placeholder="e.g., 12" value={ratioA} onChange={(e) => setRatioA(e.target.value)} />
                </div>
                <span className="text-2xl font-bold pt-6">:</span>
                <div className="flex-1">
                  <Label>Second Term (B)</Label>
                  <Input type="number" placeholder="e.g., 18" value={ratioB} onChange={(e) => setRatioB(e.target.value)} />
                </div>
              </div>
            )}

            {mode === "solve" && (
              <div className="space-y-4">
                <div>
                  <Label>Which value is unknown?</Label>
                  <Select value={unknownPosition} onValueChange={(v) => setUnknownPosition(v as typeof unknownPosition)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a">A (first term of first ratio)</SelectItem>
                      <SelectItem value="b">B (second term of first ratio)</SelectItem>
                      <SelectItem value="c">C (first term of second ratio)</SelectItem>
                      <SelectItem value="d">D (second term of second ratio)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-center text-lg font-semibold mb-4">
                    {unknownPosition === "a" ? <Input placeholder="?" className="w-16 inline text-center" /> : <Input value={ratioA} onChange={(e) => setRatioA(e.target.value)} placeholder="A" className="w-16 inline text-center" />}
                    {" : "}
                    {unknownPosition === "b" ? <Input placeholder="?" className="w-16 inline text-center" /> : <Input value={ratioB} onChange={(e) => setRatioB(e.target.value)} placeholder="B" className="w-16 inline text-center" />}
                    {" = "}
                    {unknownPosition === "c" ? <Input placeholder="?" className="w-16 inline text-center" /> : <Input value={knownValue} onChange={(e) => setKnownValue(e.target.value)} placeholder="C" className="w-16 inline text-center" />}
                    {" : "}
                    {unknownPosition === "d" ? <Input placeholder="?" className="w-16 inline text-center" /> : <Input value={equivalentMultiplier} onChange={(e) => setEquivalentMultiplier(e.target.value)} placeholder="D" className="w-16 inline text-center" />}
                  </div>
                  <p className="text-xs text-muted-foreground text-center">
                    Enter the three known values to find the fourth
                  </p>
                </div>
              </div>
            )}

            {mode === "equivalent" && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Label>First Term (A)</Label>
                    <Input type="number" placeholder="e.g., 2" value={ratioA} onChange={(e) => setRatioA(e.target.value)} />
                  </div>
                  <span className="text-2xl font-bold pt-6">:</span>
                  <div className="flex-1">
                    <Label>Second Term (B)</Label>
                    <Input type="number" placeholder="e.g., 3" value={ratioB} onChange={(e) => setRatioB(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label>Multiplier</Label>
                  <Input type="number" placeholder="e.g., 5 (to multiply ratio by 5)" value={equivalentMultiplier} onChange={(e) => setEquivalentMultiplier(e.target.value)} />
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && (
              <div className="space-y-4">
                <div className="p-6 bg-muted rounded-lg text-center">
                  {mode === "simplify" && (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Simplified Ratio</p>
                      <p className="text-4xl font-bold">{result.simplified}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Decimal: {result.decimal.toFixed(4)} | Percentage: {result.percentage}%
                      </p>
                    </>
                  )}
                  {mode === "solve" && (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Missing Value</p>
                      <p className="text-4xl font-bold">{result.answer}</p>
                      <p className="text-sm text-muted-foreground mt-2">Complete proportion: {result.proportion}</p>
                    </>
                  )}
                  {mode === "equivalent" && (
                    <>
                      <p className="text-sm text-muted-foreground mb-2">Equivalent Ratio</p>
                      <p className="text-4xl font-bold">{result.equivalent}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Multiplied by {result.multiplier}
                      </p>
                    </>
                  )}
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Step-by-Step Solution</h4>
                  <div className="space-y-2 text-sm">
                    {result.steps.map((step: string, i: number) => (
                      <div key={i} className="font-mono text-xs">{step}</div>
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
          <CardTitle>Ratio Calculator – Simplify & Solve Ratios Online</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Simplify ratios and solve ratio problems instantly with our free online ratio calculator. Solve for missing values in proportions and reduce ratios to their simplest form.
          </p>
          <p className="text-sm text-muted-foreground">
            Ratios compare quantities – like ingredients in a recipe, map scales, or aspect ratios for screens. This calculator handles three common tasks: reducing ratios to lowest terms, finding missing values in proportional relationships, and generating equivalent ratios.
          </p>
          <p className="text-sm text-muted-foreground">
            Working on homework? The step-by-step solutions show exactly how to simplify using the greatest common divisor, or how to cross-multiply when solving proportions. Understanding the process matters as much as getting the answer.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Understanding Ratios and Proportions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">What is a Ratio?</h4>
              <p className="text-xs text-muted-foreground mb-2">
                A ratio compares two quantities by division. It shows how much of one thing exists relative to another.
              </p>
              <div className="text-xs space-y-1">
                <div><strong>Notation:</strong> A : B or A/B or "A to B"</div>
                <div><strong>Example:</strong> 3 : 4 means 3 parts to 4 parts</div>
                <div><strong>Real use:</strong> Recipe ratios, map scales, screen dimensions</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">What is a Proportion?</h4>
              <p className="text-xs text-muted-foreground mb-2">
                A proportion states that two ratios are equal. When ratios are proportional, they represent the same relationship.
              </p>
              <div className="text-xs space-y-1">
                <div><strong>Notation:</strong> A : B = C : D</div>
                <div><strong>Cross product:</strong> A × D = B × C</div>
                <div><strong>Use:</strong> Scale drawings, similar triangles, unit conversions</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Simplifying Ratios</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Divide both terms by their greatest common divisor (GCD) to get the simplest form.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                12 : 18 → GCD is 6 → 2 : 3
              </code>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Solving Proportions</h4>
              <p className="text-xs text-muted-foreground mb-2">
                Use cross multiplication: if A/B = C/D, then A × D = B × C. Solve for the unknown.
              </p>
              <code className="text-xs font-mono bg-muted px-2 py-1 rounded block">
                2/5 = x/15 → 2×15 = 5×x → x = 6
              </code>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ratio Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Simplify 24 : 36</div>
              <div className="font-mono text-xs text-muted-foreground">
                GCD(24, 36) = 12<br />
                24 ÷ 12 = 2<br />
                36 ÷ 12 = 3<br />
                Result: 2 : 3
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Solve: 5 : 8 = 15 : x</div>
              <div className="font-mono text-xs text-muted-foreground">
                5/8 = 15/x<br />
                5x = 8 × 15<br />
                5x = 120<br />
                x = 24
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Find equivalent of 3 : 7 multiplied by 4</div>
              <div className="font-mono text-xs text-muted-foreground">
                3 × 4 = 12<br />
                7 × 4 = 28<br />
                Result: 12 : 28
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Recipe: 2 cups flour for 3 cups sugar. How much flour for 9 cups sugar?</div>
              <div className="font-mono text-xs text-muted-foreground">
                2 : 3 = x : 9<br />
                2/3 = x/9<br />
                x = (2 × 9) / 3 = 6 cups flour
              </div>
            </div>
            <div className="p-3 border rounded-lg">
              <div className="font-semibold text-sm mb-1">Map scale 1 : 50,000. What's the real distance if map shows 4.5 cm?</div>
              <div className="font-mono text-xs text-muted-foreground">
                1 : 50000 = 4.5 : x<br />
                x = 4.5 × 50000 = 225,000 cm = 2.25 km
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Ratio Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Aspect Ratios</h4>
              <p className="text-xs text-muted-foreground">
                Screen dimensions: 16:9 (widescreen), 4:3 (standard), 21:9 (ultrawide). Camera sensors use ratios like 3:2 or 4:3.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Cooking & Baking</h4>
              <p className="text-xs text-muted-foreground">
                Bread: 5:3 flour to water ratio. Pancakes: roughly 2:2:1 flour:milk:eggs. Scale recipes up or down using proportions.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Map Scales</h4>
              <p className="text-xs text-muted-foreground">
                1:24,000 means 1 inch on map = 24,000 inches in reality. Use proportions to convert map distances to real distances.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Mixing Solutions</h4>
              <p className="text-xs text-muted-foreground">
                Concentrate ratios like 1:4 (one part concentrate to four parts water). Maintain ratios when scaling batch sizes.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Financial Ratios</h4>
              <p className="text-xs text-muted-foreground">
                Debt-to-income, price-to-earnings, current ratio. Compare financial health using standardized ratio metrics.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Similar Triangles</h4>
              <p className="text-xs text-muted-foreground">
                Corresponding sides of similar triangles are proportional. Use ratios to find unknown lengths in geometry.
              </p>
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
            <h4 className="font-semibold text-sm mb-2">How do I simplify a ratio?</h4>
            <p className="text-xs text-muted-foreground">
              Find the greatest common divisor (GCD) of both numbers, then divide each by the GCD. For 18:24, the GCD is 6, so 18÷6=3 and 24÷6=4, giving 3:4.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What does cross multiplication mean?</h4>
            <p className="text-xs text-muted-foreground">
              In a proportion A/B = C/D, cross multiply means A×D = B×C. This works because you're multiplying both sides by both denominators, eliminating fractions.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can ratios have decimals?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, but it's often cleaner to convert to whole numbers. Multiply both terms by a power of 10 to eliminate decimals, then simplify. 1.5:2.5 becomes 15:25, which simplifies to 3:5.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between a ratio and a fraction?</h4>
            <p className="text-xs text-muted-foreground">
              A fraction represents a part of a whole (3/4 means 3 parts out of 4 total). A ratio compares two separate quantities (3:4 means 3 of one thing for every 4 of another). They're related but conceptually different.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I know if two ratios are equivalent?</h4>
            <p className="text-xs text-muted-foreground">
              Simplify both ratios to lowest terms – if they match, they're equivalent. Or cross multiply: if A×D = B×C, then A:B and C:D are equivalent.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I simplify ratios with fractions?</h4>
            <p className="text-xs text-muted-foreground">
              Yes. First, find a common denominator for both terms, then treat the numerators as a whole number ratio. For 1/2 : 3/4, convert to 2/4 : 3/4, giving 2:3.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
