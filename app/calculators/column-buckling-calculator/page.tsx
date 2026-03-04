"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, Ruler, AlertTriangle } from "lucide-react";

interface BucklingResult {
  criticalLoad: number;
  criticalStress: number;
  slendernessRatio: number;
  safe: boolean;
  unit: string;
}

export default function ColumnBucklingCalculatorPage() {
  const [length, setLength] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [momentOfInertia, setMomentOfInertia] = useState<string>("");
  const [elasticModulus, setElasticModulus] = useState<string>("");
  const [endCondition, setEndCondition] = useState<"pinned-pinned" | "fixed-fixed" | "fixed-pinned" | "fixed-free">("pinned-pinned");
  const [appliedLoad, setAppliedLoad] = useState<string>("");
  const [result, setResult] = useState<BucklingResult | null>(null);

  const calculateBuckling = () => {
    const L = parseFloat(length);
    const A = parseFloat(area);
    const I = parseFloat(momentOfInertia);
    const E = parseFloat(elasticModulus);
    const P = parseFloat(appliedLoad);

    if (isNaN(L) || isNaN(A) || isNaN(I) || isNaN(E) || L <= 0 || A <= 0 || I <= 0 || E <= 0) {
      setResult(null);
      return;
    }

    const kValues = {
      "pinned-pinned": 1.0,
      "fixed-fixed": 0.5,
      "fixed-pinned": 0.7,
      "fixed-free": 2.0,
    };

    const K = kValues[endCondition];
    const effectiveLength = K * L;
    const radiusOfGyration = Math.sqrt(I / A);
    const slendernessRatio = effectiveLength / radiusOfGyration;
    const criticalLoad = (Math.PI * Math.PI * E * I) / (effectiveLength * effectiveLength);
    const criticalStress = criticalLoad / A;
    const safe = P === 0 ? true : P < criticalLoad;

    setResult({
      criticalLoad: Math.round(criticalLoad * 100) / 100,
      criticalStress: Math.round(criticalStress * 100) / 100,
      slendernessRatio: Math.round(slendernessRatio * 10) / 10,
      safe,
      unit: "N",
    });
  };

  const reset = () => {
    setLength("");
    setArea("");
    setMomentOfInertia("");
    setElasticModulus("");
    setAppliedLoad("");
    setResult(null);
  };

  useEffect(() => {
    calculateBuckling();
  }, [length, area, momentOfInertia, elasticModulus, endCondition, appliedLoad]);

  const getSafetyColor = (safe: boolean) => {
    return safe ? "text-green-500 bg-green-500/10" : "text-destructive bg-destructive/10";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Column Buckling Calculator</h1>
          <p className="text-muted-foreground">
            Calculate the critical buckling load for columns using Euler's formula. Essential for structural engineering, mechanical design, and ensuring column stability under compressive loads.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Column Properties</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length">Column Length (m)</Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="e.g., 3"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="area">Cross-sectional Area (m²)</Label>
                    <Input
                      id="area"
                      type="number"
                      placeholder="e.g., 0.01"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="momentOfInertia">Moment of Inertia (m⁴)</Label>
                    <Input
                      id="momentOfInertia"
                      type="number"
                      placeholder="e.g., 8.33e-6"
                      value={momentOfInertia}
                      onChange={(e) => setMomentOfInertia(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="elasticModulus">Elastic Modulus E (Pa)</Label>
                    <Input
                      id="elasticModulus"
                      type="number"
                      placeholder="e.g., 200e9"
                      value={elasticModulus}
                      onChange={(e) => setElasticModulus(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="endCondition">End Conditions</Label>
                  <select
                    id="endCondition"
                    value={endCondition}
                    onChange={(e) => setEndCondition(e.target.value as any)}
                    className="w-full border rounded-md px-3 py-2 text-sm bg-background"
                  >
                    <option value="pinned-pinned">Pinned-Pinned (K=1.0)</option>
                    <option value="fixed-fixed">Fixed-Fixed (K=0.5)</option>
                    <option value="fixed-pinned">Fixed-Pinned (K=0.7)</option>
                    <option value="fixed-free">Fixed-Free (K=2.0)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="appliedLoad">Applied Load (N) - Optional</Label>
                  <Input
                    id="appliedLoad"
                    type="number"
                    placeholder="e.g., 50000"
                    value={appliedLoad}
                    onChange={(e) => setAppliedLoad(e.target.value)}
                  />
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Euler's formula applies to long, slender columns. Check slenderness ratio to ensure validity.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateBuckling} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Critical Buckling Load</p>
                    <p className="text-3xl font-bold text-primary">{result.criticalLoad.toLocaleString()} N</p>
                    <p className="text-sm text-muted-foreground">{(result.criticalLoad / 1000).toFixed(2)} kN</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Critical Stress</p>
                      <p className="text-lg font-semibold">{(result.criticalStress / 1e6).toFixed(2)} MPa</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Slenderness Ratio</p>
                      <p className="text-lg font-semibold">{result.slendernessRatio}</p>
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg ${getSafetyColor(result.safe)}`}>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      <p className="font-semibold">{result.safe ? "Safe from Buckling" : "Buckling Risk!"}</p>
                    </div>
                    {appliedLoad && parseFloat(appliedLoad) > 0 && (
                      <p className="text-sm mt-2">Applied load: {parseFloat(appliedLoad).toLocaleString()} N</p>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> P_cr = π²EI / (KL)²</p>
                    <p className="mt-1">E=elastic modulus, I=moment of inertia, K=effective length factor, L=length</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter column properties to calculate buckling load</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">End Conditions Explained</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Ruler className="h-4 w-4" />
                  Effective Length Factors:
                </h4>
                <ul className="space-y-2">
                  <li><strong>Pinned-Pinned (K=1.0):</strong> Both ends can rotate but not translate</li>
                  <li><strong>Fixed-Fixed (K=0.5):</strong> Both ends cannot rotate or translate</li>
                  <li><strong>Fixed-Pinned (K=0.7):</strong> One end fixed, one end pinned</li>
                  <li><strong>Fixed-Free (K=2.0):</strong> Cantilever column, one end free</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Design Considerations:
                </h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Apply safety factor (typically 2-3)</li>
                  <li>Check for local buckling in thin sections</li>
                  <li>Consider eccentric loading effects</li>
                  <li>Verify material yield stress is not exceeded</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Column Buckling</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Enter Column Length</h3>
                <p className="text-sm text-muted-foreground">Input the unsupported length of the column in meters.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Define Cross-Section</h3>
                <p className="text-sm text-muted-foreground">Enter area and moment of inertia for the column cross-section.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Select Material</h3>
                <p className="text-sm text-muted-foreground">Input elastic modulus (e.g., 200 GPa for steel).</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">4</div>
                <h3 className="font-semibold mb-2">Get Critical Load</h3>
                <p className="text-sm text-muted-foreground">See the maximum load before buckling occurs with safety check.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Euler's Formula
                </h3>
                <p className="text-sm text-muted-foreground">Classic Euler buckling equation for elastic column stability analysis.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Multiple End Conditions
                </h3>
                <p className="text-sm text-muted-foreground">Support for pinned, fixed, and free end configurations.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Safety Check
                </h3>
                <p className="text-sm text-muted-foreground">Compare applied load against critical buckling load instantly.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Slenderness Ratio
                </h3>
                <p className="text-sm text-muted-foreground">Calculate slenderness to verify Euler formula applicability.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is column buckling?</h3>
                <p className="text-sm text-muted-foreground">Buckling is sudden lateral failure of a column under compressive load. It occurs before material yield stress is reached in slender columns, making it a critical design consideration.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">When does Euler's formula apply?</h3>
                <p className="text-sm text-muted-foreground">Euler's formula applies to long, slender columns where buckling occurs in the elastic range. Generally valid for slenderness ratios above 100 for steel columns.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What safety factor should I use?</h3>
                <p className="text-sm text-muted-foreground">Typical safety factors range from 2.0 to 3.0 for buckling, depending on application, loading certainty, and consequences of failure. Building codes specify minimum values.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How do end conditions affect buckling?</h3>
                <p className="text-sm text-muted-foreground">End conditions change the effective length. Fixed ends reduce effective length (higher critical load), while free ends increase it (lower critical load).</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is the slenderness ratio?</h3>
                <p className="text-sm text-muted-foreground">Slenderness ratio = effective length / radius of gyration. Higher ratios indicate more slender columns prone to buckling rather than crushing failure.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Related Tools</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="/calculators/force-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Force Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate force, mass, and acceleration using Newton's laws.</p>
              </a>
              <a href="/calculators/pressure-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Pressure Calculator</h3>
                <p className="text-sm text-muted-foreground">Convert and calculate pressure in various units.</p>
              </a>
              <a href="/calculators/density-calculator" className="p-5 bg-muted rounded-lg hover:border-primary border transition-colors">
                <h3 className="font-semibold mb-2">Density Calculator</h3>
                <p className="text-sm text-muted-foreground">Calculate density from mass and volume measurements.</p>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
