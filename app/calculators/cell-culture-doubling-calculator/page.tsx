"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info, FlaskConical, Clock, TrendingUp } from "lucide-react";

interface DoublingResult {
  doublingTime: number;
  generations: number;
  growthRate: number;
  unit: string;
}

export default function CellCultureDoublingCalculatorPage() {
  const [initialCells, setInitialCells] = useState<string>("");
  const [finalCells, setFinalCells] = useState<string>("");
  const [timeElapsed, setTimeElapsed] = useState<string>("");
  const [timeUnit, setTimeUnit] = useState<"hours" | "minutes" | "days">("hours");
  const [result, setResult] = useState<DoublingResult | null>(null);

  const calculateDoublingTime = () => {
    const N0 = parseFloat(initialCells);
    const Nt = parseFloat(finalCells);
    const t = parseFloat(timeElapsed);

    if (isNaN(N0) || isNaN(Nt) || isNaN(t) || N0 <= 0 || Nt <= 0 || t <= 0) {
      setResult(null);
      return;
    }

    if (Nt <= N0) {
      setResult(null);
      return;
    }

    const generations = Math.log2(Nt / N0);
    const doublingTime = t / generations;
    const growthRate = Math.log(2) / doublingTime;

    setResult({
      doublingTime: Math.round(doublingTime * 100) / 100,
      generations: Math.round(generations * 100) / 100,
      growthRate: Math.round(growthRate * 1000) / 1000,
      unit: timeUnit,
    });
  };

  const reset = () => {
    setInitialCells("");
    setFinalCells("");
    setTimeElapsed("");
    setResult(null);
  };

  useEffect(() => {
    calculateDoublingTime();
  }, [initialCells, finalCells, timeElapsed, timeUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Cell Culture Doubling Time Calculator</h1>
          <p className="text-muted-foreground">
            Calculate how long it takes for your cell population to double. Essential for cell biology research, bioprocessing, and understanding cell growth kinetics in culture.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Cell Count Data</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initialCells">Initial Cell Count</Label>
                    <Input
                      id="initialCells"
                      type="number"
                      placeholder="e.g., 10000"
                      value={initialCells}
                      onChange={(e) => setInitialCells(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="finalCells">Final Cell Count</Label>
                    <Input
                      id="finalCells"
                      type="number"
                      placeholder="e.g., 80000"
                      value={finalCells}
                      onChange={(e) => setFinalCells(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeElapsed">Time Elapsed</Label>
                    <div className="flex gap-2">
                      <Input
                        id="timeElapsed"
                        type="number"
                        placeholder="e.g., 24"
                        value={timeElapsed}
                        onChange={(e) => setTimeElapsed(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={timeUnit}
                        onChange={(e) => setTimeUnit(e.target.value as "hours" | "minutes" | "days")}
                        className="w-24 border rounded-md px-2 text-sm bg-background"
                      >
                        <option value="hours">hours</option>
                        <option value="minutes">min</option>
                        <option value="days">days</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  Final cell count must be greater than initial count for exponential growth calculation.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateDoublingTime} className="flex-1">
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
                    <p className="text-sm text-muted-foreground">Doubling Time</p>
                    <p className="text-3xl font-bold text-primary">{result.doublingTime} {result.unit}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Generations</p>
                      <p className="text-lg font-semibold">{result.generations}</p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground">Growth Rate</p>
                      <p className="text-lg font-semibold">{result.growthRate}/{result.unit}</p>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong> Td = t / log2(Nt/N0)</p>
                    <p className="mt-1">Td=doubling time, t=time, N0=initial, Nt=final</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter cell counts and time to calculate doubling time</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">About Cell Doubling Time</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FlaskConical className="h-4 w-4" />
                  What It Measures:
                </h4>
                <p>Doubling time indicates how quickly cells divide under specific culture conditions. Fast-growing cell lines like HeLa have shorter doubling times (24-48 hours), while primary cells may take several days.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Typical Ranges:
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>HeLa: 24-48 hours</li>
                  <li>HEK293: 24-36 hours</li>
                  <li>CHO: 18-24 hours</li>
                  <li>Primary fibroblasts: 48-96 hours</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">How to Calculate Doubling Time</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">1</div>
                <h3 className="font-semibold mb-2">Count Initial Cells</h3>
                <p className="text-sm text-muted-foreground">Record the cell count at the start of your experiment (time zero).</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">2</div>
                <h3 className="font-semibold mb-2">Count Final Cells</h3>
                <p className="text-sm text-muted-foreground">Count cells again after a known time period during exponential growth.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-muted rounded-lg">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mb-4">3</div>
                <h3 className="font-semibold mb-2">Get Doubling Time</h3>
                <p className="text-sm text-muted-foreground">Calculator determines how long it takes for the population to double.</p>
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
                  Multiple Time Units
                </h3>
                <p className="text-sm text-muted-foreground">Calculate in hours, minutes, or days depending on your cell line growth rate.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Generation Count
                </h3>
                <p className="text-sm text-muted-foreground">Shows how many cell divisions occurred during the time period.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Growth Rate Constant
                </h3>
                <p className="text-sm text-muted-foreground">Provides the specific growth rate constant for kinetic modeling.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  Instant Results
                </h3>
                <p className="text-sm text-muted-foreground">Real-time calculation as you enter your cell count data.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">What is a normal doubling time for cell lines?</h3>
                <p className="text-sm text-muted-foreground">Common cell lines typically double in 24-48 hours. HeLa cells double in about 24 hours, while primary cells can take 48-96 hours or longer depending on conditions.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Why is my doubling time longer than expected?</h3>
                <p className="text-sm text-muted-foreground">Factors include suboptimal media, low serum concentration, contamination, cells not in log phase, or counting errors. Check culture conditions and ensure cells are healthy.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">When should I measure doubling time?</h3>
                <p className="text-sm text-muted-foreground">Measure during exponential (log) growth phase, not during lag phase after seeding or stationary phase when cells reach confluence.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Can doubling time be negative?</h3>
                <p className="text-sm text-muted-foreground">No. If final count is less than initial, cells are dying rather than dividing. This calculator requires final count greater than initial for valid doubling time.</p>
              </div>
              <div className="p-5 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">How accurate is this calculation?</h3>
                <p className="text-sm text-muted-foreground">Accuracy depends on precise cell counting. Use hemocytometer or automated counter, count multiple samples, and ensure cells are in exponential growth phase.</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
