"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function WorkingCapitalCalculatorPage() {
  const [currentAssets, setCurrentAssets] = useState<string>("");
  const [currentLiabilities, setCurrentLiabilities] = useState<string>("");
  const [result, setResult] = useState<{
    workingCapital: number;
    workingCapitalRatio: number;
    status: string;
  } | null>(null);

  const calculateWorkingCapital = () => {
    const assets = parseFloat(currentAssets);
    const liabilities = parseFloat(currentLiabilities);

    if (isNaN(assets) || isNaN(liabilities) || liabilities <= 0) {
      return;
    }

    const workingCapital = assets - liabilities;
    const workingCapitalRatio = assets / liabilities;

    let status = "Healthy";
    if (workingCapitalRatio < 1) {
      status = "Concerning - May have liquidity issues";
    } else if (workingCapitalRatio > 2) {
      status = "High - Consider investing excess capital";
    }

    setResult({
      workingCapital,
      workingCapitalRatio,
      status,
    });
  };

  const reset = () => {
    setCurrentAssets("");
    setCurrentLiabilities("");
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">Working Capital Calculator</h1>
          <p className="text-muted-foreground">
            Assess your company's short-term financial health. Calculate net working capital and the working capital ratio from current assets and current liabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentAssets">Current Assets</Label>
                <Input
                  id="currentAssets"
                  type="number"
                  placeholder="Enter current assets"
                  value={currentAssets}
                  onChange={(e) => setCurrentAssets(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentLiabilities">Current Liabilities</Label>
                <Input
                  id="currentLiabilities"
                  type="number"
                  placeholder="Enter current liabilities"
                  value={currentLiabilities}
                  onChange={(e) => setCurrentLiabilities(e.target.value)}
                />
              </div>

              <div className="pt-4">
                <div className="text-sm text-muted-foreground">
                  <p>Working Capital Ratio Guidelines:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>&lt; 1.0: Potential liquidity issues</li>
                    <li>1.2 - 2.0: Healthy range</li>
                    <li>&gt; 2.0: Excess capital (may be underutilized)</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateWorkingCapital} className="flex-1">
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
                  <div className={`p-4 rounded-lg ${result.workingCapital >= 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Net Working Capital</p>
                    <p className={`text-3xl font-bold ${result.workingCapital >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${result.workingCapital.toLocaleString()}
                    </p>
                  </div>
                  <div className={`p-4 rounded-lg ${result.workingCapitalRatio >= 1.2 && result.workingCapitalRatio <= 2 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-orange-100 dark:bg-orange-900/20'}`}>
                    <p className="text-sm text-muted-foreground">Working Capital Ratio</p>
                    <p className={`text-2xl font-bold ${result.workingCapitalRatio >= 1.2 && result.workingCapitalRatio <= 2 ? 'text-green-600' : 'text-orange-600'}`}>
                      {result.workingCapitalRatio.toFixed(2)}
                    </p>
                  </div>
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="text-lg font-bold">{result.status}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <p>Enter values and click Calculate to see results</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
