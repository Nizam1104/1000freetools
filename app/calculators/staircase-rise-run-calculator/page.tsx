"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, AlertCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts";

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

  // Generate step visualization data
  const stepData = result ? Array.from({ length: Math.min(result.numberOfSteps, 15) }, (_, i) => ({
    step: i + 1,
    height: (i + 1) * result.actualRiserHeight,
    depth: (i + 1) * result.actualTreadDepth,
  })) : [];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      <Card>
        
        <CardContent>
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

          {stepData.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Step Profile Visualization</h3>
              <div className="h-[200px]">
                <ChartContainer
                  config={{
                    height: { label: "Cumulative Height", color: "hsl(var(--chart-1))" },
                    depth: { label: "Cumulative Depth", color: "hsl(var(--chart-2))" },
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stepData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="step" tickFormatter={(v) => `Step ${v}`} />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="height" stroke="var(--color-height)" strokeWidth={2} />
                      <Line type="monotone" dataKey="depth" stroke="var(--color-depth)" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stair Building Code Guidelines (IRC)</CardTitle>
          <CardDescription>International Residential Code requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>IRC Requirement</TableHead>
                <TableHead>Why It Matters</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Maximum Riser Height</TableCell>
                <TableCell className="font-mono text-xs">7.75" (197 mm)</TableCell>
                <TableCell className="text-xs">Prevents tripping, reduces fatigue</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Minimum Tread Depth</TableCell>
                <TableCell className="font-mono text-xs">10" (254 mm)</TableCell>
                <TableCell className="text-xs">Ensures full foot support</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Minimum Headroom</TableCell>
                <TableCell className="font-mono text-xs">6'8" (2032 mm)</TableCell>
                <TableCell className="text-xs">Prevents head injuries</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Riser Variation</TableCell>
                <TableCell className="font-mono text-xs">Max 3/8" difference</TableCell>
                <TableCell className="text-xs">Uniform steps prevent missteps</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Minimum Width</TableCell>
                <TableCell className="font-mono text-xs">36" (914 mm)</TableCell>
                <TableCell className="text-xs">Allows safe passage, furniture moving</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Handrail Height</TableCell>
                <TableCell className="font-mono text-xs">34"-38"</TableCell>
                <TableCell className="text-xs">Proper support for all users</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p className="text-xs text-muted-foreground mt-3">
            Local building codes may have stricter requirements. Always check with your local building department before construction.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stair Comfort Formulas</CardTitle>
          <CardDescription>Rules of thumb for comfortable stairs</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Beyond code minimums, these formulas help design stairs that feel natural to walk on. They're based on average human stride length and have been refined over centuries of stair building.
          </p>
          <div className="rounded-lg bg-muted p-4 space-y-3">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <p className="text-xs font-semibold mb-1">Blondel's Formula</p>
                <p className="font-mono text-sm">2R + T = 24-25"</p>
                <p className="text-xs text-muted-foreground mt-1">Most widely used. R = riser, T = tread</p>
              </div>
              <div>
                <p className="text-xs font-semibold mb-1">Sum Rule</p>
                <p className="font-mono text-sm">R + T = 17-18"</p>
                <p className="text-xs text-muted-foreground mt-1">Simple alternative</p>
              </div>
              <div>
                <p className="text-xs font-semibold mb-1">Product Rule</p>
                <p className="font-mono text-sm">R × T ≈ 75"</p>
                <p className="text-xs text-muted-foreground mt-1">Less common but useful</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Example: A 7" riser with 11" tread gives 2(7) + 11 = 25" (perfect Blondel), 7 + 11 = 18" (perfect sum), and 7 × 11 = 77" (close to product rule). This is a very comfortable stair.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stair Types by Slope</CardTitle>
          <CardDescription>Appropriate slopes for different applications</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stair Type</TableHead>
                <TableHead>Typical Slope</TableHead>
                <TableHead>Riser/Tread</TableHead>
                <TableHead>Use Case</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Main residential</TableCell>
                <TableCell className="font-mono text-xs">30-35°</TableCell>
                <TableCell className="font-mono text-xs">7" / 11"</TableCell>
                <TableCell className="text-xs">Primary stairs in homes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Secondary/Basement</TableCell>
                <TableCell className="font-mono text-xs">35-40°</TableCell>
                <TableCell className="font-mono text-xs">7.5" / 10"</TableCell>
                <TableCell className="text-xs">Utility stairs, basement access</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Commercial/Public</TableCell>
                <TableCell className="font-mono text-xs">30-33°</TableCell>
                <TableCell className="font-mono text-xs">6.5-7" / 11-12"</TableCell>
                <TableCell className="text-xs">High-traffic areas, ADA compliant</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Ship ladder</TableCell>
                <TableCell className="font-mono text-xs">50-60°</TableCell>
                <TableCell className="font-mono text-xs">9-10" / 5-6"</TableCell>
                <TableCell className="text-xs">Tight spaces, not code-compliant for primary egress</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Industrial</TableCell>
                <TableCell className="font-mono text-xs">45-50°</TableCell>
                <TableCell className="font-mono text-xs">8-9" / 8-9"</TableCell>
                <TableCell className="text-xs">Equipment access, maintenance areas</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-sm mb-2">How do I measure total rise for stairs?</h4>
            <p className="text-xs text-muted-foreground">
              Measure from finished floor to finished floor – not to the subfloor. Include any flooring that will be installed (tile, hardwood, carpet). For exterior stairs, measure from grade to deck surface. Be precise – a 1/2" error gets multiplied across all steps.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the ideal number of steps?</h4>
            <p className="text-xs text-muted-foreground">
              There's no maximum, but stairs with more than 16 risers require a landing. Fewer than 3 risers is a trip hazard – use a ramp instead. For comfort, aim for risers between 6.5-7.5 inches, which typically gives 12-16 steps for a standard 8-foot ceiling.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Can I have different riser heights?</h4>
            <p className="text-xs text-muted-foreground">
              No – not if you want safe stairs. The IRC allows maximum 3/8" variation between the tallest and shortest riser. People develop muscle memory for step height. Even 1/2" difference can cause trips and falls, especially going down.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">Do I need a handrail?</h4>
            <p className="text-xs text-muted-foreground">
              Yes, if you have 4 or more risers. Handrails must be 34-38" high, graspable, and continuous for the full stair length. Both sides need handrails in commercial buildings. Residential stairs wider than 44" also need handrails on both sides.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm mb-2">What's the difference between rise and run?</h4>
            <p className="text-xs text-muted-foreground">
              Rise is the vertical height of each step. Run (or tread depth) is the horizontal depth you step on. Total rise is floor-to-floor height. Total run is the horizontal space the staircase occupies. A steeper stair has more rise, less run per step.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
