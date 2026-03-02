"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HeartRateRecoveryCalculator() {
  const [peakHR, setPeakHR] = useState<string>("");
  const [recoveryHR, setRecoveryHR] = useState<string>("");
  const [recoveryTime, setRecoveryTime] = useState<string>("60");
  const [results, setResults] = useState<{
    hrr: number;
    fitness: string;
    interpretation: string;
  } | null>(null);

  const calculate = () => {
    const peak = parseFloat(peakHR);
    const recovery = parseFloat(recoveryHR);

    if (isNaN(peak) || isNaN(recovery) || peak <= 0 || recovery <= 0) return;

    const hrr = peak - recovery;
    let fitness = "";
    let interpretation = "";

    if (hrr >= 30) {
      fitness = "Excellent";
      interpretation = "Your heart rate recovery indicates excellent cardiovascular fitness.";
    } else if (hrr >= 25) {
      fitness = "Good";
      interpretation = "Your heart rate recovery is good, indicating solid cardiovascular health.";
    } else if (hrr >= 20) {
      fitness = "Average";
      interpretation = "Your heart rate recovery is average. Regular cardio exercise can improve this.";
    } else if (hrr >= 12) {
      fitness = "Below Average";
      interpretation = "Your HRR is below average. Consider consulting a healthcare provider and increasing cardio exercise.";
    } else {
      fitness = "Poor";
      interpretation = "Your HRR is concerning. Please consult a healthcare provider for evaluation.";
    }

    setResults({ hrr, fitness, interpretation });
  };

  const reset = () => {
    setPeakHR("");
    setRecoveryHR("");
    setRecoveryTime("60");
    setResults(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Heart Rate Recovery Calculator – Measure Your Cardiovascular Fitness</CardTitle>
          <CardDescription>
            Heart rate recovery is a key fitness metric. Enter your peak and post-exercise heart rate to calculate HRR and gauge your cardiovascular health and recovery efficiency.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="peakHR">Peak Heart Rate (bpm)</Label>
              <Input
                id="peakHR"
                type="number"
                placeholder="e.g., 180"
                value={peakHR}
                onChange={(e) => setPeakHR(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">Your maximum heart rate during exercise</p>
            </div>

            <div>
              <Label htmlFor="recoveryHR">Heart Rate After Recovery (bpm)</Label>
              <Input
                id="recoveryHR"
                type="number"
                placeholder="e.g., 150"
                value={recoveryHR}
                onChange={(e) => setRecoveryHR(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">Measured after stopping exercise</p>
            </div>

            <div>
              <Label htmlFor="recoveryTime">Recovery Time (seconds)</Label>
              <Input
                id="recoveryTime"
                type="number"
                value={recoveryTime}
                onChange={(e) => setRecoveryTime(e.target.value)}
              />
              <p className="text-sm text-muted-foreground mt-1">Standard is 60 seconds (1 minute)</p>
            </div>

            <div className="flex gap-2">
              <Button onClick={calculate}>Calculate HRR</Button>
              <Button variant="outline" onClick={reset}>Reset</Button>
            </div>

            {results && (
              <div className="p-4 bg-muted rounded-md space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Heart Rate Recovery ({recoveryTime}s)</p>
                  <p className="text-4xl font-bold">{results.hrr} bpm</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Fitness Level</p>
                  <p className="text-2xl font-bold">{results.fitness}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {results.interpretation}
                </div>
                <div className="pt-2 border-t">
                  <p className="text-xs text-muted-foreground">
                    HRR Interpretation (1-minute recovery):
                  </p>
                  <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                    <li>• Excellent: 30+ bpm drop</li>
                    <li>• Good: 25-29 bpm drop</li>
                    <li>• Average: 20-24 bpm drop</li>
                    <li>• Below Average: 12-19 bpm drop</li>
                    <li>• Poor: &lt;12 bpm drop</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
