"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, AlertCircle, Info } from "lucide-react";

interface RampResult {
  slopeRatio: string;
  slopePercentage: number;
  slopeAngle: number;
  rampLength: number;
  adaCompliant: boolean;
  complianceLevel: "ADA Compliant" | "Moderate Slope" | "Steep - Not Recommended";
  issues: string[];
  recommendations: string[];
}

export default function RampSlopeCalculatorPage() {
  const [rise, setRise] = useState<string>("");
  const [run, setRun] = useState<string>("");
  const [unit, setUnit] = useState<"inches" | "cm" | "feet">("inches");
  const [result, setResult] = useState<RampResult | null>(null);

  const calculateRamp = () => {
    const riseValue = parseFloat(rise);
    const runValue = parseFloat(run);

    if (isNaN(riseValue) || isNaN(runValue) || riseValue <= 0 || runValue <= 0) {
      return;
    }

    const riseInInches = unit === "cm" ? riseValue / 2.54 : unit === "feet" ? riseValue * 12 : riseValue;
    const runInInches = unit === "cm" ? runValue / 2.54 : unit === "feet" ? runValue * 12 : runValue;

    const slopeRatio = runInInches / riseInInches;
    const slopePercentage = (riseInInches / runInInches) * 100;
    const slopeAngle = Math.atan(riseInInches / runInInches) * (180 / Math.PI);

    const rampLengthInches = Math.sqrt(riseInInches ** 2 + runInInches ** 2);
    const rampLengthFeet = rampLengthInches / 12;

    const adaMaxSlope = 12;
    const adaMaxSlopePercent = 8.33;

    let adaCompliant = slopeRatio >= adaMaxSlope;
    let complianceLevel: RampResult["complianceLevel"];
    const issues: string[] = [];
    const recommendations: string[] = [];

    if (slopeRatio >= adaMaxSlope) {
      complianceLevel = "ADA Compliant";
    } else if (slopeRatio >= 8) {
      complianceLevel = "Moderate Slope";
      issues.push(`Slope (${slopeRatio.toFixed(1)}:1) exceeds ADA maximum of 12:1`);
      recommendations.push("Consider extending ramp length for ADA compliance");
    } else {
      complianceLevel = "Steep - Not Recommended";
      issues.push(`Slope (${slopeRatio.toFixed(1)}:1) is too steep for safe wheelchair use`);
      recommendations.push("Strongly recommend redesigning with a gentler slope");
      recommendations.push("Consider a switchback ramp design to reduce slope");
    }

    if (riseInInches > 30 && slopeRatio < 20) {
      issues.push("Ramp rise exceeds 30\" - intermediate landing required");
      recommendations.push("Add intermediate landing every 30\" of rise");
    }

    if (runInInches > 360 && !issues.some(i => i.includes("landing"))) {
      recommendations.push("Consider intermediate landing for ramps longer than 30'");
    }

    if (slopeRatio < 20) {
      recommendations.push("Add handrails on both sides for safety");
    }

    if (slopeRatio < 12) {
      recommendations.push("Install edge protection to prevent wheelchair wheels from slipping off");
    }

    setResult({
      slopeRatio: `1:${slopeRatio.toFixed(1)}`,
      slopePercentage: Math.round(slopePercentage * 100) / 100,
      slopeAngle: Math.round(slopeAngle * 10) / 10,
      rampLength: Math.round(rampLengthFeet * 10) / 10,
      adaCompliant,
      complianceLevel,
      issues,
      recommendations,
    });
  };

  const reset = () => {
    setRise("");
    setRun("");
    setResult(null);
  };

  useEffect(() => {
    calculateRamp();
  }, [rise, run, unit]);

  const getComplianceColor = (level: string) => {
    switch (level) {
      case "ADA Compliant": return "text-green-500 bg-green-500/10";
      case "Moderate Slope": return "text-orange-500 bg-orange-500/10";
      case "Steep - Not Recommended": return "text-destructive bg-destructive/10";
      default: return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Ramp Slope Calculator – Calculate Ramp Angle, Gradient & Length</h1>
          <p className="text-muted-foreground">
            Design accessible and safe ramps with our Ramp Slope Calculator. Enter the rise and run to calculate slope percentage, gradient ratio, and ramp angle — ensuring ADA or building code compliance for wheelchair ramps and loading docks.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Ramp Dimensions</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rise">Rise (height)</Label>
                    <Input
                      id="rise"
                      type="number"
                      placeholder="e.g., 24"
                      value={rise}
                      onChange={(e) => setRise(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="run">Run (horizontal length)</Label>
                    <Input
                      id="run"
                      type="number"
                      placeholder="e.g., 288"
                      value={run}
                      onChange={(e) => setRun(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <select
                      id="unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value as "inches" | "cm" | "feet")}
                      className="w-full h-10 px-3 border rounded-md bg-background text-sm"
                    >
                      <option value="inches">Inches</option>
                      <option value="feet">Feet</option>
                      <option value="cm">Centimeters</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateRamp} className="flex-1">
                  Calculate
                </Button>
                <Button variant="outline" onClick={reset}>
                  Reset
                </Button>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-semibold mb-2">Quick ADA Reference:</h4>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Max Slope</p>
                    <p className="font-bold">1:12 (8.33%)</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Max Rise</p>
                    <p className="font-bold">30" per run</p>
                  </div>
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-muted-foreground">Min Width</p>
                    <p className="font-bold">36"</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Results</h3>
              {result ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${getComplianceColor(result.complianceLevel)}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {result.adaCompliant ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5" />
                      )}
                      <p className="font-semibold">{result.complianceLevel}</p>
                    </div>
                    {!result.adaCompliant && result.issues.length > 0 && (
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
                    <p className="text-sm text-muted-foreground">Slope Ratio</p>
                    <p className="text-4xl font-bold text-primary">{result.slopeRatio}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      For every 1" of rise, you need {result.slopeRatio.split(':')[1]}" of run
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Slope Percentage</p>
                      <p className="text-xl font-bold">{result.slopePercentage}%</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Slope Angle</p>
                      <p className="text-xl font-bold">{result.slopeAngle}°</p>
                    </div>
                  </div>

                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-xs text-muted-foreground">Ramp Length (diagonal)</p>
                    <p className="text-xl font-bold">{result.rampLength} ft</p>
                  </div>

                  {result.recommendations.length > 0 && (
                    <div className="pt-4 border-t space-y-2">
                      <p className="text-sm font-semibold flex items-center gap-2">
                        <Info className="h-4 w-4" />
                        Recommendations:
                      </p>
                      <ul className="text-sm space-y-1">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-1">
                            <span className="text-primary">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>ADA Requirements:</strong></p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Max slope: 1:12 (8.33%)</li>
                      <li>Max rise per run: 30"</li>
                      <li>Min width: 36"</li>
                      <li>Handrails required if slope &gt; 1:20</li>
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
            <h3 className="text-lg font-semibold mb-4">ADA Ramp Requirements</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2">Slope Guidelines:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                    <span><strong>Maximum slope:</strong> 1:12 (8.33%) - 1" of rise for every 12" of run</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                    <span><strong>Recommended slope:</strong> 1:16 (6.25%) or gentler for easier use</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                    <span><strong>Minimum slope:</strong> 1:48 (2.08%) for drainage</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Additional Requirements:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                    <span><strong>Minimum width:</strong> 36" clear width</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                    <span><strong>Landings:</strong> Required every 30" of rise</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                    <span><strong>Handrails:</strong> Required on both sides if slope &gt; 1:20</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500" />
                    <span><strong>Edge protection:</strong> Required on open sides</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the ADA maximum slope for a wheelchair ramp?</h4>
                <p>
                  The ADA requires a maximum slope of 1:12, meaning 1 inch of rise for every 12 inches of run.
                  This equals 8.33% grade or about 4.8 degrees. Steeper ramps are not permitted for new construction.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">How long does my ramp need to be?</h4>
                <p>
                  For every inch of rise, you need at least 12 inches of ramp length. A 24-inch rise requires
                  a minimum 288-inch (24-foot) ramp. Always measure the total vertical height from ground to landing.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">When are handrails required?</h4>
                <p>
                  Handrails are required on both sides when the slope exceeds 1:20 (5%). Since ADA ramps are
                  typically 1:12, most ramps will need handrails. They must be 34-38 inches above the ramp surface.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Do I need landings on my ramp?</h4>
                <p>
                  Yes. A level landing is required at the top and bottom. Intermediate landings are needed every
                  30 inches of rise. Landings must be at least 60 inches long and as wide as the ramp.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">What is the minimum width for a ramp?</h4>
                <p>
                  The ADA requires a minimum clear width of 36 inches between handrails. Wider ramps (48-60 inches)
                  allow two wheelchairs to pass. Check local building codes as some jurisdictions require more.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
