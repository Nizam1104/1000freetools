"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TrendingUp, DollarSign, Percent, Info } from "lucide-react";

interface ROIResult {
  roi: number;
  netProfit: number;
  totalReturn: number;
  annualizedROI: number;
}

export default function ROICalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState<string>("");
  const [finalValue, setFinalValue] = useState<string>("");
  const [investmentPeriod, setInvestmentPeriod] = useState<string>("1");
  const [periodUnit, setPeriodUnit] = useState<"years" | "months" | "days">("years");
  const [result, setResult] = useState<ROIResult | null>(null);

  const calculateROI = () => {
    const initial = parseFloat(initialInvestment);
    const final = parseFloat(finalValue);
    const period = parseFloat(investmentPeriod) || 1;

    if (isNaN(initial) || isNaN(final) || initial === 0) {
      return;
    }

    const netProfit = final - initial;
    const roi = (netProfit / initial) * 100;

    let periodInYears: number;
    switch (periodUnit) {
      case "months":
        periodInYears = period / 12;
        break;
      case "days":
        periodInYears = period / 365;
        break;
      default:
        periodInYears = period;
    }

    const annualizedROI = periodInYears > 0 
      ? (Math.pow(1 + (roi / 100), 1 / periodInYears) - 1) * 100 
      : 0;

    setResult({
      roi: Math.round(roi * 100) / 100,
      netProfit: Math.round(netProfit * 100) / 100,
      totalReturn: Math.round(final * 100) / 100,
      annualizedROI: Math.round(annualizedROI * 100) / 100,
    });
  };

  const reset = () => {
    setInitialInvestment("");
    setFinalValue("");
    setInvestmentPeriod("1");
    setResult(null);
  };

  useEffect(() => {
    calculateROI();
  }, [initialInvestment, finalValue, investmentPeriod, periodUnit]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight mb-2">ROI Calculator – Calculate Return on Investment Percentage</h1>
          <p className="text-muted-foreground">
            Calculate your Return on Investment (ROI) instantly with our free ROI Calculator. Enter your initial investment and final value to determine your profit or loss percentage — essential for evaluating investments, business projects, and financial decisions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Investment Details</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="initial">Initial Investment ($)</Label>
                    <Input
                      id="initial"
                      type="number"
                      placeholder="e.g., 10000"
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="final">Final Value ($)</Label>
                    <Input
                      id="final"
                      type="number"
                      placeholder="e.g., 15000"
                      value={finalValue}
                      onChange={(e) => setFinalValue(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="period">Investment Period</Label>
                    <div className="flex gap-2">
                      <Input
                        id="period"
                        type="number"
                        placeholder="e.g., 1"
                        value={investmentPeriod}
                        onChange={(e) => setInvestmentPeriod(e.target.value)}
                        className="flex-1"
                      />
                      <select
                        value={periodUnit}
                        onChange={(e) => setPeriodUnit(e.target.value as "years" | "months" | "days")}
                        className="h-10 px-3 border rounded-md bg-background text-sm"
                      >
                        <option value="years">Years</option>
                        <option value="months">Months</option>
                        <option value="days">Days</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  ROI measures the efficiency of an investment. Positive ROI indicates profit, negative ROI indicates loss.
                </AlertDescription>
              </Alert>

              <div className="flex gap-2 pt-4">
                <Button onClick={calculateROI} className="flex-1">
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
                  <div className={`p-4 rounded-lg ${result.roi >= 0 ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
                    <p className="text-sm text-muted-foreground">Return on Investment</p>
                    <p className={`text-4xl font-bold ${result.roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {result.roi >= 0 ? '+' : ''}{result.roi}%
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        Net Profit
                      </p>
                      <p className={`text-lg font-bold ${result.netProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {result.netProfit >= 0 ? '+' : ''}${result.netProfit}
                      </p>
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Total Return
                      </p>
                      <p className="text-lg font-bold">${result.totalReturn}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Percent className="h-3 w-3" />
                      Annualized ROI
                    </p>
                    <p className={`text-xl font-bold ${result.annualizedROI >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {result.annualizedROI >= 0 ? '+' : ''}{result.annualizedROI}%
                    </p>
                  </div>

                  <div className="text-xs text-muted-foreground pt-4 border-t">
                    <p><strong>Formula:</strong></p>
                    <p className="font-mono text-xs mt-1">ROI = ((Final - Initial) / Initial) × 100%</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter investment details to calculate ROI</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Understanding ROI</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <div>
                <h4 className="font-semibold mb-2">What is ROI?</h4>
                <p>
                  Return on Investment (ROI) is a performance measure used to evaluate the efficiency or profitability of an investment. It compares the gain or loss from an investment relative to its cost.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">ROI Interpretation</h4>
                <ul className="space-y-1">
                  <li>• <span className="text-green-500 font-medium">Positive ROI:</span> Investment is profitable</li>
                  <li>• <span className="text-red-500 font-medium">Negative ROI:</span> Investment resulted in loss</li>
                  <li>• <span className="text-muted-foreground">Higher ROI:</span> Better investment efficiency</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
