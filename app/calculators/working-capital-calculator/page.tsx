"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardAction, CardDescription, CardFooter } from "@/components/ui/card";
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

        {/* How It Works Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">How to Calculate Working Capital</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Current Assets</h3>
                <p className="text-sm text-muted-foreground">Input total current assets (cash, receivables, inventory, etc.).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold mb-2">Enter Current Liabilities</h3>
                <p className="text-sm text-muted-foreground">Input total current liabilities (payables, short-term debt, etc.).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold mb-2">Get Financial Health Status</h3>
                <p className="text-sm text-muted-foreground">See working capital amount, ratio, and liquidity assessment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Key Features of This Working Capital Calculator</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">**Working Capital Amount**</h3>
              <p className="text-sm text-muted-foreground">Calculates net working capital (Current Assets - Current Liabilities).</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Working Capital Ratio**</h3>
              <p className="text-sm text-muted-foreground">Computes current ratio for liquidity analysis and comparison.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Health Assessment**</h3>
              <p className="text-sm text-muted-foreground">Provides interpretation of your working capital status.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">**Business Planning Tool**</h3>
              <p className="text-sm text-muted-foreground">Essential for cash flow management and financial planning.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is working capital?</h3>
              <p className="text-sm text-muted-foreground">Working capital = Current Assets - Current Liabilities. It represents the money available for day-to-day operations after paying short-term obligations.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What is a good working capital ratio?</h3>
              <p className="text-sm text-muted-foreground">A ratio of 1.5-2.0 is generally healthy. Below 1.0 indicates potential liquidity problems. Above 2.0 may mean inefficient use of capital.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">Why is working capital important?</h3>
              <p className="text-sm text-muted-foreground">Working capital funds daily operations, pays suppliers and employees, and handles unexpected expenses. Insufficient working capital can lead to business failure.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">How can I improve working capital?</h3>
              <p className="text-sm text-muted-foreground">Speed up collections, extend payment terms, reduce inventory, sell unused assets, or secure a line of credit.</p>
            </div>
            <div className="p-4 bg-card rounded-lg border">
              <h3 className="font-semibold mb-2">What&apos;s the difference between working capital and cash flow?</h3>
              <p className="text-sm text-muted-foreground">Working capital is a snapshot of current liquidity. Cash flow tracks money movement over time. Both are important for financial health.</p>
            </div>
          </div>
        </div>

        {/* Related Tools Section */}
        <div className="mt-8 p-6 bg-card rounded-lg border">
          <h2 className="text-2xl font-semibold mb-6">Related Calculators</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <a href="/calculators/current-ratio-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Current Ratio Calculator</h3>
              <p className="text-sm text-muted-foreground">Calculate current ratio for liquidity analysis.</p>
            </a>
            <a href="/calculators/cash-flow-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Cash Flow Calculator</h3>
              <p className="text-sm text-muted-foreground">Track cash inflows and outflows for business planning.</p>
            </a>
            <a href="/calculators/break-even-point-calculator" className="p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors">
              <h3 className="font-semibold mb-1">Break-Even Point Calculator</h3>
              <p className="text-sm text-muted-foreground">Find the sales volume needed to cover all costs.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
