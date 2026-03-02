"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";

interface StairResult {
  totalRise: number;
  totalRun: number;
  numberOfSteps: number;
  actualRiserHeight: number;
  actualTreadDepth: number;
  slopeAngle: number;
  slopePercentage: number;
  codeCompliance: {
    riserCompliant: boolean;
    treadCompliant: boolean;
    slopeCompliant: boolean;
    overall: boolean;
  };
  issues: string[];
}

export default function StaircaseRiseRunCalculatorPage() {
  const [totalRise, setTotalRise] = useState<string>("");
  const [totalRun, setTotalRun] = useState<string>("");
  const [unit, setUnit] = useState<"inches" | "cm">("inches");
  const [customRiser, setCustomRiser] = useState<string>("");
  const [customTread, setCustomTread] = useState<string>("");
  const [useCustom, setUseCustom] = useState<boolean>(false);
  const [result, setResult] = useState<StairResult | null>(null);

  const calculateStairs = () => {
    const rise = parseFloat(totalRise);
    const run = parseFloat(totalRun);

    if (isNaN(rise) || isNaN(run) || rise <= 0 || run <= 0) {
      return;
    }

    const riseInInches = unit === "cm" ? rise / 2.54 : rise;
    const runInInches = unit === "cm" ? run / 2.54 : run;

    let numSteps: number;
    let actualRiser: number;
    let actualTread: number;

    if (useCustom && customRiser && customTread) {
      const customRiserIn = unit === "cm" ? parseFloat(customRiser) / 2.54 : parseFloat(customRiser);
      const customTreadIn = unit === "cm" ? parseFloat(customTread) / 2.54 : parseFloat(customTread);

      numSteps = Math.round(riseInInches / customRiserIn);
      if (numSteps < 1) numSteps = 1;

      actualRiser = riseInInches / numSteps;
      actualTread = customTreadIn;
    } else {
      const idealRiser = 7.5;
      numSteps = Math.round(riseInInches / idealRiser);

      if (numSteps < 1) numSteps = 1;

      actualRiser = riseInInches / numSteps;

      const idealTread = 10;
      const availableTread = runInInches / numSteps;

      actualTread = Math.min(availableTread, idealTread);
      if (actualTread < 9) {
        actualTread = Math.max(availableTread, 9);
      }
    }

    const slopeRadians = Math.atan(actualRiser / actualTread);
    const slopeAngle = slopeRadians * (180 / Math.PI);
    const slopePercentage = (actualRiser / actualTread) * 100;

    const riserCompliant = actualRiser >= 4 && actualRiser <= 7.75;
    const treadCompliant = actualTread >= 10;
    const slopeCompliant = slopeAngle <= 42 && slopeAngle >= 30;

    const issues: string[] = [];
    if (!riserCompliant) {
      if (actualRiser < 4) {
        issues.push(`Riser height (${actualRiser.toFixed(2)}") is too low. Minimum: 4"`);
      } else if (actualRiser > 7.75) {
        issues.push(`Riser height (${actualRiser.toFixed(2)}") exceeds maximum. Maximum: 7.75"`);
      }
    }
    if (!treadCompliant) {
      issues.push(`Tread depth (${actualTread.toFixed(2)}") is below minimum. Minimum: 10"`);
    }
    if (!slopeCompliant) {
      if (slopeAngle > 42) {
        issues.push(`Slope angle (${slopeAngle.toFixed(1)}°) is too steep. Maximum: 42°`);
      } else if (slopeAngle < 30) {
        issues.push(`Slope angle (${slopeAngle.toFixed(1)}°) is too shallow. Minimum: 30°`);
      }
    }

    setResult({
      totalRise: riseInInches,
      totalRun: runInInches,
      numberOfSteps: numSteps,
      actualRiserHeight: Math.round(actualRiser * 100) / 100,
      actualTreadDepth: Math.round(actualTread * 100) / 100,
      slopeAngle: Math.round(slopeAngle * 10) / 10,
      slopePercentage: Math.round(slopePercentage * 10) / 10,
      codeCompliance: {
        riserCompliant,
        treadCompliant,
        slopeCompliant,
        overall: riserCompliant && treadCompliant && slopeCompliant,
      },
      issues,
    });
  };

  const reset = () => {
    setTotalRise("");
    setTotalRun("");
    setCustomRiser("");
    setCustomTread("");
    setUseCustom(false);
    setResult(null);
  };

  useEffect(() => {
    calculateStairs();
  }, [totalRise, totalRun, unit, customRiser, customTread, useCustom]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Staircase Rise & Run Calculator – Design Safe & Comfortable Stairs</h1>
          <p className="text-muted-foreground">
            Design code-compliant and comfortable stairs with our Staircase Rise/Run Calculator. Enter the total height and available horizontal space to calculate optimal riser height, tread depth, and number of steps for your staircase.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Staircase Dimensions</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalRise">Total Rise (height)</Label>
                    <Input
                      id="totalRise"
                      type="number"
                      placeholder="e.g., 108"
                      value={totalRise}
                      onChange={(e) => setTotalRise(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalRun">Total Run (depth)</Label>
                    <Input
                      id="totalRun"
                      type="number"
                      placeholder="e.g., 120"
                      value={totalRun}
                      onChange={(e) => setTotalRun(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <select
                      id="unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value as "inches" | "cm")}
                      className="w-full h-10 px-3 border rounded-md bg-background text-sm"
                    >
                      <option value="inches">Inches</option>
                      <option value="cm">Centimeters</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Custom Dimensions (Optional)</h3>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="useCustom"
                      checked={useCustom}
                      onChange={(e) => setUseCustom(e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor="useCustom" className="text-sm">Use custom values</Label>
                  </div>
                </div>

                {useCustom && (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="customRiser">Desired Riser Height ({unit})</Label>
                      <Input
                        id="customRiser"
                        type="number"
                        placeholder={unit === "inches" ? "e.g., 7" : "e.g., 18"}
                        value={customRiser}
                        onChange={(e) => setCustomRiser(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="customTread">Desired Tread Depth ({unit})</Label>
                      <Input
                        id="customTread"
                        type="number"
                        placeholder={unit === "inches" ? "e.g., 10" : "e.g., 25"}
                        value={customTread}
                        onChange={(e) => setCustomTread(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateStairs} className="flex-1">
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
                  <div className={`p-4 rounded-lg ${result.codeCompliance.overall ? 'bg-green-500/10' : 'bg-orange-500/10'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {result.codeCompliance.overall ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                      )}
                      <p className={`font-semibold ${result.codeCompliance.overall ? 'text-green-500' : 'text-orange-500'}`}>
                        {result.codeCompliance.overall ? 'Code Compliant' : 'Code Issues Found'}
                      </p>
                    </div>
                    {!result.codeCompliance.overall && result.issues.length > 0 && (
                      <ul className="text-sm space-y-1">
                        {result.issues.map((issue, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <span>{issue}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">Number of Steps</p>
                    <p className="text-4xl font-bold text-primary">{result.numberOfSteps}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Riser Height</p>
                      <p className="text-xl font-bold">{result.actualRiserHeight}"</p>
                      <p className="text-xs text-muted-foreground">({(result.actualRiserHeight * 2.54).toFixed(1)} cm)</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Tread Depth</p>
                      <p className="text-xl font-bold">{result.actualTreadDepth}"</p>
                      <p className="text-xs text-muted-foreground">({(result.actualTreadDepth * 2.54).toFixed(1)} cm)</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Slope Angle</p>
                      <p className="text-xl font-bold">{result.slopeAngle}°</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Slope</p>
                      <p className="text-xl font-bold">{result.slopePercentage}%</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Rise:</span>
                      <span className="font-medium">{result.totalRise.toFixed(1)}" ({(result.totalRise * 2.54).toFixed(1)} cm)</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Run:</span>
                      <span className="font-medium">{result.totalRun.toFixed(1)}" ({(result.totalRun * 2.54).toFixed(1)} cm)</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>IRC Code Requirements:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Riser: 4" - 7.75"</li>
                      <li>Tread: minimum 10"</li>
                      <li>Slope: 30° - 42°</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter dimensions and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Stair Building Code Guidelines (IRC)</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2">Key Requirements:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                    <span><strong>Maximum riser height:</strong> 7.75" (197 mm)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                    <span><strong>Minimum tread depth:</strong> 10" (254 mm)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                    <span><strong>Minimum headroom:</strong> 6'8" (2032 mm)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                    <span><strong>Maximum riser variation:</strong> 3/8"</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Comfort Formulas:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="font-mono bg-muted px-2 py-0.5 rounded">2R + T = 24-25"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono bg-muted px-2 py-0.5 rounded">R + T = 17-18"</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-mono bg-muted px-2 py-0.5 rounded">R × T ≈ 75"</span>
                  </li>
                </ul>
                <p className="mt-3 text-xs">(Where R = riser height, T = tread depth)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
