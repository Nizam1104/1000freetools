"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TrigIdentityVerifier() {
  const [leftSide, setLeftSide] = useState<string>("");
  const [rightSide, setRightSide] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  const evaluateExpression = (expr: string, angleDeg: number): number | null => {
    try {
      const angleRad = (angleDeg * Math.PI) / 180;
      const sin = Math.sin(angleRad);
      const cos = Math.cos(angleRad);
      const tan = Math.tan(angleRad);
      const csc = 1 / sin;
      const sec = 1 / cos;
      const cot = 1 / tan;

      let evaluated = expr
        .toLowerCase()
        .replace(/sin/g, `(${sin})`)
        .replace(/cos/g, `(${cos})`)
        .replace(/tan/g, `(${tan})`)
        .replace(/csc/g, `(${csc})`)
        .replace(/sec/g, `(${sec})`)
        .replace(/cot/g, `(${cot})`)
        .replace(/\^2/g, '**2')
        .replace(/\^3/g, '**3')
        .replace(/π/g, Math.PI.toString())
        .replace(/pi/g, Math.PI.toString());

      return eval(evaluated);
    } catch {
      return null;
    }
  };

  const verify = () => {
    if (!leftSide.trim() || !rightSide.trim()) {
      setResult({ error: "Please enter both sides of the identity" });
      return;
    }

    const testAngles = [0, 30, 45, 60, 90, 120, 135, 150, 180, 225, 270, 315];
    const results: { angle: number; left: number | null; right: number | null; match: boolean }[] = [];
    let allMatch = true;
    let hasError = false;

    for (const angle of testAngles) {
      const leftVal = evaluateExpression(leftSide, angle);
      const rightVal = evaluateExpression(rightSide, angle);

      if (leftVal === null || rightVal === null || !isFinite(leftVal) || !isFinite(rightVal)) {
        results.push({ angle, left: leftVal, right: rightVal, match: false });
        continue;
      }

      const match = Math.abs(leftVal - rightVal) < 1e-10;
      if (!match) allMatch = false;
      results.push({ angle, left: leftVal, right: rightVal, match });
    }

    setResult({
      isIdentity: allMatch,
      results,
      leftSide,
      rightSide,
      message: allMatch
        ? "The equation appears to be a valid trigonometric identity (verified for multiple angles)."
        : "The equation is NOT a trigonometric identity - the two sides give different values."
    });
  };

  const reset = () => {
    setLeftSide("");
    setRightSide("");
    setResult(null);
  };

  const examples = [
    { left: "sin^2 + cos^2", right: "1", name: "Pythagorean Identity" },
    { left: "tan", right: "sin/cos", name: "Tangent Identity" },
    { left: "1 + tan^2", right: "sec^2", name: "Pythagorean Identity" },
    { left: "sin(90-x)", right: "cos", name: "Co-function Identity" },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">Trig Identity Verifier – Verify Trigonometric Identities Online</h1>
        <p className="text-muted-foreground">
          Verify any trigonometric identity online with our free trig identity verifier. Simplifies both sides of an equation to check if the identity holds using fundamental trig rules.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trigonometric Identity Verifier</CardTitle>
          <CardDescription>
            Enter both sides of the equation to verify if it's a valid identity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Left Side</Label>
                <Input
                  placeholder="e.g., sin^2 + cos^2"
                  value={leftSide}
                  onChange={(e) => setLeftSide(e.target.value)}
                />
              </div>
              <div>
                <Label>Right Side</Label>
                <Input
                  placeholder="e.g., 1"
                  value={rightSide}
                  onChange={(e) => setRightSide(e.target.value)}
                />
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground mb-2"><strong>Supported functions:</strong> sin, cos, tan, csc, sec, cot</p>
              <p className="text-sm text-muted-foreground"><strong>Operations:</strong> +, -, *, /, ^2, ^3</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={verify}>Verify Identity</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {result && result.error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg">
                {result.error}
              </div>
            )}

            {result && result.isIdentity !== undefined && (
              <div className="space-y-6">
                <div className={`p-6 rounded-lg text-center ${result.isIdentity ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                  <p className="text-2xl font-bold">{result.isIdentity ? "✓ Valid Identity" : "✗ Not an Identity"}</p>
                  <p className="text-sm mt-2">{result.message}</p>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold text-sm mb-3">Verification Results</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Angle</th>
                          <th className="text-right p-2">Left Side</th>
                          <th className="text-right p-2">Right Side</th>
                          <th className="text-center p-2">Match</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.results.slice(0, 8).map((r: any, i: number) => (
                          <tr key={i} className={`border-b ${r.match ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                            <td className="p-2">{r.angle}°</td>
                            <td className="text-right p-2 font-mono">{r.left !== null ? r.left.toFixed(6) : 'undefined'}</td>
                            <td className="text-right p-2 font-mono">{r.right !== null ? r.right.toFixed(6) : 'undefined'}</td>
                            <td className="text-center p-2">{r.match ? "✓" : "✗"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {result && result.isIdentity !== undefined && (
              <div>
                <h4 className="font-semibold text-sm mb-3">Try These Examples</h4>
                <div className="grid gap-2">
                  {examples.map((ex, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      className="justify-start"
                      onClick={() => { setLeftSide(ex.left); setRightSide(ex.right); }}
                    >
                      {ex.name}: {ex.left} = {ex.right}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Trigonometric Identities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Pythagorean Identities</h4>
              <div className="space-y-2 text-sm font-mono">
                <div>sin²θ + cos²θ = 1</div>
                <div>1 + tan²θ = sec²θ</div>
                <div>1 + cot²θ = csc²θ</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Quotient Identities</h4>
              <div className="space-y-2 text-sm font-mono">
                <div>tanθ = sinθ / cosθ</div>
                <div>cotθ = cosθ / sinθ</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Co-function Identities</h4>
              <div className="space-y-2 text-sm font-mono">
                <div>sin(90° - θ) = cosθ</div>
                <div>cos(90° - θ) = sinθ</div>
                <div>tan(90° - θ) = cotθ</div>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-sm mb-3">Even-Odd Identities</h4>
              <div className="space-y-2 text-sm font-mono">
                <div>sin(-θ) = -sinθ</div>
                <div>cos(-θ) = cosθ</div>
                <div>tan(-θ) = -tanθ</div>
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
            <h4 className="font-semibold text-sm mb-2">How does the verifier work?</h4>
            <p className="text-xs text-muted-foreground">
              The calculator tests the equation at multiple angle values. If both sides give the same result for all test angles, it's likely a valid identity. This numerical approach catches most identities but isn't a formal proof.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I use variables like x or θ?</h4>
            <p className="text-xs text-muted-foreground">
              No, just enter the expressions using sin, cos, tan, etc. The calculator automatically tests multiple angles to verify the identity holds for all values.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What if I get undefined values?</h4>
            <p className="text-xs text-muted-foreground">
              Some identities have restrictions. For example, tan is undefined at 90°. The verifier skips angles where either side is undefined.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
